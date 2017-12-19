/**
 * 封装http
 */
import axios from 'axios'
const qs = require('qs')
// 'Content-Type': 'application/json; charset=utf-8',
const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/x-www-form-urlencoded',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
}
// 设置基础的服务器
axios.defaults.baseURL = 'http://www.wangluozhengji.com/net-collect-server'
// 设置默认头
Object.assign(axios.defaults.headers.common, defaultHeaders)

const methods = ['get', 'post', 'put', 'delete']

const http = {}
methods.forEach(method => {
  http[method] = axios[method].bind(axios)
})
// 请求前的拦截器
axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应后的拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error || '出错了');
});

export default {
  /**
   * install钩子
   * @param {Vue} Vue Vue
   */
  install(Vue) {
    Vue.prototype.http = http
  },
}
