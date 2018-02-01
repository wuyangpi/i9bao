/**
 * Created by HP_NB on 2017/10/24.
 */
const collecter = () => import('./list.vue')
const collecterAdd = () => import('./add.vue')
const collectDetail = () => import('./collect-detail.vue')
// import collecter from './list.vue'
// import collecterAdd from './add.vue'
// import collectDetail from './collect-detail.vue'

const routes = [
  { path: '',
    component: collecter,
    meta: {
      title: '我的征集',
      breadcrumb: [{ title: '个人中心', link: '', base: 'user', index: 1 }],
    },
  },
  { path: 'add',
    component: collecterAdd,
    meta: {
      home: 'home',
      title: '新建征集',
      breadcrumb: [{ title: '个人中心', link: '/user' },{ title: '我的征集', link: '/collecter' }],
    },
  },
  { path: 'detail/:id',
    component: collectDetail,
    meta: {
      title: '征集详情',
      breadcrumb: [{ title: '个人中心', link: '/user' },{ title: '我的征集', link: '' }],
    },
  },
]
export default routes
