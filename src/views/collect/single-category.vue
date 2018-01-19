<template>
    <div class="three-cloumn">
      <div class="recommand"></div>
      <div class="main">
        <searchItems :menuList="menuList" :placeholderName="placeholderName" @searchInput="searchName"></searchItems>
        <div class="list">
          <card v-for="item in items" :item="item" baseUrl="/collect/detail"></card>
          <!--空白页面-->
          <blank v-if="!nums"></blank>
          <!--<tab-list :items="items"></tab-list>-->
        </div>
        <nc-page
          v-if="nums"
          :isSizes="false"
          :size-change="handleSizeChange"
          :current-change="handleCurrentChange"
          :total="search.pageCount * search.num"
          :current-page="search.currentPage"
          :page-size="search.num"
          :page-count="search.pageCount"></nc-page>
        <div class="guess">
          <h3>猜你要找</h3>
          <card v-for="item in items" baseUrl="/collect/detail" :item="item"></card>
        </div>
      </div>
      <div class="recommand">
        <nc-menu menu-title='征集公告' :isSecond="false" class="announce"></nc-menu>
        <!--<tab-list :items="advertItems"></tab-list>-->
      </div>
    </div>
</template>

<script type="text/babel">
  import common from './common'

  export default {
    mixins: [common],
    data() {
      return {
        search: {
          search: undefined,
          categoryId: window.localStorage.getItem('cateId'), // 分类ID
          keysJson: '', // 关键字数组
          time_start: '',
          pricesJson: '',
          orderBy: 'related',
          offset: 0,
          currentPage: 1,
          pageCount: 1,
          num: 10,
          totalCount: 0,
        },
      }
    },
    methods: {
      /**
       * 处理时间
       * @param {string} val
       */
      dealTime(val) {
        const now = new Date()
        let d = ''
        let date = ''
        switch (val) {
          case '一周以内':
            d = 7
            break;
          case '一月以内':
            d = 30
            break;
          case '三月以内':
            d = 90
            break;
          case '半年以内':
            d = 180
            break;
          case '一年以内':
            d = 365
            break;
          default: break;
        }
        if (d) {
          date = new Date(now - d * 24 * 3600 *1000).toLocaleDateString().replace(/\//g, '-')
        }
        return date
      },
      dealSearchPrice(val) {
        let arr = [0, 0]
        const index = val.indexOf('-')
        const str = val.substring(0, val.indexOf('元'))
        if (str) {
          if (index > -1) {
            let arrs = str.split('-')
            arr = arrs.slice()
          } else {
            arr = [str, 100000000]
          }
        }
        arr[0] = arr[0] - 0
        arr[1] = arr[1] - 0
        return arr
      },
    },
    created() {
      this.getList()
    },
    mounted() {
      this.$children[0].$children[2].$on('searchItem', (key, value) => {
        if (key === "time_start") {
          this.search[key] = this.dealTime(value)
        } else if(key === 'pricesJson' && value) {
          this.search[key] = JSON.stringify(this.dealSearchPrice(value))
        }else {
          this.search[key] = value
        }
        this.getList()
      })
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./common.styl"
</style>
