/**
 * Created by shihui on 2017/9/14.
 */
import VueRouter from 'vue-router'
import loginon from '../loginon'
import signup from '../signup'
import editPass from '../edit-pass'
import findPass from '../find-pass'

const routes = [
  { path: '',
    component: loginon,
    meta: {
      title: '登录页面',
    }
  },
  { path: '/signup',
    component: signup,
    meta: {
      title: '注册页面',
    }
  },
  {
    path: '/editPass',
    component: editPass,
    meta: {
      title: '修改密码',
    }
  },
  {
    path: '/findPass',
    component: findPass,
    meta: {
      title: '找回密码',
    }
  },
]

const router = new VueRouter({
  routes:routes,
  base: '/login',
  mode: 'history'
})
export default router
