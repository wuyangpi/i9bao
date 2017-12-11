<template>
  <div class="shop-home">
    <div class="adver">
      <img src="../../../assets/images/home/signup.png" />
    </div>
    <el-carousel class="swiper">
      <el-carousel-item v-for="(data, index) in item" :key="index">
        <img src="../../../assets/images/home/signup.png" />
      </el-carousel-item>
    </el-carousel>
    <div class="adver">
      <img src="../../../assets/images/home/signup.png" />
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        item: [
          { src: '../../../assets/images/home/banner.png' },
          { src: '../../../assets/images/home/banner.png' },
          { src: '../../../assets/images/home/banner.png' },
          { src: '../../../assets/images/home/banner.png' }
        ],
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .shop-home {
    .adver {
      width 100%
      margin 10px 0
      img {
        width 100%
        height 200px
      }
    }
    .swiper {
      height 300px
    }
  }
</style>