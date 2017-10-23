<template>
  <div class="contain">
    <nc-header activeIndex="6"></nc-header>
    <div class="main">
      <sider></sider>
      <div class="main-content">
        <div class="bread">
          <nc-bread></nc-bread>
        </div>
        <router-view class="warp"></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import Lib from 'assets/js/Lib'
  import sider from './common/sider.vue'
  export default {
    mixins: [Lib],
    components: {
      sider
    },
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
  flex-flow:row nowrap
  justify-content: flex-start
  .main-content {
    flex: 1
    padding-left 7px
    .bread {
      height 30px
      padding-top 10px
    }
  }
  }
  }
</style>
