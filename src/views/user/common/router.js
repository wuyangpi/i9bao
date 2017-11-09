/**
 * Created by shihui on 2017/9/14.
 */
import VueRouter from 'vue-router'
import collector from '../pages/collector/router'
import service from '../pages/service/router'
import empty from './empty.vue'
import selfCenter from '../pages/self-center.vue'
import authenticate from '../pages/authenticate.vue'
import shop from '../pages/shop-info.vue'
import news from '../pages/news.vue'
import order from '../pages/order.vue'
import collection from '../pages/collection.vue'
import address from '../pages/address.vue'

const routes = [
  { path: '',
    component: selfCenter,
    meta: {
      title: '基本资料',
      breadcrumb: [{ title: '个人中心', link: '' }],
    },
  },
  {
    path: '/authenticate',
    component: authenticate,
    meta: {
      title: '身份认证',
      breadcrumb: [{ title: '个人中心', link: '/' }],
    },
  },
  { path: '/shop',
    component: shop,
    meta: {
      title: '公司资料',
      breadcrumb: [{ title: '个人中心', link: '/' }],
    },
  },
  { path: '/news', component: news },
  {
    path: '/order',
    component: order,
  },
  {
    path: '/collecter',
    component: empty,
    children: collector,
  },
  {
    path: '/service',
    component: empty,
    children: service,
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
