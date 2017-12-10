/**
 * Created by shihui on 2017/9/14.
 */
import VueRouter from 'vue-router'
import allCate from './all-category.vue'
import singleCate from './single-category.vue'
import detail from './detail.vue'
import buy from './buy-service.vue'
import order from './order.vue'

const routes = [
  { path: '', component: allCate },
  { path: '/single', component: singleCate },
  { path: '/detail', component: detail },
  { path: '/immediately', component: buy },
  { path: '/order', component: order },
]

const router = new VueRouter({
  routes:routes,
  base: '/service',
  mode: 'history'
})
export default router
