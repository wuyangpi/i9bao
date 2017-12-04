<template>
  <div class="area">
    <div class="area-title">
      <div class="title">{{title}}</div>
      <div class="link" @click="goToLink">查看更多></div>
    </div>
    <slot></slot>
  </div>
</template>
<style lang="stylus" scoped>
  .area {
    overflow hidden
    .area-title {
      margin-top 10px
      display: flex
      justify-content space-between
      align-items center
    }
    .title {
      font-size: 20px
      font-weight 550
      padding 10px
      padding-left 30px
      height 50px
      position relative
      &::before {
        position absolute
        top 7px
        left 10px
        content: ''
        width 5px
        height 35px
        background: #ff6e1c
      }
    }
    .link {
      margin-right 20px
      color #ff6e1c
      cursor pointer
    }
  }
</style>
<script>
  export default{
    props: {
      title: {
        type: String,
        default: '这是一个标题',
      },
      link: {
        type:String,
        default: '',
      },
    },
    methods: {
      goToLink() {
        location.href = 'user'
      },
    },
  }
</script>
