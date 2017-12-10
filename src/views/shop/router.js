/**
 * Created by shihui on 2017/9/14.
 */
import VueRouter from 'vue-router'
import allCate from './all-category.vue'
import singleCate from './single-category.vue'

const routes = [
  { path: '', component: allCate },
  { path: '/single', component: singleCate },
]

const router = new VueRouter({
  routes:routes,
  base: '/shop',
  mode: 'history'
})
export default router
