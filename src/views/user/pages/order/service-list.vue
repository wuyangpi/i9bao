<template>
  <div>
    <h1 class="title">征集服务订单</h1>
    <!--<table>-->
      <!--<tbody>-->
        <!--<tr v-for=""></tr>-->
      <!--</tbody>-->
    <!--</table>-->
    <div class="header">
      <span>订单编号：</span>
      <span>日期： ''</span>
      <span>金额</span>
      <span>状态</span>
      <span>操作</span>
    </div>
    <div class="collector-list" v-for="item in items">
      <div>
        <img src="../../../../assets/images/timg.jpg" />
        <div class="message">
          <p>服务名称：{{item.title}}</p>
          <p>服务分类：{{item.category}}</p>
          <p>服务价格：{{item.price}}</p>
        </div>
      </div>
      <div class="progress">{{item.progress}}</div>
      <div class="btn">
        <el-button type="primary" @click="toDetail">查看进度</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .title {
    margin-bottom 20px
  }
  .collector-list {
    width 100%
    height 120px;
    color: #555;
    margin-left 20px
    margin-bottom 20px
    display flex;
    flex-flow: row nowrap;
    justify-content space-around;
    align-items: center;
    .header {
      height 20px
      background-color: #f7f7f7;
    }
    img {
      display inline-block;
      vertical-align: bottom;
      width 150px;
      height 100px
    }
    .progress {
      color #fe6e1b;
    }
    .message {
      display inline-block;
      >p {
        margin 5px
      }
    }
  }
</style>
<script>
  export default{
    data() {
      return {
        search: {
          date: '',
          start: '',
          end: '',
          progress: '',
          offset: 0, // 当前页
          currentPage: 1,
          pageCount: 1, // 总页数
          num: 10, // pageSize一页的最大条数
          pageSize: 10,
          totalCount: 20,
        },
        items: [
          {title: '征集分类的名称可能很长陈述句哦',
            category: '食物/水果/香蕉',
            price: '223',
            progress: '进行中',},
          {title: '征集分类的名称可能很长陈述句哦',
            category: '食物/水果/香蕉',
            price: '223',
            progress: '已结束',},
          {title: '征集分类的名称可能很长陈述句哦',
            category: '食物/水果/香蕉',
            price: '223',
            progress: '待评价',},
        ],
      }
    },
    created() {
      this.getList(0)
    },
    methods: {
      /**
       * 请求
       * @param {number} val 页码
       */
      getList(val) {
        if (val) {
          this.search.offset = val
        }
        if (this.search.date) {
          this.search.start = this.dealDate(this.search.date[0])
          this.search.end = this.dealDate(this.search.date[1])
        } else {
          this.search.start = ''
          this.search.end = ''
        }
        this.http.post('/rest/service/order/listByBuyer', this.search).then(
          (res) => {
            const data = res.data
            this.tableList = data.solutions
            this.search.offset = data.offset
            this.search.currentPage = data.offset + 1
            this.search.pageCount = data.total
          }).catch( err => {
          this.$message.error({ message: err || '出错了' })
        })
      },
      toDetail() {
        this.$router.push({ path: '/order/servicedetail' })
      },
    },
  }
</script>
