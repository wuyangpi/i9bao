/**
 * Created by HP_NB on 2017/10/24.
 */
// 服务列表
import list from './list.vue'
// 服务详情页
import detail from './detail.vue'
import servicelist from './service-list.vue'
import servicedetail from './service-detail.vue'

const routes = [
  { path: '',
    component: list,
    meta: {
      title: '我的服务',
    },
  },
  { path: 'detail',
    component: detail,
  },
  { path: 'servicelist',
    component: servicelist,
  },
  { path: 'servicedetail',
    component: servicedetail,
  },
]
export default routes
