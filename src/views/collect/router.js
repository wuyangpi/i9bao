/**
 * Created by shihui on 2017/9/14.
 */
import VueRouter from 'vue-router'
import allCate from './all-category.vue'
import singleCate from './single-category.vue'
import detail from './detail.vue'
import doneCollect from './done-collect.vue'

const routes = [
  { path: '', component: allCate },
  { path: '/single', component: singleCate },
  { path: '/detail/:id', component: detail },
  { path: '/immediately/:id', component: doneCollect },
]

const router = new VueRouter({
  routes:routes,
  base: '/collect',
  mode: 'history'
})
export default router
