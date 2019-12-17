const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
/* API server start */
require('./models')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')
// const bodyParser = require('koa-body')
const cookieParser = require('koa-cookie').default
const router =  require('./router')
const globalConfig = require('./config/global.config')
const handle = require('./middlewares/handle.middleware')
const validate = require('./middlewares/validate.middleware')

const app = new Koa()

//记录URL以及页面执行时间
app.use(async (ctx,next) =>{
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
  var 
      start = new Date().getTime(),
      execTime;
      await next();
      execTime = new Date().getTime() -start;
      ctx.response.set('X-Response-Time',`${execTime}ms`);
}).use(cors())
  .use(bodyParser())
  .use(handle)
  .use(validate)
  .use(cookieParser())
  .use(router.routes())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use((ctx, next) => {
    if(ctx.request.url.indexOf('api') == -1) {
      ctx.status = 200
      ctx.respond = false // Bypass Koa's built-in response handling
      ctx.response.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
      nuxt.render(ctx.req, ctx.res)
      } else {
        next()
      }
    })
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
