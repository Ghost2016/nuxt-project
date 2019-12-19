import axios from 'axios'
import Vue from 'vue'
import ajax from '../utils/ajax'


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
