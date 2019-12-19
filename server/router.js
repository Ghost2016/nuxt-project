const myProcess = require('../myProcess')
const router = require('koa-router')()
const user = require('./controllers/user.controller')

const mongoose = require('mongoose')
const User = mongoose.model('User')
const token = require('./utils/token.util')
const globalConfig = require('./config/global.config')

router.get('/api/gulp', async (ctx, next) => {
  myProcess.gulpFile()
})

router
  .post('/api/user/login',
  user.login)

router
  .get('/api/login',
    async (ctx, next) => {
        const user = await User.findOne({
          username: 'admin',
          password: '123456',
        })
        console.log(user)
        ctx.response.type = 'application/json';
        ctx.response.body = {'hello': 'world'}
      })
module.exports = router
