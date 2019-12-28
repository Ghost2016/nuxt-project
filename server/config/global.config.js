const isPro = process.env.NODE_ENV === 'production'

module.exports = {
  jwt: {
    expiresIn: 365 * 86400,
    secret: 'nuxt'
  },
  app: {
    domain: isPro ? '/' : 'http://127.0.0.1:3000',
  },
  mongodb: {
    host: '127.0.0.1',
    port: 27017,
    database: 'nuxt',
    user: '',
    pass: ''
  },
  admin: {
    username: 'admin',
    nickname: 'ghost',
    password: '123456',
    description: '前端工程师',
    email: '454201948@qq.com',
  },
}
