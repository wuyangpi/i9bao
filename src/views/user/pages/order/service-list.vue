<template>
  <div>
    <h1 class="title">征集服务订单</h1>
    <head-info name="服务"></head-info>
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
    background-color: #f7f7f7;
    margin-left 20px
    margin-bottom 20px
    display flex;
    flex-flow: row nowrap;
    justify-content space-around;
    align-items: center;
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
  import headInfo from '../../components/head-info.vue'

  export default{
    data() {
      return {
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
    components: {
      headInfo,
    },
    methods: {
      toDetail() {
        this.$router.push({ path: '/order/servicedetail' })
      },
    },
  }
</script>
