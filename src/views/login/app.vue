<template>
  <div class="contain">
    <nc-header activeIndex="5"></nc-header>
    <div class="bread">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户登录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/babel">
  import Lib from 'assets/js/Lib'

  export default {
    mixins: [Lib],
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .contain {
  width 100%
  height 100%
  min-height 100%
  display: -webkit-flex
  display: flex
  flex-flow:column nowrap
  justify-content: flex-start
  .main {
  flex 1
  position relative
  display: -webkit-flex
  display: flex
  flex-flow:column nowrap
  justify-content: flex-start
  .main-content {
    flex: 1
    margin-bottom 15px
  }
  }
  }
  .bread {
    height 30px
    padding-top 10px
  }
</style>
