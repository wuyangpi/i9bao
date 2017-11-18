<!-- 左右结构，UI组件-->
<template>
  <div class="wrap">
    <div class="left">
      <slot name="left" ></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style lang="stylus">
  .wrap {
    width 1024px
    display flex
    flex-flow row nowrap
    .left {
      width 150px
    }
    .right {
      flex 1
      margin-left 20px
    }
  }
</style>
