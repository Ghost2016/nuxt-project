const token = require('../utils/token.util')

exports.auth = name => async (ctx, next) => {
  const t = ctx.cookies.get(name)
  if (!t) { ctx.handleError('请登录后操作') }
  try {
    const userInfo = token.verify(t)
    ctx.state.user = userInfo
    
    await next()
  } catch (error) {
    // ctx.clearCookie(name)
    ctx.handleError('Token 无效', error)
  }
}

// 针对token非必须的get接口，如果token无效只返回部分信息
exports.filter = name => async (ctx, next) => {
  const t = ctx.cookies.get(name)
  console.log(name, ': ' +t)
  ctx.state.user = {}

  if (t) {
    try {
      const userInfo = token.verify(t)
      ctx.state.user = userInfo
    } catch (error) {
      console.error(error)
      ctx.state.user = {}
    }
  }
  await next()
}