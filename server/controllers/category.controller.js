const mongoose = require('mongoose')

const Category = mongoose.model('Category')

exports.getCategories = async (ctx, next) => {
  const { role } = ctx.state.user
  let option = (role === 'superAdmin') ? {} : {isShow: true}
  try {
    let categories = await Category.find(option, {_id: 1, title: 1, isShow: 1})
      .sort({
        sort: -1,
      })
      .exec()
    // 会需要优化
    categories = JSON.parse(JSON.stringify(categories)) 
    const data = categories.map(category => {
      return {
        ...category,
        total: 1
      }
    })
    ctx.handleSuccess(data)
  } catch(e) {
    ctx.handleError('获取分类数据失败', e)
  }
  
}

exports.newCategory = async (ctx, next) => {
  const msg = ctx.request.checkBody({
    title: {
      required: '名字不能为空',
    },
  })
  try {
    const { body } = ctx.request
    let category = await Category.findOne({title: body.title})
    if(category) {
      ctx.handleError('分类已存在了')
      return
    }
    // 控制返回的字段
    category = await new Category(body, {_id: 1}).save()
    ctx.handleSuccess(category)
  } catch(e) {
    ctx.handleError('新增分类失败', e)
  }
  
}

exports.getCategory = async (ctx, next) => {
  try {
    const { id } = ctx.request.query
    const body = await Category.findById(id).exec()
    ctx.handleSuccess(body)
  } catch (error) {
    ctx.handleError('获取分类详情失败', error)
  }
  
}

exports.deleteCategory = async (ctx, next) => {
  try {
    const { id } = ctx.request.query
    const body = await Category.findByIdAndRemove(id).exec()
    ctx.handleSuccess(body)
  } catch (error) {
    ctx.handleError('分类删除失败', error)
  }
  
}

exports.patchCategory = async (ctx, next) => {
  const msg = ctx.request.checkBody({
    title: {
      required: '名字不能为空',
    },
  })
  if (msg) return ctx.handleError(msg)

  try {
    const { body } = ctx.request
    const { id } = body
    const data = await Category.findByIdAndUpdate(id, body).exec()
    ctx.handleSuccess(data)
  } catch (error) {
    ctx.handleError('分类更新失败', error)
  }
}

