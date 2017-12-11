/**
 * Created by HP_NB on 2017/10/24.
 */
// 案例页
import example from './example.vue'
// 评价页
import judge from './judge.vue'
// 首页
import home from './home.vue'
// 详情页
import detail from './detail.vue'

const routes = [
  { path: '',
    component: home,
    meta: {
      title: '店铺首页',
    },
  },
  { path: 'example',
    component: example,
    meta: {
      title: '店铺经典案例',
    },
  },
  { path: 'shop-detail',
    component: detail,
    meta: {
      title: '店铺详情',
    },
  },
  { path: 'judge',
    component: judge,
    meta: {
      title: '店铺评价',
    },
  },
]
export default routes
