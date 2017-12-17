/**
 * 封装http
 */
import axios from 'axios'

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
}

// 设置默认头
Object.assign(axios.defaults.headers.common, defaultHeaders)

const methods = ['get', 'post', 'put', 'delete']

const http = {}
methods.forEach(method => {
  http[method] = axios[method].bind(axios)
})

export default {
  /**
   * install钩子
   * @param {Vue} Vue Vue
   */
  install(Vue) {
    Vue.prototype.http = http
  },
}

export const addRequestInterceptor =
  axios.interceptors.request.use.bind(axios.interceptors.request)

export const addResponseInterceptor =
  axios.interceptors.response.use.bind(axios.interceptors.response)

// 接口前自动添加api配置
addRequestInterceptor(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

addResponseInterceptor(
  (response) => {
    // 在这里统一前置处理请求响应
    // if (Number(response.data.code) !== 0) {
      // 全局notify有问题，还是自己处理吧
    //   return Promise.reject(response.data)
    // }
    return Promise.resolve(response.data)
  },
  (error) => {
    // 401直接跳转到登陆页面 如何登陆状态过期了怎么办？
    // if (!IS_DEBUG && Number(error.response.status) === 401) {
    //   httpEvent.emit('LOGIN_TIMEOUT')
    // }
    return Promise.reject(error || '出错了')
  }
)