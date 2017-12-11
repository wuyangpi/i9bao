/**
 * Created by shihui on 2017/9/14.
 */
import VueRouter from 'vue-router'
import allCate from './all-category.vue'
import singleCate from './single-category.vue'
import empty from './empty.vue'
import shopInfo from './shop-info/router'

const routes = [
  { path: '', component: allCate },
  { path: '/single', component: singleCate },
  { path: '/detail',
    component: empty,
    children: shopInfo,
  },
]

const router = new VueRouter({
  routes:routes,
  base: '/shop',
  mode: 'history'
})
export default router
