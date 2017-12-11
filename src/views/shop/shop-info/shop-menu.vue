<template>
  <ul>
    <template v-for="(item, index) in list" :keys="index">
      <li :class="{'selected': item.link && item.link === currentUrl}">
        <router-link :to="{ path: item.link }">{{item.name}}</router-link>
      </li>
    </template>
  </ul>
</template>
<script>
  export default{
    computed: {
      currentUrl() {
        return this.$route.fullPath
      }
    },
    data() {
      return {
        list: [
          {
            name: '首页',
            link: '/detail',
          },
          {
            name: '详情',
            link: '/detail/shop-detail',
          },
          {
            name: '经典案例',
            link: '/detail/example',
          },
          {
            name: '评价',
            link: '/detail/judge',
          },
        ]
      }
    },
    methods: {
      /**
       * li的事件，如果没有子菜单直接跳链接
       * 如果有子菜单打开菜单，并收起其它已经展开的菜单
       */
      goToLink(item) {
        const url = item.link
        if (url !== 'undefined') {
          this.$router.push({ path: url })
        }
      },
    },
  }
</script>
<style lang="stylus" scoped>
  .line-block {
    display inline-block
  }
  ul {
    width 100%
    height 40px
    background #efefef
    margin 20px auto
    color #333
    display flex
    justify-content center
    .selected {
      background #f9782f
      a {
        color #fff
      }
    }
    li {
      min-width 120px
      text-align center
      padding 10px
      border-bottom 1px solid #fcfcfc
      cursor: pointer
      a {
        display inline-block
        width 100%
        height 100%
      }
      &:hover {
        background #f9782f
        color #fff
        a {
          color #fff
        }
      }
      .icon {
        width 30px
        font-size 12px
        text-align center
      }
    }
  }
</style>
