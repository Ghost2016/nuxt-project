import axios from 'axios'
import Vue from 'vue'

const isServer = Vue.prototype.$isServer || process.server
const baseURL = isServer ? `${process.env.DOMAIN}/api` : `${window.location.origin}/api`
const ajax = axios.create({
  baseURL,
  responseType: 'json',
  withCredentials: true,
})

ajax.interceptors.response.use((response) => {
  const { data } = response
  if (data && !isServer && !data.success) {
    alert(data.message)
    Promise.reject()
  }
  return data
}, error => Promise.reject(error))


export const mutations = {
  setData(state, payload) {
    state[payload.key] = payload.value
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
    // commit('setData', {
    //   key: 'token',
    //   value: data.token,
    // })
    return data
  }
}

export const state = () => ({
  token: '',
})
