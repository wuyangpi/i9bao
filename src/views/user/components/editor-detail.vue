<!--详情页的详情信息，即为富文本编辑器的内容-->
<template>
  <div class="description">
     {{description}}
    <p>sdfsfsf<img src="http://sh-images.oss-cn-hangzhou.aliyuncs.com/fruiticons_buttons_pear.png"></p>
  </div>
</template>
<script>
  export default {
    props: {
      description: {
        type: String,
        defalut: '这是一段描述信息',
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .description {
    padding 10px
    width 100%
  }
</style>
