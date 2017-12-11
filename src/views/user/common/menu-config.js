/**
 * Created by shihui on 2017/11/18.
 */
const menuJson = [
  {
    name: '基本信息',
    show: false,
    children: [
      { name: '个人资料', link: '/' },
      { name: '身份认证', link: '/authenticate' },
      { name: '公司资料', link: '/shop' },
    ]
  },
  {
    name: '我的账户',
    link: '/account'
  },
  {
    name: '我的发布',
    show: false,
    children: [
      { name: '我的征集', link: '/collecter' },
      { name: '我的服务', link: '/myservice' },
    ]
  },
  {
    name: '我的订单',
    show: false,
    children: [
      { name: '征集订单', link: '/order' },
      { name: '服务订单', link: '/myservice-order' },
    ]
  },
  {
    name: '我的店铺',
    show: false,
    children: [
      { name: '店铺分类', link: '/shop-set/category' },
      { name: '首页', link: '/shop-set' },
      { name: '服务列表页', link: '/shop-set/list' },
      { name: '经典案例页', link: '/shop-set/example' },
      { name: '用户评价页', link: '/shop-set/judge' },
    ]
  },
  {
    name: '我的消息',
    link: 'news'
  },
  {
    name: '我的收藏',
    link: 'collect'
  },
  {
    name: '我的收货地址',
    link: 'shipping-address;'
  },
  {
    name: '我的访问记录',
    link: 'access-record'
  },
  {
    name: '我的推广',
    link: 'spread'
  },
]
export default menuJson
