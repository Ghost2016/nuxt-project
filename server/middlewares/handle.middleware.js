module.exports = async (ctx, next) => {
  ctx.handleError = (message = '', error = {}, code) => {
    if (code) {
      ctx.response.status = code
      ctx.response.body = {
        success: false,
        message,
        error
      }
    } else {
      ctx.response.body = {
        success: false,
        message,
        error
      }
    }
  }

  ctx.handleSuccess = async (data, rest = {}) => {
    ctx.response.type = 'application/json';
    ctx.response.body = {
      success: true,
      data,
      ...rest
    }
  }

  await next()
}
