<!-- 设置店铺首页 -->
<template>
  <div class="shop-set">
    <h2>商户店铺首页设置</h2>
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="data in tabList" :name="data.value" :label="data.label"></el-tab-pane>
    </el-tabs>
    <div class="home-set">
      <upload v-model="setHome.mainPic"
              title="上传广告图"
              aliCatalog="data/service"
              :isDelete="false"
              :ossClient="ossclient"
              v-if="activeName === '0' && ossclient"
              maxSize="2"
              prompt="请上传JPG,JPEG,PNG,PDF格式的图片，图片大小不超过2M"></upload>
      <div v-show="activeName === '1'" >
        <h4>
          设置轮播图
          <el-tooltip effect="dark" content="至多只能添加四张图" placement="top-start">
            <i class="el-icon-circle-plus" @click="addImg"></i>
          </el-tooltip></h4>
        <upload v-for="index in setHome.roundPics.length"
                v-model="setHome.roundPics[index - 1]"
                aliCatalog="data/service"
                :ossClient="ossclient"
                v-if="ossclient"
                title="上传轮播图"
                :isDelete="false"
                class="swiper-img"
                maxSize="2"
                prompt="请上传JPG,JPEG,PNG,PDF格式的图片，图片大小不超过2M"></upload>
      </div>
      <div v-show="activeName === '2'" >
        <upload v-model="setHome.contentPic"
                aliCatalog="data/service"
                :ossClient="ossclient"
                v-if="ossclient"
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
        <div class="setmore" v-for="data in setHome.urls">
          <el-input class="net-set" v-model="data.name" placeholder="请输入链接网站名称"></el-input>
          <el-input class="net-set" v-model="data.url" placeholder="请输入链接网站地址"></el-input>
        </div>
      </div>
    </div>
    <div class="btn-set">
      <el-button class="set-home" type="primary" @click="submit">完成</el-button>
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
  import upload from 'src/assets/js/upload'

  export default {
    mixins: [upload],
    data() {
      return {
        ossclient: null,
        activeName: '0',
        tabList: [
          { label: '页面广告图', value: '0' },
          { label: '页面轮播图', value: '1' },
          { label: '页面内容图', value: '2' },
          { label: '更多设置', value: '3' },
        ],
        setHome: {
          mainPic: '',
          roundPics: [''],
          contentPic: '',
          urls: [
            { name: '', url: ''}
          ],
        },
      }
    },
    created() {
      this.requestclient()
      this.http.post('/rest/shop/myShop').then(
        (res) => {
          const obj = res.data.shop
          this.setHome = {
            mainPic: obj.mainPic,
            roundPics: obj.roundPics,
            contentPic: obj.contentPic,
            urls: obj.urls,
          }
        }).catch(err => {
          this.$message.error({ message: err || '出错了' })
        })
    },
    methods: {
      // 提交首页设置
      submit() {
        const params = {
          mainPic: this.setHome.mainPic,
          roundPics: JSON.stringify(this.setHome.roundPics),
          contentPic: this.setHome.contentPic,
          urls: JSON.stringify(this.setHome.urls)
        }
        this.http.post('/rest/shop/updateEx', params).then(res => {
          if (res.result === 1) {
            this.$message.success(res.message || '首页设置成功')
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      // 获取阿里云new oss接口
      async requestclient() {
        const param = 'data/service'
        await this.getClient(param, 'ossclient')
      },
      /**
       * 添加轮播图
       */
      addImg() {
        const len = this.setHome.roundPics.length
        if (len < 4) {
          this.setHome.roundPics.push('')
        }
      },
      addLink() {
        this.setHome.urls.push({ name: '', url: ''})
      },
    },
  }
</script>
