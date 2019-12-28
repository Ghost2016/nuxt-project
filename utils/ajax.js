import axios from 'axios'
import Vue from 'vue'
const isServer = Vue.prototype.$isServer || process.server
// const baseURL = isServer ? `${process.env.DOMAIN}/api` : `${window.location.origin}/api`
const baseURL = isServer ? process.env.DOMAIN + `/api/` : `/api/`

const ajax = axios.create({
  baseURL,
  responseType: 'json',
  withCredentials: true,
})

ajax.interceptors.response.use((response) => {
  const { data } = response
  // 如果客户端
  if(!isServer) {
    if(data && data.success) {
      return data
    } else {
      throw new Error(data.message)
    }
  } 
  return data
}, error => Promise.reject(error))

export default ajax