const mongoose = require('mongoose')
const md5 = require('md5')
const { Schema } = mongoose

const ArticleSchema = new Schema({
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  thumbnail: {
    type: String,
    default: '',
  },
  status: { // 1: 分类页显示 2: 首页显示 3: 置顶
    type: Number,
    default: 1,
  },
  isPublish: {
    type: Boolean,
    default: true,
  },
  enableComment: {
    type: Boolean,
    default: true,
  },
  password: { // 重要文章可以加密
    type: String,
    set: md5,
  },
  views: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
    // 为了使用JSON.stringfiy与JSON.parse去过滤掉一些字段
    // 参考: https://stackoverflow.com/questions/31756673/what-is-the-difference-between-mongoose-toobject-and-tojson
    toJSON: {
      // include .id (it's a virtual)
      virtuals: true,
      // exclude .__v
      versionKey: false,
      // exclude ._id
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    minimize: false,
  })

mongoose.model('Article', ArticleSchema)