<template>
  <div class="nc-title-bg">
    <h1 class="nc-title-header">
      <div>{{title}}</div>
      <div><slot name="operate"></slot></div>
    </h1>
    <div :class="{'content': show, 'content-base': !show}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    /**
     * @param {String} title
     */
    props: {
      title: {
        type: String,
        default: '',
      },
      show: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>
<style lang="stylus" scoped>
  .nc-title-bg {
    display flex
    flex-wrap nowrap
    margin-bottom: 20px;
    padding: 10px 30px 10px;
    background: #fff;
    .nc-title-header {
      width 100px
      font-size: 16px;
      color: #333;
      font-weight: normal
      display flex
      flex-flow row nowrap
      justify-content space-between
    }
    .content {
      flex 1
      border-top: 1px solid #d7dee1;
      margin: 10px 0
      padding-top: 30px;
    }
    .content-base {
      line-height 24px
    }
  }
</style>
