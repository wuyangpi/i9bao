<!--详情页的头部基本信息-->
<template>
  <div class="flex-wrap">
    <div class="left"></div>
    <div class="right">
      <p>
        <span class="title line-block">{{name}}标题：</span>
        <span>{{title}}</span>
      </p>
      <p>
        <span class="title line-block">{{name}}时间：</span>
        <span>{{time}}</span>
      </p>
      <p>
        <span class="title line-block">{{name}}地区：</span>
        <span>{{area}}</span>
      </p>
      <p>
        <span class="title line-block">{{name}}金额：</span>
        <span>{{price}}</span>
      </p>
      <p>
        <span class="title line-block">{{name}}邮箱：</span>
        <span>{{email}}</span>
      </p>
      <p>
        <span class="title line-block">{{name}}状态：</span>
        <span>{{status}}</span>
      </p>
      <slot name="operate"></slot>
    </div>
  </div>
</template>
<script>
 export default {
   props: {
     name: {
       type: String,
       defalut: '征集',
     }
   },
   data() {
     return {
       title: '花样炫父”有奖征集活动评选结果出炉',
       time: '2017-04-18 ~ 2017-07-18',
       area: '全国范围',
       price: 100,
       email: '1212@sina.com',
       status: '未开始'
     }
   }
 }
</script>
<style lang="stylus" scoped>
  .flex-wrap {
    display flex
    flex-flow row nowrap
    .left {
      width 200px
      height 200px
      margin 0 20px
      background url("../../../assets/images/home/grape.png") no-repeat 0 0/cover
    }
    .right {
      flex 1
      p {
        margin 5px 0
      }
      .title {
        width 80px
      }
    }
  }
</style>
