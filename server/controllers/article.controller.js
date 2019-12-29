const mongoose = require('mongoose')

const Article = mongoose.model('Article')


const getArticleList = async (ctx, findOption) => {
  // const { role } = ctx.state.user
  let { page = 1, limit = 15 } = ctx.request
  // 限制大小
  limit = limit > 50 ? 50 : limit

  try {
    const total = (await Article.find({
      isPublish: true,
      ...findOption
    }).exec()).length

    const articles =  await Article.find({
      isPublish: true,
      ...findOption
    })
      // 填充数据
      // 参考 http://www.mongoosejs.net/docs/populate.html
      .populate({
        path: 'category',
        select: 'title isShow'
      })
      // 跳过的数量
      .skip(Number((page - 1) * limit))
      // 选中多少个
      .limit(Number(limit))
      // 排序
      .sort({
        createdAt: -1,
      })
      .exec()
      const data = JSON.parse(JSON.stringify(articles))
    ctx.handleSuccess(data, {total})
  } catch(error) {
    ctx.handleError('文章获取失败', error)
  }
  
  
}

const checkBeforeCreated = (ctx) => {
  return ctx.request.checkBody({
    title: {
      required: '标题不能为空',
      range: { min: 1, max: 100, message: '标题介于1-100个字符之间' },
    },
    content: {
      required: '内容不能为空',
      range: { min: 1, max: 10000, message: '内容介于1-10000个字符之间' },
    },
    category: {
      required: '分类不能为空',
    }
  })
}
// articles?limit=15&page=1
// articles?category=asdf&limit=15&page=1
// articles?keywords=js&limit=15&page=1
// articles?status=1&limit=15&page=1
exports.getArticles = async (ctx, next) => {
  const query = ctx.request.query
  // 默认返回首页推荐的文章
  let findOption = {
    status: 2,
  }
  if(query.category) {
    findOption = {
      category: query.category
    }
  }
  return getArticleList(ctx, findOption)
}

exports.getArticleTop = async (ctx, next) => {
  return getArticleList(ctx, {status: 3} )
}

exports.newArticle = async (ctx, next) => {
  const msg = checkBeforeCreated(ctx)
  if(msg) {
    return ctx.handleError(msg)
  }
  try {
    const { body } = ctx.request
    if (!body.category) {
      // 默认分类
      const def = await Category.findOne({ title: '默认分类' }).exec()
      body.category = def && def.id
    }
    const article = await new Article(body).save()
    ctx.handleSuccess(article)
  } catch (error) {
    ctx.handleError('文章添加失败', error)
  }
}

exports.deleteArticle = async (ctx, next) => {
  try {
    const { id } = ctx.request.query
    const body = await Article.findByIdAndRemove(id).exec()
    ctx.handleSuccess(body)
  } catch (error) {
    ctx.handleError('文章删除失败', error)
  }
}

exports.patchArticle = async (ctx, next) => {
  const msg = checkBeforeCreated(ctx)
  if(msg) {
    return ctx.handleError(msg)
  }
  try {
    const { body } = ctx.request
    
    if (!body.category) {
      // 默认分类
      const def = await Category.findOne({ title: '默认分类' }).exec()
      body.category = def && def.id
    }
    
    const { id } = body
    await Article.findByIdAndUpdate(id, body).exec()

    ctx.handleSuccess(id)
  } catch (error) {
    ctx.handleError('文章更新失败', error)
  }
}

exports.getArticle = async (ctx, next) => {
  try {
    const { id } = ctx.request.query
    const article = await Article.findById(id)
      .populate(
        {
          path: 'category',
          select: 'title isShow'
        }
      )
      .exec()
      
    ctx.handleSuccess(article)
  } catch (error) {
    ctx.handleError('文章查询失败', error)
  }
}