<template>
  <div>
    <p class="title">征集交易订单：</p>
    <div class="collector-list" v-for="item in items">
      <div>
        <img src="../../../../assets/images/timg.jpg" />
        <div class="message">
          <p>征集名称：{{item.title}}</p>
          <p>服务分类：{{item.category}}</p>
          <p>服务价格：{{item.price}}</p>
        </div>
      </div>
      <div class="progress">{{item.progress}}</div>
      <div class="btn">
        <el-button type="primary">查看进度</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .title {
    height 36px;
    line-height: 36px;
  }
 .collector-list {
   width 70%
   height 100px;
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
     height 80px
   }
   .progress {
     color #fe6e1b;
   }
   .message {
     display inline-block;
   }
 }
</style>
<script>
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
  }
</script>
