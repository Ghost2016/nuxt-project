const token = require('../utils/token.util')

exports.auth = name => async (ctx, next) => {
  const t = ctx.cookies.get(name)
  console.log(t)
  if (!t) { ctx.handleError('请登录后操作') }
  try {
    const userInfo = token.verify(t)
    ctx.state.user = userInfo
    
    await next()
  } catch (error) {
    // res.clearCookie(name)
    ctx.handleError('Token 无效', error)
  }
}