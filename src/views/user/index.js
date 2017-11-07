import Vue from 'vue'
// 全局组件在单页面的入口处注入
import router from './common/router'
import App from './app.vue'
import './common/base.styl'
import VueQuillEditor from 'vue-quill-editor'
// import Lib from 'assets/js/Lib'
// Vue.use(VueRouter)
// 实例化vue对象
Vue.use(VueQuillEditor)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
