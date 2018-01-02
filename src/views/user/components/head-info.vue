<!--详情页的头部基本信息-->
<template>
  <div class="flex-wrap">
    <div class="left">
      <upload v-model="imgsrc" v-if="imgsrc" :onlyShow="true" :aliCatalog="`data/demand/${userId}`"></upload>
    </div>
    <div class="right">
      <p>
        <span class="title line-block">{{name}}标题：</span>
        <span>{{title}}</span>
      </p>
      <p>
        <span class="title line-block">{{name}}时间：</span>
        <span>{{time}}</span>
      </p>
      <p>
        <span class="title line-block">{{name}}地区：</span>
        <span>{{area}}</span>
      </p>
      <p>
        <span class="title line-block">{{name}}金额：</span>
        <span>{{price}}</span>
      </p>
      <p>
        <span class="title line-block">{{name}}邮箱：</span>
        <span>{{email}}</span>
      </p>
      <p>
        <span class="title line-block">{{name}}状态：</span>
        <span>{{status}}</span>
      </p>
      <slot name="operate"></slot>
    </div>
  </div>
</template>
<script>
 export default {
   props: {
     name: {
       type: String,
       defalut: '征集',
     },
     baseInfo: {
       type: Object,
       defalut: () => {
         return {}
       },
     },
   },
   data() {
     return {
       progressArr: ['待提交', '待审核', '审核被拒', '征集中', '暂停中', '下架', '已完成', '已删除'],
       title: '花样炫父”有奖征集活动评选结果出炉',
       time: '2017-04-18 ~ 2017-07-18',
       area: '全国范围',
       price: 100,
       email: '1212@sina.com',
       status: '未开始',
       imgsrc: '',
       userId: 0,
     }
   },
    created() {
      this.userId = window.localStorage.getItem('netId')
      this.title = this.baseInfo.title
      this.time = `${this.baseInfo.startDt} - ${this.baseInfo.endDt}`
      this.area = this.baseInfo.area
      this.price = this.dealprice(this.baseInfo.price)
      this.email = this.baseInfo.email
      this.status = this.progressArr[this.baseInfo.progress] || this.progressArr[8 + this.baseInfo.progress]
      this.imgsrc = this.baseInfo.mainPic
    },
    methods: {
      dealprice(priceobj) {
        let text = ''
        if (priceobj.type === 1) {
          if (priceobj.activeType === 1) {
            if (priceobj.rangeType === 1) {
              text = `${priceobj.fixedPrice}元`
            } else {
              text = `${priceobj.rangePrice[0]} - ${priceobj.rangePrice[1]}元`
            }
          } else {
            text = '分期付款'
          }
        } else {
          text = '商家报价'
        }
        return text
      }
    },
 }
</script>
<style lang="stylus" scoped>
  .flex-wrap {
    display flex
    flex-flow row nowrap
    .left {
      width 250px
      height 220px
      margin 0 20px
      .nc-image-upload {
        margin-top -20px
        width 90%
        height 90%
      }
      // background url("../../../assets/images/home/grape.png") no-repeat 0 0/contain
    }
    .right {
      flex 1
      p {
        margin 5px 0
      }
      .title {
        width 80px
      }
    }
  }
</style>
