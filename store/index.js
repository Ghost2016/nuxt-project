import axios from 'axios'
import Vue from 'vue'
import ajax from '../utils/ajax'


export const mutations = {
  setData(state, payload) {
    state[payload.key] = payload.value
  },
  setArticles(state, { data, total }) {
    state.articles = data
    state.total = total
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, ctx) {
    debugger
    if (ctx.cookies && ctx.cookies.token) {
      commit('setData', {
        key: 'token',
        value: ctx.cookies.token,
      })
    }
  },

  async login({ commit, dispatch }, body) {
    const { data } = await ajax.post('/user/login', body)
    commit('setData', {
      key: 'token',
      value: data.token,
    })
    return data
  },

  async logout({ commit, dispatch }, body) {
    const { data } = await ajax.get('/user/logout', body)
    commit('setData', {
      key: 'token',
      value: '',
    })
    return data
  },
  /**
   * Category
   */
  // 获取分类
  async getCategories({ state, commit }, params) {
    const { data } = await ajax.get('/category/all', {
      params: {
        ...params,
        limit: state.limit,
      }
    })
    commit('setData', {
      key: 'categories',
      value: data,
    })
    return data
  },

  // 获取单个分类
  async getCategory({ state, commit }, id) {
    const { data } = await ajax.get(`/category?id=${id}`)
    return data
  },
  // 新增一个分类
  async newCategory({ state, commit }, data) {
    return await ajax.post('/category', data)
  },
  // 更新分类
  async patchCategory({ state, commit }, data) {
    return await ajax.patch('/category', data)
  },
  // 删除分类
  async deleteCategory({ state, commit }, id) {
    return await ajax.delete(`/category?id=${id}`)
  },

  // 获取文章
  async getArticles({ state, commit }, params) {
    const { data, total } = await ajax.get('/articles', {
      params: {
        ...params,
        limit: state.limit,
      }
    })
    commit('setArticles', {
      data,
      total,
    })
    return data
  },
}

export const state = () => ({
  token: '',
  // 页面请求数据的多少
  limit: 10,
  // 文章
  articles: [],
  // 文章数量
  total: 0,
  categories: []
})
