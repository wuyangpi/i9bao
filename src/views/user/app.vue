<template>
  <div class="contain">
    <nc-header activeIndex="6"></nc-header>
    <div class="main">
      <l-right>
        <sider :list="datas" slot="left"></sider>
        <router-view slot="right"></router-view>
      </l-right>
    </div>
  </div>
</template>

<script type="text/babel">
  import Lib from 'assets/js/Lib'
  import datas from './common/menu-config'
  import lRight from './components/left-right.vue'
//  import sider from './common/sider.vue'
  import sider from './components/menu.vue'
  export default {
    mixins: [Lib],
    data() {
      return {
        datas,
      }
    },
    components: {
      sider,
      lRight
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
      width 1024px
      margin 20px auto
    }
  }
</style>
