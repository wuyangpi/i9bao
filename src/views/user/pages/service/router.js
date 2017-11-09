/**
 * Created by HP_NB on 2017/10/24.
 */
// 服务列表
import list from './list.vue'
// 添加服务
import add from './service.vue'
// 服务详情页
import detail from './detail.vue'

const routes = [
  { path: '',
    component: list,
    meta: {
      title: '我的服务',
    },
  },
  { path: 'add',
    component: add,
    meta: {
      home: 'home',
      title: '新建服务',
      breadcrumb: [{ title: '个人中心', link: '/user' },{ title: '我的服务', link: '/service' }],
    },
  },
  { path: 'detail',
    component: detail,
    meta: {
      title: '征集详情',
      breadcrumb: [{ title: '个人中心', link: '/user' },{ title: '我的服务', link: '/service' }],
    },
  },
]
export default routes
