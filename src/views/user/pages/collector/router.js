/**
 * Created by HP_NB on 2017/10/24.
 */
import collecter from './collecter.vue'
import collecterAdd from './add.vue'
import collectDetail from './detail.vue'

const routes = [
  { path: '',
    component: collecter,
    meta: {
      title: '我的征集',
      breadcrumb: [{ title: '个人中心', link: '' }],
    },
  },
  { path: '/add',
    component: collecterAdd,
    meta: {
      title: '新建征集',
      breadcrumb: [{ title: '个人中心', link: '/user' },{ title: '我的征集', link: '' }],
    },
  },
  { path: '/detail',
    component: collectDetail,
    meta: {
      title: '征集详情',
      breadcrumb: [{ title: '个人中心', link: '/user' },{ title: '我的征集', link: '' }],
    },
  },
]
export default routes
