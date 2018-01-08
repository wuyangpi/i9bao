<template>
  <ul>
    <template v-for="(item, index) in list" :keys="index">
      <li :class="{'selected': item.link && item.link === currentUrl}" @click.stop="goToLink(item)">
          <p class="line-block">{{item.name}}</p>
          <div class="line-block icon">
          <i v-if="item.children" :class="item.show ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
        </div>
      </li>
        <menus :list="item.children" v-if="item.children && item.show" class="subul"></menus>
    </template>
  </ul>
</template>
<script>
  export default {
    name: 'menus',
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    computed: {
      currentUrl() {
        return this.$route.fullPath
      }
    },
    methods: {
      /**
       * li的事件，如果没有子菜单直接跳链接
       * 如果有子菜单打开菜单，并收起其它已经展开的菜单
       */
      goToLink(item) {
        if (item.children) {
          if (!item.show) {
            for (let i = 0; i < this.list.length; i++) {
              const data = this.list[i]
              if (data.children && data.show) {
                data.show = false
              }
            }
          }
          item.show = !item.show
          return
        }
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
    min-width 150px
    max-height 100%
    color #333
    .selected {
      background #f9782f
      color #fff
    }
    li {
      width 100%
      text-align right
      margin-top 5px
      padding 10px 0
      border-bottom 1px solid #fcfcfc
      background #efefef
      cursor: pointer
      &:hover {
        background #f9782f
        color #fff
      }
      .icon {
        width 30px
        font-size 12px
        text-align center
      }
    }
  }
  .subul {
    border 0
    li {
      border-top 1px solid #fcfcfc
      border-bottom 0
      margin-top 0
      background #ccc
    }
    .selected {
      background #f9782f
      color #fff
    }
  }
</style>
