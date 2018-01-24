<template>
  <div class="three-cloumn">
    <div class="recommand"></div>
    <div class="main">
      <searchItems :menuList="menuList" :placeholderName="placeholderName" @searchInput="searchName" :all="true"></searchItems>
      <div class="list">
        <card v-for="item in items" :item="item" baseUrl="/collect/detail"></card>
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
        <card v-for="item in items" :item="item" baseUrl="/collect/detail"></card>
      </div>
    </div>
    <div class="recommand">
      <nc-menu menu-title='征集公告' :isSecond="false" class="announce"></nc-menu>
    </div>
  </div>
</template>

<script type="text/babel">
  import mixCommon from 'utils/common'
  import common from './common'

  export default {
    mixins: [mixCommon, common],
    data() {
      return {
        search: {
          search: undefined,
          categoryId: '', // 分类ID
          keysJson: '', // 关键字数组
          time_start: '',
          pricesJson: '',
          orderBy: 'related',
          offset: 0,
          pageCount: 1,
          num: 10,
          totalCount: 0,
        },
      }
    },
    created() {
      this.getCategory('menuList')
      this.http.post('/rest/demand/list', this.search).then(
        (res) => {
          const datas = res.data.list
          this.items = datas
          const userId = window.localStorage.getItem('netId')
          this.bucketUrl = `${window.localStorage.getItem('bucketUrl')}/`
          if (this.bucketUrl) {
            this.dealItems()
          } else {
            this.requestclient(`data/demand/${userId}`)
          }
        }).catch(err => {
          this.$message.error({ message: err || '出错了' })
        })
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./common.styl"
</style>
