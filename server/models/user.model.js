const mongoose = require('mongoose')
const md5 = require('md5');

const { Schema } = mongoose

const UserSchema = new Schema({
  role: {
    type: String,
    enum: ['superAdmin', 'admin', 'user', 'visitor'], // 预留三个角色
    default: 'user',
  },
  username: {
    type: String,
    trim: true,
    unique: true, // 用户名不能重复
  },
  nickname: {
    type: String,
    trim: true,
    default: '',
  },
  password: {
    type: String,
    /**
     * Setters allow you to transform the data before it gets to the raw mongodb
     * document and is set as a value on an actual key.
     */
    // set?: (value: T, schematype?: this) => T | any;
    set: md5,
  },
  description: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    unique: true, // 邮箱不能重复
    trim: true,
    lowercase: true,
  },
}, {
    /**
     * If set timestamps, mongoose assigns createdAt
     * and updatedAt fields to your schema, the type
     * assigned is Date.
     */
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    toJSON: {
      /** apply virtual getters (can override getters option) */
      virtuals: true,
      /** whether to include the version key (defaults to true) */
      versionKey: false,
      /**
       * A transform function to apply to the resulting document before returning
       * @param doc The mongoose document which is being converted
       * @param ret The plain object representation which has been converted
       * @param options The options in use (either schema options or the options passed inline)
       */
      transform(doc, ret) {
        // 隐藏管理员ID和密码
        delete ret._id
        delete ret.id
        delete ret.username
        delete ret.password
        delete ret.updatedAt
      },
    },
    /** remove empty objects (defaults to true) */
    minimize: false,
  })
mongoose.model('User', UserSchema)
