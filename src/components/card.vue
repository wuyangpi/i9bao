<template>
  <div class="card-contain" :style="{ width: item.width + 'px', height: item.height + 'px' }" @click="goTodetail">
    <div class="pic">
      <a :href="item.href">
        <img :src="item.mainPic" alt="征集图">
      </a>
      <div class="name">{{item.title}}</div>
    </div>
    <div class="info" v-if="!item.isHover || item.isHover">
      <div class="price">价格：{{item.priceText}}</div>
      <!--<div class="comment">要求：{{item.comment}}</div>-->
    </div>
  </div>
</template>
<style lang="stylus">
  .card-contain {
    position: relative;
    clean both
    float: left;
    width: 200px;
    height: 200px;
    overflow: hidden;
    background-color: #FFF;
    border 1px solid #eee
    border-radius: 1px;
    transition: all .3s ease 0s;
    margin 0 9px 18px
    text-align center
    cursor pointer
    .pic {
      width 100%
      height 100%
      min-height 150px
      a, img {
        display block
        width 100%
        height calc(100% - 30px)
      }
      .name {
        width 100%
        height 30px
        line-height 30px
      }
    }
    .info {
      width 100%
      height calc(100% - 30px)
      padding 15px
      background rgba(0, 0, 0, 0.7)
      position absolute
      top -100%
      left 0
      font-size 12px
      color #fff
      transition: all ease-in-out .3s;
      overflow: hidden;
      .price {
        margin-top 20%
      }
    }
    &:hover {
      box-shadow: 0 2px 4px #ff6e1b;
      border-color: #ff6e1b;
      .info {
        top 0
      }
      .name {
        color #fff
        background-color #ff6e1b
      }
    }
  }
</style>
<script>
  export default {
    props: {
      baseUrl: [String],
      item: {
        type: Object,
        default: () => {
          return {
            href: '',
            src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
            name: '征集服装设计',
            price: '1322.00',
            comment: '要求会一定的鉴赏能力，色彩搭配能力',
            isHover: true,
          }
        }
      }
    },
    methods: {
      goTodetail() {
        if (this.$router) {
          this.$router.push({ path: '/detail'})
        } else {
          window.location.href=this.baseUrl
        }
      },
    },
    data() {
      return {
      }
    },
  }
</script>
