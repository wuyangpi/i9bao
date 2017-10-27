<template>
  <div>
    <baseInfo title="基本信息"></baseInfo>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
 .wrap {
   width 70%
   padding 20px
 }
</style>
<script>
  import baseInfo from './basic.vue'

  export default{
    components: {
      baseInfo
    },
    data() {
      return {
        msg:'hello vue'
      }
    },
  }
</script>
