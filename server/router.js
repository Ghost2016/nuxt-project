const myProcess = require('../myProcess')
const router = require('koa-router')()
const user = require('./controllers/user.controller')

const check = require('./middlewares/check.middleware')

const category = require('./controllers/category.controller')

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
  .get('/api/user/logout',
  user.logout)

router
  .use(check.auth('token'))
  .get('/api/category/all',
  category.getCategories)
  .get('/api/category',
  category.getCategory)
  .post('/api/category',
  category.newCategory)
  .delete('/api/category',
  category.deleteCategory)
  .patch('/api/category',
  category.patchCategory)

module.exports = router
