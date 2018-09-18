/**
 * Created by shihui on 2017/9/14.
 */
import VueRouter from 'vue-router'
import collector from '../pages/collector/router'
import service from '../pages/service/router'
import shopSet from '../pages/shop/router'
import order from '../pages/order/router'
import mycollection from '../pages/collection/router'
import empty from './empty.vue'
import selfCenter from '../pages/self-center.vue'
import authenticate from '../pages/authenticate.vue'
import shop from '../pages/shop-auth.vue'
import account from '../pages/account.vue'
import news from '../pages/news.vue'
import address from '../pages/address.vue'
import selectPay from '../pages/select-pay.vue'

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
  { path: '/selectPay', component: selectPay },
  {
    path: '/order',
    component: empty,
    children: order,
  },
  {
    path: '/collecter',
    component: empty,
    children: collector,
  },
  {
    path: '/myservice',
    component: empty,
    children: service,
  },
  {
    path: '/collection',
    component: empty,
    children: mycollection,
  },
  {
    path: '/shop-set',
    component: empty,
    children: shopSet,
  },
  {
    path: '/account',
    component: account,
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
