/**
 * 征集公共函数
 */
import searchItems from 'components/search-items.vue'
import ncMenu from 'components/menu.vue'
import card from 'components/card.vue'
import blank from 'components/blank.vue'
import upload from 'src/assets/js/upload'

export default {
  mixins: [upload],
  components: {
    searchItems,
    ncMenu,
    card,
    blank,
  },
  data() {
    return {
      // 当前数据是否有数据
      nums: 1,
      placeholderName: '请输入征集名称',
      advertItems: [
        { id: 11, name: '这是广告位',
          price: '100天/元',
          demand: '广告位广告位',
          image: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png', },
        { id: 11, name: '这是广告位',
          price: '100天/元',
          demand: '广告位广告位',
          image: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png', },
        { id: 11, name: '这是广告位',
          price: '100天/元',
          demand: '广告位广告位',
          image: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png', },
      ],
      items: [],
      menuList: [
        { id: 100,
          name: '关键字',
          key: 'keysJson',
          selectedIndex: -1,
          list: [
            { name: '嘉陵江', id: '11' },
            { name: '我时候纠结', id: '12' },
            { name: '开发', id: '13' },
            { name: '电子', id: '14' },
            { name: '服装', id: '15' },
            { name: '美食', id: '16' },
          ]
        },
        { id: 101,
          key: 'area',
          name: '所在地区',
          selectedIndex: -1,
          list: [
            { name: '浙江省', id: '1' },
            { name: '江苏省', id: '2' },
            { name: '上海市', id: '3' },
            { name: '北京市', id: '4' },
            { name: '河北省', id: '5' },
            { name: '河南省', id: '6' },
          ]
        },
        { id: 102,
          name: '发布时间',
          key: 'time_start',
          selectedIndex: -1,
          list: [
            { name: '一周以内', id: '1' },
            { name: '一月以内', id: '2' },
            { name: '三月以内', id: '3' },
            { name: '半年以内', id: '4' },
            { name: '一年以内', id: '5' },
            { name: '一年以上', id: '6' },
          ]
        },
        { id: 103,
          key: 'pricesJson',
          name: '征集价格',
          selectedIndex: -1,
          list: [
            { name: '商家报价', id: '11' },
            { name: '0-50元', id: '11' },
            { name: '50-100元', id: '11' },
            { name: '100-500元', id: '11' },
            { name: '500-1000元', id: '11' },
            { name: '1000以上', id: '11' },
          ]
        },
//          { id: 104,
//            name: '其他指标',
//            key: 'others',
//            selectedIndex: -1,
//            list: [
//              { name: '指标一', id: '11' },
//              { name: '指标二', id: '11' },
//              { name: '指标三', id: '11' },
//              { name: '指标四', id: '11' },
//              { name: '指标五', id: '11' },
//              { name: '指标六', id: '11' },
//            ]
//          },
      ],
      ossclient: null,
      bucketUrl: '',
      client: null,
    }
  },
  methods: {
    // 搜索款框
    searchName(name) {
      this.search.search = name
      this.getList()
    },
    getList() {
      this.http.post('/rest/demand/list', this.search).then(
        (res) => {
          const datas = res.data
          this.items = datas.list
          this.bucketUrl = `${window.localStorage.getItem('bucketUrl')}/`
          if (this.bucketUrl) {
            this.dealItems()
          } else {
            const userId = window.localStorage.getItem('netId')
            const alicateLog = `data/demand/${userId}`
            this.requestclient(alicateLog)
          }
          this.nums = datas.num
          this.search.offset = datas.offset
          this.search.currentPage = datas.offset + 1
          this.search.pageCount = datas.total
        }).catch(err => {
          this.$message.error({ message: err || '出错了' })
        })
    },
    // 获取阿里云new oss接口
    async requestclient(alicateLog) {
      await this.getClient(alicateLog, 'ossclient')
      this.bucketUrl = `http://${this.ossclient.bucket}.${this.ossclient.region}.aliyuncs.com/`
      window.localStorage.setItem('bucketUrl', this.bucketUrl)
      this.dealItems()
    },
    // 处理列表数据
    dealItems() {
      this.items.forEach(l => {
        if (this.bucketUrl && l.mainPic) {
          l.mainPic = this.bucketUrl + l.mainPic
          l.priceText = this.dealPrice(l.price)
        }
      })
    },
    dealPrice(obj) {
      let text = ''
      if (obj.type === 1) {
        if (obj.activeType === 1) {
          text = obj.rangeType === 1 ? `${obj.fixedPrice}元` : `${obj.rangePrice[0]}~${obj.rangePrice[1]}元`
        } else {
          text = `分${obj.stagePrice.length}期：依次为${obj.stagePrice.join('、')}元`
        }
      } else {
        text = '商家报价'
      }
      return text
    },
    /**
     * 更改pagesize
     * @param val {number} 页面容积
     * 更改pagesize的时候，也会执行currentChange
     */
    handleSizeChange(val) {
      this.search.num = val - 1
      this.getList()
    },
    /**
     * 更改当前currentpage
     * @param val {number} 跳转到第几页
     */
    handleCurrentChange(val) {
      this.getList(val - 1)
    }
  },
}