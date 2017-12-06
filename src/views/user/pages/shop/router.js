/**
 * Created by HP_NB on 2017/10/24.
 */
// 列表
import list from './list.vue'
// 首页
import home from './home.vue'
// 经典用例
import example from './example.vue'
import category from './category.vue'
import judge from './judge.vue'
const routes = [
  { path: 'list',
    component: list,
    meta: {
      title: '我的服务列表',
    },
  },
  { path: '',
    component: home,
    meta: {
      title: '我的首页',
    },
  },
  { path: 'example',
    component: example,
    meta: {
      title: '经典案例页',
    },
  },
  { path: 'category',
    component: category,
    meta: {
      title: '分类设置页面',
    },
  },
  { path: 'judge',
    component: judge,
    meta: {
      title: '用户评价页',
    },
  },
]
export default routes
