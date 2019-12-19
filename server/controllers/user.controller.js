const mongoose = require('mongoose')
const User = mongoose.model('User')
const token = require('../utils/token.util')
const globalConfig = require('../config/global.config')

exports.login = async (ctx, next) => {
  const { request, response } = ctx
  const msg = request.checkBody({
    code: {
      required: '验证码不能为空',
    },
    username: {
      required: '用户名不能为空',
    },
    password: {
      required: '密码不能为空',
      range: { min: 6, max: 30, message: '密码介于6-30个字符之间' },
    },
  })
  if (msg) {
    return response.handleError(msg)
  }

  try {
    const { body } = request
    // 先不进行验证
    // if (md5(body.code) !== req.cookies.code) { response.handleError('验证码错误') }
    const user = await User.findOne({
      username: body.username,
      password: body.password,
    }).exec()
    console.log(user)
    if (user) {
      const t = token.sign(user)
      ctx.cookies.set('token', t, {
        maxAge: globalConfig.jwt.expiresIn * 1000, // 与jwt有限期一致，cookie是毫秒
        httpOnly: true,
      })
      // response.clearCookie('code')
      ctx.handleSuccess({ token: t })
    } else {
      ctx.handleError('用户名或密码错误')
    }
  } catch (error) {
    ctx.handleError('登录失败', error)
  }
}