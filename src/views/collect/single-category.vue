<template>
    <div class="three-cloumn">
      <div class="recommand"></div>
      <div class="main">
        <searchItems :menuList="menuList"></searchItems>
        <div class="list">
          <card v-for="item in items" :item="item"></card>
          <!--<tab-list :items="items"></tab-list>-->
        </div>
        <nc-page
          :size-change="handleSizeChange"
          :current-change="handleCurrentChange"
          :current-page="search.currentPage"
          :page-size="search.pageSize"
          :total="search.totalCount"></nc-page>
        <div class="guess">
          <h3>猜你要找</h3>
          <card v-for="item in items" :item="item"></card>
        </div>
      </div>
      <div class="recommand">
        <nc-menu menu-title='征集公告' :isSecond="false" class="announce"></nc-menu>
        <tab-list :items="advertItems"></tab-list>
      </div>
    </div>
</template>

<script type="text/babel">
  import searchItems from 'components/search-items.vue'
  import ncMenu from 'components/menu.vue'
  import tabList from 'components/tab-list.vue'
  import card from 'components/card.vue'

  export default {
    data() {
      return {
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
        items: [
          {
            href: '',
            src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
            name: '征集服装设计',
            price: '1322.00',
            comment: '要求会一定的鉴赏能力，色彩搭配能力',
          },
          {
            href: '',
            src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
            name: '征集服装设计',
            price: '1322.00',
            comment: '要求会一定的鉴赏能力，色彩搭配能力',
          },
          {
            href: '',
            src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
            name: '征集服装设计',
            price: '1322.00',
            comment: '要求会一定的鉴赏能力，色彩搭配能力',
          },
          {
            href: '',
            src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
            name: '征集服装设计',
            price: '1322.00',
            comment: '要求会一定的鉴赏能力，色彩搭配能力',
          },
          {
            href: '',
            src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
            name: '征集服装设计',
            price: '1322.00',
            comment: '要求会一定的鉴赏能力，色彩搭配能力',
          },
          {
            href: '',
            src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
            name: '征集服装设计',
            price: '1322.00',
            comment: '要求会一定的鉴赏能力，色彩搭配能力',
          },
          {
            href: '',
            src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
            name: '征集服装设计',
            price: '1322.00',
            comment: '要求会一定的鉴赏能力，色彩搭配能力',
          },
          {
            href: '',
            src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
            name: '征集服装设计',
            price: '1322.00',
            comment: '要求会一定的鉴赏能力，色彩搭配能力',
          },
        ],
        menuList: [
          { id: 100,
            name: '关键字',
            selectedIndex: -1,
            list: [
              { label: '数码', value: '11' },
              { label: '设计', value: '11' },
              { label: '开发', value: '11' },
              { label: '电子', value: '11' },
              { label: '服装', value: '11' },
              { label: '美食', value: '11' },
            ]
          },
          { id: 101,
            name: '所在地区',
            selectedIndex: -1,
            list: [
              { label: '北京', value: '11' },
              { label: '上海', value: '11' },
              { label: '华北', value: '11' },
              { label: '华东', value: '11' },
              { label: '华西', value: '11' },
              { label: '西南', value: '11' },
            ]
          },
          { id: 102,
            name: '发布时间',
            selectedIndex: -1,
            list: [
              { label: '一周以内', value: '11' },
              { label: '一月以内', value: '11' },
              { label: '三月以内', value: '11' },
              { label: '半年以内', value: '11' },
              { label: '一年以内', value: '11' },
              { label: '一年以上', value: '11' },
            ]
          },
          { id: 103,
            name: '征集价格',
            selectedIndex: -1,
            list: [
              { label: '免费', value: '11' },
              { label: '0-50元', value: '11' },
              { label: '50-100元', value: '11' },
              { label: '100-500元', value: '11' },
              { label: '500-1000元', value: '11' },
              { label: '1000以上', value: '11' },
            ]
          },
          { id: 104,
            name: '其他指标',
            selectedIndex: -1,
            list: [
              { label: '指标一', value: '11' },
              { label: '指标二', value: '11' },
              { label: '指标三', value: '11' },
              { label: '指标四', value: '11' },
              { label: '指标五', value: '11' },
              { label: '指标六', value: '11' },
            ]
          },
        ],
        search: {
          currentPage: 1,
          pageCount: 8,
          pageSize: 10,
          totalCount: 80,
        },
      }
    },
    components: {
      searchItems,
      ncMenu,
      tabList,
      card,
    },
    created() {
//      this.$http({
//        method:'get',
//        url:'http://sh-images.oss-cn-hangzhou.aliyuncs.com/?max-keys=100',
//      }).then(function(res) {
//        console.log(res)
////          response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
//      });
//      http://sh-images.oss-cn-hangzhou.aliyuncs.com/?max-keys=100
    },
    methods: {
      /**
       * 更改pagesize
       * @param val {number} 页面容积
       * 更改pagesize的时候，也会执行currentChange
       */
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      /**
       * 更改当前currentpage
       * @param val {number} 跳转到第几页
       */
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .three-cloumn {
    display flex
    flex-flow row nowrap
    justify-content center
    .main {
      width 1000px
      margin 0 auto
      height 100%
      position relative
      .list {
        width 100%
        margin 30px 0
      }
      .guess {
        margin 30px 0
        h3 {
          font-weight 600
          margin 10px 0
        }
      }
    }
    .recommand {
      margin 10px
      width 300px
      .announce {

      }
      .menu-contain {
        width 220px
        overflow hidden
      }
    }
  }
</style>
