<template>
    <div class="center-container">
      <div class="title">个人资料</div>
      <div>
        <image src="" />
      </div>
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
 .center-container {
   width 800px
   border 1px solid #ccc
   .title {
     width 100%
     height 30px
     line-height 30px
     background #f9f9f9
     border 1px solid #ccc
     padding-left 20px
   }
 }
</style>
<script>
  export default{
    data() {
      return {
        msg:'hello vue'
      }
    },
  }
</script>
