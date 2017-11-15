<template>
    <div>
      <ul>
        <li v-for="(item, index) in list" :keys="index">
          <div class="line-block icon"></div>
          <p class="line-block">{{item.name}}</p>
          <template v-if="item.children">
            <menus :list="item..children" class="subul"></menus>
            <!--<ul class="subul">-->
              <!--<li v-for="(data, index) in item.children" :keys="index">-->
                <!--<div class="line-block icon"></div>-->
                <!--<p class="line-block">{{data.name}}</p>-->
              <!--</li>-->
            <!--</ul>-->
          </template>
        </li>
      </ul>
    </div>
</template>
<script>
  import subMenu from './sub-menu.vue'
  export default{
    name: 'menus',
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        }
      },
    },
    data(){
      return{

      }
    },
    components: {
      subMenu
    },
  }
</script>
<style lang="stylus" scoped>
  .line-block {
    display inline-block
  }
  ul {
    width 200px
    min-height 200px
    border 1px solid #ccc
    color #fff
    li {
      width 100%
      height 30px
      line-height 30px
      border-bottom 1px solid #fcfcfc
      background rgba(254, 110, 27, 0.9)
      .icon {
        width 25px
        text-align center
      }
      .subul {
        border 0
        padding-right 10px
        li {
          border-top 1px solid #fcfcfc
          border-bottom 0
          background rgba(254, 110, 27, 0.7)
          .icon {
            width 35px
          }
        }
      }
    }
  }
</style>
