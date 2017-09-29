
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAreaLinkage from 'vue-area-linkage'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../css/common.css'
import axios from 'axios'
// 全局组件注册
import hbHead from  'components/HbHead.vue'
import hbFoot from  'components/HbFoot.vue'
// 注册路由
Vue.use(VueRouter)
// 注册地区选择
Vue.use(VueAreaLinkage)
// 饿了么组件注册
Vue.use(ElementUI) // 全局注册alert事件，注册之后，不需要每个页面都import alert
Vue.component('nc-header', hbHead)
Vue.component('nc-footer', hbFoot)

Vue.prototype.$http = axios
import C from './conf'
import M from './common'

import vueFilter from './vueFilter'

//解决click点击300毫秒延时问题
// import FastClick from 'fastclick'
// FastClick.attach(document.body)

export default{
  M, C
}
