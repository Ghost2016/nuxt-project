const myProcess = require('../myProcess')
const router = require('koa-router')()
const user = require('./controllers/user.controller')

router.get('/api/gulp', async (ctx, next) => {
  myProcess.gulpFile()
})

router
  .post('/api/user/login',
    user.login)

router
  .get('/api/login',
    async (ctx, next) => {
      ctx.response.type = 'application/json';
      ctx.response.body = {'hello': 'world'}
    })
module.exports = router
