<!--征集的详情页面-->
<template>
  <div class="detail">
    <head-info name="征集"></head-info>
    <div class="shop-set">
      <div class="title">征集服务要求</div>
      <div class="content">{{demand}}</div>
    </div>
    <div class="shop-set">
      <div class="title">个人信息</div>
      <div class="content">
        <div>联系方式：18923458767</div>
        <div>姓名：王先生张三</div>
      </div>
    </div>
    <div class="shop-set">
      <div class="title">应征资料</div>
      <div class="content">
        <upload title="上传文件"
                accept="image/png,image/jpeg,application/json,audio/mp4,application/vnd.ms-powerpoint,pplication/vnd.ms-excel,application/msword "
                v-model="mainPic"
                prompt="支持上传图片、视频、PPT、语音、PDF、word 、excel等"></upload>
      </div>
    </div>
    <div class="shop-set">
      <div class="title">物流信息</div>
      <div class="content">
        
      </div>
    </div>
  </div>
</template>
<script>
  import headInfo from '../user/components/head-info.vue'
  export default {
    data() {
      return {
        activeName: 'detail',
        mainPic: '',
        demand: '要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求',
      }
    },
    components: {
      headInfo,
    },
  }
</script>

<style lang="stylus" scoped>
  .detail {
    margin 20px 0 0 20px
    .shop-set {
      width 800px
      margin-top 20px
      border 1px solid #ccc
    }
    .content {
      padding 15px
    }
    .title {
      width 100%
      height 36px
      border 1px solid #ccc
      line-height 36px
      background #cfcfcf
      padding-left 20px
    }
  }
</style>
