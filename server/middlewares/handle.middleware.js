module.exports = (ctx, next) => {
  const { req, res} = ctx
  res.handleError = (message = '', error = {}, code) => {
    if (code) {
      return (res.status(code).json({
        success: false,
        message,
        error,
      }))
    } else {
      return (res.json({
        success: false,
        message,
        error,
      }))
    }
  }

  res.handleSuccess = (data, rest = {}) => {
    return (res.json({
      success: true,
      data,
      ...rest,
    }))
  }

  next()
}
