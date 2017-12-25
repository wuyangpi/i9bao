import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAreaLinkage from 'vue-area-linkage'
import ElementUI from 'element-ui'
import 'babel-polyfill'
import '../css/element-variables.scss'
// import '../css/reset-element.styl'
import http from './http'

// 全局组件注册
import hbHead from  'components/HbHead.vue'
import hbFoot from  'components/HbFoot.vue'
import upload from 'components/upload.vue'
import bread from 'components/breadcrumb.vue'
import ncPage from 'components/pagination.vue'
import editor from 'components/editor.vue'
// 注册路由
Vue.use(VueRouter)
// 饿了么组件注册
Vue.use(ElementUI) // 全局注册alert事件，注册之后，不需要每个页面都import alert
// http请求注册
Vue.use(http)
// 注册地区选择
Vue.use(VueAreaLinkage)
Vue.component('nc-header', hbHead)
Vue.component('nc-footer', hbFoot)
Vue.component('upload', upload)
Vue.component('nc-bread', bread)
Vue.component('nc-page', ncPage)
Vue.component('nc-editor', editor)

import C from './conf'
import M from './common'

import vueFilter from './vueFilter'

//解决click点击300毫秒延时问题
// import FastClick from 'fastclick'
// FastClick.attach(document.body)

export default{
  M, C
}
