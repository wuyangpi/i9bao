<template>
  <div class="shop-wrap">
    <shop-menu></shop-menu>
    <router-view></router-view>
  </div>
</template>
<script>
  import shopMenu from './shop-info/shop-menu.vue'

  export default {
    components: {
      shopMenu,
    }
  }
</script>
<style lang="stylus">
  .shop-wrap {
    width 900px
    margin 20px auto
    height auto
  }
</style>
