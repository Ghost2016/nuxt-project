const myProcess = require('../myProcess')
const router = require('koa-router')()

router.get('/api/gulp', async (ctx, next) => {
  myProcess.gulpFile()
})

module.exports = router
