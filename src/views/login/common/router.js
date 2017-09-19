/**
 * Created by shihui on 2017/9/14.
 */
import VueRouter from 'vue-router'
import loginon from '../loginon'
import signup from '../signup'
import editPass from '../edit-pass'
import findPass from '../find-pass'

const routes = [
  { path: '', component: loginon },
  { path: '/signup', component: signup },
  {
    path: '/editPass',
    component: editPass,
  },
  {
    path: '/findPass',
    component: findPass,
  },
]

const router = new VueRouter({
  routes:routes,
  base: '/login',
  mode: 'history'
})
export default router
