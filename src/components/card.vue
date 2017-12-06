<template>
  <div class="card-contain" :style="{ width: item.width + 'px', height: item.height + 'px' }">
    <div class="pic">
      <a :href="item.href">
        <img :src="item.src" alt="征集图">
      </a>
      <div class="name">{{item.name}}</div>
    </div>
    <div class="info">
      <div class="price">￥：{{item.price}}</div>
      <div class="comment">要求：{{item.comment}}</div>
      <div class="btn">查看详情</div>
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
    padding: 8px;
    .pic {
      width 100%
      min-height 150px
      a, img {
        display block
        width 100%
      }
      .name {
        color #080808
        width 100%
        height 30px
        line-height 30px
        border 1px solid #eee
      }
    }
    .info {
      width 100%
      height 100%
      background rgba(0, 0, 0, 0.7)
      position absolute
      top -200px
      left 0
      transition: all ease-in-out .3s;
      overflow: hidden;
    }
    &:hover {
      box-shadow: 0 2px 4px #ff6e1b;
      border-color: #ff6e1b;
      .info {
        top 0
      }
    }
  }
</style>
<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => {
          return {
            href: '',
            src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
            name: '征集服装设计',
            price: '1322.00',
            comment: '要求会一定的鉴赏能力，色彩搭配能力'
          }
        }
      }
    },
    data() {
      return {
      }
    },
  }
</script>
