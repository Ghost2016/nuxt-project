
exports.login = async (ctx, next) => {
  const { req, res } = ctx
  const msg = req.checkBody({
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
  if (msg) return res.handleError(msg)

  try {
    const { body } = req
    // if (md5(body.code) !== req.cookies.code) { res.handleError('验证码错误') }
    const user = await User.findOne({
      username: body.username,
      password: body.password,
    }).exec()
    if (user) {
      const t = token.sign(user)
      res.cookie('token', t, {
        maxAge: globalConfig.jwt.expiresIn * 1000, // 与jwt有限期一致，cookie是毫秒
        httpOnly: true,
      })
      res.clearCookie('code')
      res.handleSuccess({ token: t })
    } else {
      res.handleError('用户名或密码错误')
    }
  } catch (error) {
    res.handleError('登录失败', error)
  }
}