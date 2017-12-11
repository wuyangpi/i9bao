<template>
  <div>
    <div class="adver">
      <img src="../../../assets/images/home/signup.png" />
    </div>
    <areaTitle title="产品服务列表">
      <card v-for="item in recommends[0].items" :item="item"></card>
      <card v-for="item in recommends[0].items" :item="item"></card>
    </areaTitle>
  </div>
</template>
<script>
  import areaTitle from 'components/area-title.vue'
  import card from 'components/card.vue'

  export default {
    data () {
      return {
        // 主推荐数据
        recommends: [
          {
            mainItems: {
              href: '',
              src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
              name: '征集服装设计',
              price: '1322.00',
              comment: '要求会一定的鉴赏能力，色彩搭配能力',
              width: 400,
              height: 420,
            },
            // 推荐数据
            items: [
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
            ],
          },
          {
            mainItems: {
              href: '',
              src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
              name: '征集服装设计',
              price: '1322.00',
              comment: '要求会一定的鉴赏能力，色彩搭配能力',
              width: 400,
              height: 420,
            },
            // 推荐数据
            items: [
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
              {
                href: '',
                src: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/orange.png',
                name: '征集服装设计',
                price: '1322.00',
                comment: '要求会一定的鉴赏能力，色彩搭配能力',
              },
            ],
          },
        ],
      }
    },
    components: {
      areaTitle,
      card,
    },
    methods: {
      handleIconClick(ev) {
        console.log(ev);
      }
    },
  }
</script>
</script>
<style lang="stylus" scoped>
  .adver {
    width 100%
    margin 10px 0
    img {
      width 100%
      height 250px
    }
  }
</style>