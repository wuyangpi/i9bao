<template>
  <div class="contain">
    <nc-header activeIndex="1"></nc-header>
    <div class="main">
      <div class="main-content">
        <div class="content-top">
          <nc-menu menu-title='商家企业类' :menuZdex="120"></nc-menu>
          <nc-menu menu-title='个人服务类' :menuZdex="100"></nc-menu>
          <div class="search-banner">
            <div class="search">
              <el-input
                placeholder="请输入征集标题、产品服务名称、店铺名进行搜索"
                icon="search"
                v-model="netSearch"
                :on-icon-click="handleIconClick">
              </el-input>
              <el-button type="primary" class="save-btn">免费发布需求</el-button>
              <el-button type="primary" class="save-btn">免费创建店铺</el-button>
            </div>
            <el-carousel>
              <el-carousel-item v-for="(data, index) in item" :key="index">
                <img src="./../../assets/images/home/banner.png" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <nc-menu menu-title='征集公告' :isSecond="false"></nc-menu>
        </div>
        <el-row>
          <el-col :span="8" v-for="(o, index) in 9" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="./../../assets/images/home/logo.png" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <nc-footer></nc-footer>
    </div>
  </div>
</template>

<script type="text/babel">
  import Lib from 'assets/js/Lib'
  import ncMenu from 'components/menu.vue'

  export default {
    mixins: [Lib],
    data () {
      return {
        menuZdex1: 120, // 类京东菜单z-index 120
        menuZdex2: 100, // 类京东菜单z-index 100
        netSearch: '',
        item: [
          { src: './../../assets/images/home/banner.png' },
          { src: './../../assets/images/home/banner.png' }
          ],
        cardpic: './../../assets/images/home/logo.png',
        currentDate: new Date()
      }
    },
    components: {
      ncMenu
    },
    methods: {
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
      color #d6c5ac
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
      width 50%
      height 100%
      .search {
        text-align center
      }
      .el-input {
        width 60%
      }
      .save-btn {
        display inline-block
        width 110px
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
</style>
