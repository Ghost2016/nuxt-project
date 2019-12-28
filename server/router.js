const myProcess = require('../myProcess')
const router = require('koa-router')()
const user = require('./controllers/user.controller')

const check = require('./middlewares/check.middleware')

const category = require('./controllers/category.controller')
const article = require('./controllers/article.controller')

const mongoose = require('mongoose')

const token = require('./utils/token.util')
const globalConfig = require('./config/global.config')

router.get('/api/gulp', async (ctx, next) => {
  myProcess.gulpFile()
})

router
  .get('/api/user/admin',
  user.getAdmin)
  .post('/api/user/login',
  user.login)
  .get('/api/user/logout',
  check.auth('token'),
  user.logout)

router
  .get('/api/category/all',
  check.filter('token'),
  category.getCategories)
  .get('/api/category',
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

router
  .get('/api/articles',
  check.filter('token'),
  article.getArticles)
  .get('/api/article',
  check.filter('token'),
  article.getArticle)
  .get('/api/articles-top',
  check.filter('token'),
  article.getArticleTop)
  .post('/api/article',
  check.auth('token'),
  article.newArticle)
  .delete('/api/article',
  check.auth('token'),
  article.deleteArticle)
  .patch('/api/article',
  check.auth('token'),
  article.patchArticle)

module.exports = router
