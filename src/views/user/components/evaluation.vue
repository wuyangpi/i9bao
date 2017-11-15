<!--详情页的用户评价-->
<template>
  <div class="eval-warp">
    <div class="eval-item" v-for="(item, index) in evaluates" :keys="index">
      <div class="img"><img src="../../../assets/images/timg.jpg" /></div>
      <div class="info">
        <div class="top">
          <div>用户名：{{item.name}}</div>
          <div>{{item.time}}</div>
        </div>
        <p>{{item.content}}</p>
      </div>
    </div>
    <nc-page
      :size-change="handleSizeChange"
      :current-change="handleCurrentChange"
      :current-page="search.currentPage"
      :page-size="search.pageSize"
      :total="search.totalCount"></nc-page>
  </div>
</template>
<style lang="stylus" scoped>
  .eval-warp {
    margin 10px 20px
    width 90%
    .eval-item {
      display: flex
      flex-flow row nowrap
      margin-bottom 10px
      background #fcfcfc
      .img {
        img {
          width 80px
          height 70px
        }
      }
      .info {
        flex 1
        .top {
          display flex
          flex-flow row nowrap
          justify-content space-between
        }
      }
    }
  }
</style>
<script>
  export default{
    data() {
      return {
        search: {
          currentPage: 1,
          pageSize: 10,
          totalCount: 2
        },
        evaluates: [
          { name: 'xyz123', img: '', time: '2017-08-26', content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容'},
          { name: 'xyz1234545', img: '', time: '2017-08-26', content: '内容内容内容'},
          { name: 'x4545yz123', img: '', time: '2017-08-26', content: '内容容内容内容内容容内容'}
        ]
      }
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
