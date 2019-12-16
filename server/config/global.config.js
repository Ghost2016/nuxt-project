const isPro = process.env.NODE_ENV === 'production'

module.exports = {
  jwt: {
    expiresIn: 365 * 86400,
    secret: 'nuxt'
  },
  app: {
    domain: isPro ? '/' : 'http://127.0.0.1:3025',
  },
}
