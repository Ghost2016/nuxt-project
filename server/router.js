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

router
  .get('/api/category/all',
  check.auth('token'),
  category.getCategories)
  .get('/api/category',
  check.auth('token'),
  category.getCategory)
  .post('/api/category',
  check.auth('token'),
  category.newCategory)
  .delete('/api/category',
  check.auth('token'),
  category.deleteCategory)
  .patch('/api/category',
  check.auth('token'),
  category.patchCategory)

module.exports = router
