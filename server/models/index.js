const mongoose = require('mongoose')
const requireAll = require('require-all')
const path = require('path')
const globalConfig = require('../config/global.config')

requireAll({
  dirname: path.join(__dirname, './'),
  filter: /.+\.model\.js$/
})

const User = mongoose.model('User')

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
    const superAdmin = await User.findOne({
      role: 'superAdmin'
    }).exec()
    if(!superAdmin) {
      new User({
        role: 'superAdmin',
        ...globalConfig.admin
      }).save()
    }
  })
  .on('error', (error) => {
    console.warn('数据库连接失败', error)
  })