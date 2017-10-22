/**
 * Created by shihui on 2017/9/14.
 */
import VueRouter from 'vue-router'
import selfCenter from '../pages/self-center.vue'
import authenticate from '../pages/authenticate.vue'
import shop from '../pages/shop-info.vue'
import news from '../pages/news.vue'
import order from '../pages/order.vue'
import collecter from '../pages/collecter.vue'
import collection from '../pages/collection.vue'
import address from '../pages/address.vue'

const routes = [
  { path: '', component: selfCenter },
  { path: '/authenticate', component: authenticate },
  { path: '/shop', component: shop },
  { path: '/news', component: news },
  {
    path: '/order',
    component: order,
  },
  {
    path: '/collecter',
    component: collecter,
  },
  {
    path: '/collection',
    component: collection,
  },
  {
    path: '/address',
    component: address,
  },
]

const router = new VueRouter({
  routes:routes,
  base: '/user',
  mode: 'history'
})
export default router
