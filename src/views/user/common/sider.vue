<template>
    <div class="nc-menu">
      <el-menu default-active="2" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
        <el-submenu index="1">
          <template slot="title">个人资料</template>
          <el-menu-item index="11" router="{ path: '/user' }">基本信息</el-menu-item>
          <el-menu-item index="12">身份认证</el-menu-item>
          <el-menu-item index="13">公司资料</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">我的账户</el-menu-item>
        <el-menu-item index="3">我的发布</el-menu-item>
        <el-menu-item index="4">我的订单</el-menu-item>
        <el-menu-item index="5">我的评价</el-menu-item>
        <el-menu-item index="6">我的消息</el-menu-item>
        <el-menu-item index="7">我的收藏</el-menu-item>
        <el-menu-item index="8">我的推广</el-menu-item>
        <el-menu-item index="9">我的发布</el-menu-item>
      </el-menu>
    </div>
</template>
<script>
  export default{
    data(){
      return{
        msg:'hello vue'
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-menu-vertical {
    width 120px;
    min-height 100%
  }
</style>
