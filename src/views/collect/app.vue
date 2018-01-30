<template>
  <div class="contain">
    <nc-header activeIndex="2"></nc-header>
    <router-view class="main-content"></router-view>
    <nc-footer></nc-footer>
  </div>
</template>

<script type="text/babel">
  import Lib from 'assets/js/Lib'

  export default {
    mixins: [Lib],
  }
</script>
<style lang="stylus" scoped>
  .main-content {
    min-height calc(100vh - 370px )
  }
</style>