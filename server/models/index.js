const mongoose = require('mongoose')
const requireAll = require('require-all')
const path = require('path')
const globalConfig = require('../config/global.config')

requireAll({
  dirname: path.join(__dirname, './'),
  filter: /.+\.model\.js$/
})

const User = mongoose.model('User')
const Category = mongoose.model('Category')

const mongoUrl = `mongodb://${globalConfig.mongodb.host}:${globalConfig.mongodb.port}/${globalConfig.mongodb.database}`
mongoose.set('useFindAndModify', false)
mongoose.connection
  .openUri(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    user: globalConfig.mongodb.user,
    pass: globalConfig.mongodb.pass,
  })
  .once('open', async () => {
    // 超级用户
    const superAdmin = await User.findOne({
      role: 'superAdmin'
    }).exec()
    // 默认分类
    const defaultCategory = await Category.findOne({
      title: '默认分类',
    }).exec()

    // 初始化
    if(!superAdmin) {
      await new User({
        role: 'superAdmin',
        ...globalConfig.admin
      }).save()
    }

    if(!defaultCategory) {
      await new Category({
        title: '默认分类',
        keywords: '默认分类',
        description: '默认分类',
      }).save()
    }

  })
  .on('error', (error) => {
    console.warn('数据库连接失败', error)
  })