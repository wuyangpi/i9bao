import Vue from 'vue'
// 全局组件在单页面的入口处注入
import router from './common/router'
import App from './app.vue'

// Vue.use(VueRouter)
// 实例化vue对象
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
