<!--详情页的用户评价-->
<template>
  <div class="eval-warp">
    <div class="eval-item" v-for="(item, index) in evaluates" :keys="index">
      <div class="img"><img src="../../../assets/images/timg.jpg" /></div>
      <div class="info">
        <div class="top">
          <div>{{title}}：{{item.name}}</div>
          <div>{{item.time}}</div>
        </div>
        <div class="top">
          <p>{{item.content}}</p>
          <a  v-if="hadReply" href="javascript:void(0);" @click="reply(item)">{{replyName(item.isedit)}}</a>
        </div>
        <template v-if="hadReply">
          <div class="reply" v-if="item.isedit">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="item.replyContent">
            </el-input>
          </div>
          <p v-if="!item.isedit && item.replyContent">
            <span class="hign">商家回复：</span>{{item.replyContent}}
          </p>
        </template>
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
          a {
            color #ff6e1b
          }
        }
      }
    }
    .hign {
      color #ff6e1b
    }
  }
</style>
<script>
  export default{
    props: {
      // 是否可以有回复
      hadReply: Boolean,
      title: {
        type: String,
        default: '用户名',
      },
      evaluates: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        replyContent: '',
        isedit: false,
        search: {
          currentPage: 1,
          pageSize: 10,
          totalCount: 2
        },
//        evaluates: [
//          { name: 'xyz123', img: '', time: '2017-08-26', content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容'},
//          { name: 'xyz1234545', img: '', time: '2017-08-26', content: '内容内容内容'},
//          { name: 'x4545yz123', img: '', time: '2017-08-26', content: '内容容内容内容内容容内容'}
//        ]
      }
    },
    methods: {
      replyName(isedit) {
        return isedit ? '确定' : '回复'
      },
      reply(item) {
        this.$set(item, 'isedit', !item.isedit)
      },
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
