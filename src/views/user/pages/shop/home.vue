<!-- 设置店铺首页 -->
<template>
  <div class="shop-set">
    <h2>商户店铺首页设置</h2>
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="data in tabList" :name="data.value" :label="data.label"></el-tab-pane>
    </el-tabs>
    <div class="home-set">
      <upload v-show="activeName === '0'"
              v-model="setHome.adImg"
              title="上传广告图"
              :isDelete="false"
              maxSize="2"
              prompt="请上传JPG,JPEG,PNG,PDF格式的图片，图片大小不超过2M"></upload>
      <div v-show="activeName === '1'" >
        <h4>
          设置轮播图
          <el-tooltip effect="dark" content="至多只能添加四张图" placement="top-start">
            <i class="el-icon-circle-plus" @click="addImg"></i>
          </el-tooltip></h4>
        <upload v-for="index in setHome.swiperImg.length"
                v-model="setHome.swiperImg[index - 1]"
                title="上传轮播图"
                :isDelete="false"
                class="swiper-img"
                maxSize="2"
                prompt="请上传JPG,JPEG,PNG,PDF格式的图片，图片大小不超过2M"></upload>
      </div>
      <div v-show="activeName === '2'" >
        <upload v-model="setHome.contentImg"
                title="上传内容图"
                :isDelete="false"
                class="swiper-img"
                maxSize="2"
                prompt="请上传JPG,JPEG,PNG,PDF格式的图片，图片大小不超过2M"></upload>
      </div>
      <div v-show="activeName === '3'">
        <h4>
          精彩链接设置
          <i class="el-icon-circle-plus" @click="addLink"></i></h4>
        <div class="setmore" v-for="data in setHome.netset">
          <el-input class="net-set" v-model="data.name" placeholder="请输入链接网站名称"></el-input>
          <el-input class="net-set" v-model="data.link" placeholder="请输入链接网站地址"></el-input>
        </div>
      </div>
    </div>
    <div class="btn-set">
      <el-button class="set-home" type="primary">完成</el-button>
    </div>
  </div>
</template>
<style lang="stylus">
  .el-icon-circle-plus {
    font-size 22px
    color #ff6e1b
    cursor pointer
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .set-home {
    width 200px
  }
  .home-set {
    margin: 20px 0
  }
  .swiper-img {
    display inline-block
    margin 10px
    vertical-align top
    .el-icon-circle-plus {
      vertical-align middle
    }
  }
  .setmore {
    border 1px dashed #ff6e1b
    display inline-block
    margin 10px
    padding 10px
    padding-top 0
    width 220px
  }
  .net-set {
    display block
    width 200px
    margin-top 10px
  }
  .btn-set {
    margin 0 auto
  }
</style>
<script>
  export default {
    data() {
      return {
        activeName: '0',
        tabList: [
          { label: '页面广告图', value: '0' },
          { label: '页面轮播图', value: '1' },
          { label: '页面内容图', value: '2' },
          { label: '更多设置', value: '3' },
        ],
        setHome: {
          adImg: '',
          swiperImg: [''],
          contentImg: '',
          netset: [
            { name: '', link: ''}
          ],
        },
      }
    },
    methods: {
      /**
       * 添加轮播图
       */
      addImg() {
        const len = this.setHome.swiperImg.length
        if (len < 4) {
          this.setHome.swiperImg.push('')
        }
      },
      addLink() {
        this.setHome.netset.push({ name: '', link: ''})
      },
    },
  }
</script>
