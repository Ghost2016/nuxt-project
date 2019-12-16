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
  }
  return data
}, error => Promise.reject(error))


export const mutations = {
  setData(state, payload) {
    state[payload.key] = payload.value
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, res }) {
    debugger
    if (req.cookies && req.cookies.token) {
      commit('setData', {
        key: 'token',
        value: req.cookies.token,
      })
    }
  },

  async login({ commit, dispatch }, body) {
    const { data } = await ajax.post('/login', body)
    commit('setData', {
      key: 'token',
      value: data.token,
    })
    return data
  }
}

export const state = () => ({
  token: '',
})
