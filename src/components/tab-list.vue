<template>
   <div class="wrap">
     <vue-dh><!-- :image="item.image" -->
       <vue-dh-item  v-for="item in items"
                     v-bind:style="{width: item.width + 'px', height: item.height + 'px' }"
                    :name="item.name"
                     :image="item.image"
                    :transition="'linear'"
                    :item-class="'additionalClass'">
         <div slot="overlay" class="top-div">
           <div class="over">
             <div>{{item.name}}</div>
             <div>价格：{{item.price}}</div>
             <div>要求：{{item.demand}}</div>
           </div>
         </div>
       </vue-dh-item>
     </vue-dh>
   </div>
</template>
<style lang="stylus">
 /** .wrap {
    .dh__overlay {
      background: rgba(249, 10, 57, 0.8)
    }
  }**/
</style>
<style lang="stylus" scoped>
  .additionalClass {
    z-index 100
    width 230px
    height 220px
    margin 7px
    font-size 12px
    border 1px solid #ccc
    /** background url('../assets/images/home/orange.png') no-repeat center/cover **/
  }
  .wrap {
    overflow hidden
    .top-div {
      .over {
        position absolute
        bottom 2px
        width 100%
        line-height 2
        height auto
        overflow: hidden;
      }
      width 100%
      height 100%
      position relative
      color: #fff;
    }
  }
</style>
<script>
  export default {
    props: {
      items: {
        type: Array,
        default: () => {
          return []
        }
      },
    },
    data(){
      return {
        show: false,
        name: '这是一个页面的名字',
        images: '../assets/images/timg.jpg',
      }
    },
    watch: {
    },
  }
</script>
