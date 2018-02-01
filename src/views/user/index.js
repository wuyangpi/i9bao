import Vue from 'vue'
// 全局组件在单页面的入口处注入
import router from './common/router'
import App from './app.vue'
import './common/base.styl'
import VueQuillEditor from 'vue-quill-editor'
import VueAreaLinkage from 'vue-area-linkage'
// function getComponent() {
//   var element = document.createElement('div');
//   // Lodash, now imported by this script
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   return import(/* webpackChunkName: "lodash" */ 'area-data').then(_ => {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     return element;
//   }).catch(error => 'An error occurred while loading the component');
// }
//
// document.body.appendChild(component());
//   getComponent().then(component => {
//     document.body.appendChild(component);
//   })
// import Lib from 'assets/js/Lib'
// Vue.use(VueRouter)
// 实例化vue对象
Vue.use(VueQuillEditor)
Vue.use(VueAreaLinkage)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
