<template>
  <div class="contain">
    <nc-header activeIndex="1"></nc-header>
    <div class="main">
      <div class="main-content">
        <div class="content-top">
          <nc-menu menu-title='所有分类' :cateId="2" :menuZdex="120" :selfWidth="250" :list="menuList"></nc-menu>
          <!--<nc-menu menu-title='个人服务类' :cateId="1" :menuZdex="100"></nc-menu>-->
          <div class="search-banner">
            <div class="search">
              <el-input
                placeholder="请输入征集标题、产品服务名称、店铺名进行搜索"
                icon="search"
                v-model="netSearch"
                :on-icon-click="handleIconClick">
              </el-input>
              <el-button type="primary" class="save-btn" @click="goCollect">免费发布需求</el-button>
              <el-button type="primary" class="save-btn" @click="goCreate">免费创建店铺</el-button>
            </div>
            <el-carousel>
              <el-carousel-item v-for="(data, index) in item" :key="index">
                <img src="./../../assets/images/home/banner.png" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <nc-menu menu-title='征集公告' :isSecond="false"></nc-menu>
        </div>
        <div class="content-recommend">
          <areaTitle title="热门服务推荐" link="user" baseUrl="/service">
            <card v-for="item in recommends[0].items" :item="item" baseUrl="/service/detail"></card>
            <!--<tab-list :items="recommends[0].items"></tab-list>-->
          </areaTitle>
          <areaTitle title="热门征集推荐" link="user" baseUrl="/collect">
            <el-carousel indicator-position="outside" height="460px">
              <el-carousel-item v-for="(data, index) in items1" :key="index">
                <card v-for="item in items1" :item="item"></card>
                <card v-for="item in data.items" :item="item" baseUrl="/collect/detail"></card>
                <!--<tab-list :items="data.mainItems"></tab-list>-->
                <!--<tab-list :items="data.items"></tab-list>-->
              </el-carousel-item>
            </el-carousel>
          </areaTitle>
          <areaTitle title="热门店铺推荐" link="user" baseUrl="/shop">
            <card v-for="item in recommends[0].items" :item="item" baseUrl="/shop/detail"></card>
            </areaTitle>
        </div>
      </div>
      <nc-footer></nc-footer>
    </div>
  </div>
</template>

<script type="text/babel">
  import Lib from 'assets/js/Lib'
  import ncMenu from 'components/menu.vue'
  import areaTitle from 'components/area-title.vue'
  import tabList from 'components/tab-list.vue'
  import card from 'components/card.vue'
  import mixCommon from 'utils/common'
  import upload from 'src/assets/js/upload'

  export default {
    mixins: [Lib, mixCommon, upload],
    data () {
      return {
        menuList: [],
        menuZdex1: 120, // 类京东菜单z-index 120
        menuZdex2: 100, // 类京东菜单z-index 100
        netSearch: '',
        item: [
          { src: './../../assets/images/home/banner.png' },
          { src: './../../assets/images/home/banner.png' }
          ],
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
        search: {
          search: undefined,
          categoryId: '', // 分类ID
          keysJson: '', // 关键字数组
          time_start: '',
          pricesJson: '',
          orderBy: 'related',
          offset: 0,
          pageCount: 1,
          num: 10,
          totalCount: 0,
        },
        items1: [],
      }
    },
    components: {
      ncMenu,
      areaTitle,
      tabList,
      card,
    },
    created() {
      this.getCategory('menuList')
      this.getCollect()
    },
    methods: {
      getCollect() {
        this.http.post('/rest/demand/list', this.search).then(
          (res) => {
            const datas = res.data.list
            this.items1 = datas
            const userId = window.localStorage.getItem('netId')
            this.bucketUrl = `${window.localStorage.getItem('bucketUrl')}/`
            if (this.bucketUrl) {
              this.dealItems()
            } else {
              this.requestclient(`data/demand/${userId}`)
            }
          }).catch(err => {
            this.$message.error({ message: err || '出错了' })
          })
      },
      // 获取阿里云new oss接口
      async requestclient(alicateLog) {
        await this.getClient(alicateLog, 'ossclient')
        this.bucketUrl = `http://${this.ossclient.bucket}.${this.ossclient.region}.aliyuncs.com/`
        window.localStorage.setItem('bucketUrl', this.bucketUrl)
        this.dealItems()
      },
      // 处理列表数据
      dealItems() {
        this.items.forEach(l => {
          if (this.bucketUrl && l.mainPic) {
            l.mainPic = this.bucketUrl + l.mainPic
            l.priceText = this.dealPrice(l.price)
          }
        })
      },
      goCollect() {
        window.location.href="/user/collecter/add"
      },
      goCreate() {
        window.location.href="/user/shop-set/create"
      },
      handleIconClick(ev) {
        console.log(ev);
      }
    },
  }
</script>
<style rel="stylesheet/stylus" lang="stylus">
  .search-banner {
    .el-input {
      .el-input__inner {
        border 3px solid #d6c5ac
        border-radius 0
        height 40px
      }
      .el-input__icon {
        background #d6c5ac
        color #fff
      }
    }
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .contain {
    width 100%
    height 100%
    min-height 100%
    display: -webkit-flex
    display: flex
    flex-flow:column nowrap
    justify-content: flex-start
    .main {
      flex 1
      position relative
      display: -webkit-flex
      display: flex
      flex-flow:column nowrap
      justify-content: flex-start
      .main-content {
        flex: 1
        margin-bottom 15px
      }
    }
  }
    .content-top {
      display flex
      flex-flow row nowrap
      justify-content center
      width 100%
      height 600px
      padding-top 20px
      background url('../../assets/images/home/back.jpg') no-repeat 0 0/ cover
    }
    .search-banner {
      width 60%
      height 100%
      .search {
        text-align center
      }
      .el-input {
        width 60%
      }
      .save-btn {
        display inline-block
        vertical-align top
        height 40px
        border-radius 0
      }
      /**幻灯片demo**/
      .el-carousel {
        width: 100%
        height 80%
      }
      .el-carousel__item img {
        display block
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        width 100%
        height 100%
      }
    }
  .content-recommend {
    width 1310px
    margin 0 auto
    .recommend-item {
      margin 0 20px
    }
    /**幻灯片demo**/
    .el-carousel {
      overflow hidden
    }
  }
</style>
