<!--空白页面-->
<template>
  <div class="nc-blank"><span>{{message}}</span></div>
</template>
<script>
  export default {
    props: {
      message: {
        type: String,
        default: '',
      }
    },
  }
</script>
<style lang="stylus" scoped>
  .nc-blank {
    position relative
    height 150px
    background url('../assets/images/blank.png') no-repeat center/contain
    span {
      position relative
      top 30px
      left 28%
      transform: translateX(-50%)
      color #ccc
    }
  }
</style>