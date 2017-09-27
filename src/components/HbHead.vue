<template>
  <div class="top">
    <div class="basic-flex headfix">
      <div class="marlr10 base-color">
        <div class="basebtn pdtop" @click="goSignUp">
          <i class="iconfont icon-zhuce1"></i>
          <span class="pdtop">立即注册</span>
        </div>
        <div class="basebtn" @click="goSignOn">
          <i class="iconfont icon-weibiaoti2"></i>
          <span>立即登录</span>
        </div>
      </div>
      <div class="right marlr10">
        <div>掌上网征</div>
        <div>帮助中心</div>
        <div>联系电话400-4568-2568</div>
      </div>
    </div>
    <div class="basic-flex headmenu">
      <div class="logo"></div>
      <el-menu :default-active="activeIndex" class="nc-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="(data, index) in menuJson" :index='`${index +1}`'>
          <a :href="data.link">{{data.text}}</a>
        </el-menu-item>
      </el-menu>
      <!--<template v-for="data in menuJson">-->
        <!--<el-button class="marlr10 basic-width" type="primary">{{data.text}}</el-button>-->
      <!--</template>-->
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  props: {
    /**
     * 目前选中的菜单
     */
    activeIndex: {
      type: String,
      default: '1',
    },
  },
  data() {
    return {
      menuJson: [
        { text: '首页', link: '/home' },
        { text: '我要征集', link: '/home' },
        { text: '我要应征', link: '/home' },
        { text: '征集服务', link: '/home' },
        { text: '征集公告', link: '/login/signup' },
        { text: '个人中心', link: '/user' },
      ],
      logoPng: 'assets/images/logo.png',
    }
  },
  created() {
    console.log(this.activeIndex)
  },
  //相关操作事件
  methods: {
    goSignUp() {
      location.href='/login/signup'
    },
    goSignOn() {
      location.href='/login'
    },
    handleSelect(key) {
      this.activeIndex = key + ''
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .basic-flex {
    display: -webkit-flex
    display: flex
    flex-flow:row nowrap
    justify-content: space-around
    align-items: center
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .top {
    position relative
    top 0
    left 0
    right 0
  }
.headfix{
  height 50px
  background-color: #e4e8f1;
  /**box-shadow: 3px 0 6px rgba(230,234,238,0.9)
  border-bottom: 1px solid #e6eaee;**/
  .basebtn {
    display inline-block
    text-align center
    margin-left 10px
    vertical-align middle
    width 110px
    height 28px
    cursor pointer
    border: 1px solid #b49466
    span {
      margin-left 5px
      vertical-align baseline
    }
    .icon-weibiaoti2 {
      vertical-align baseline
      font-size: 18px
      font-weight 600
    }
    .bas-font-color {
      color #000
    }
  }
  .pdtop {
    padding-top 2px
  }
  .right {
    div {
      display inline-block
      margin-right 20px
    }
  }
}
.headmenu {
  justify-content: space-between
  height 70px
  barder 1px solid #eaeefb
  box-shadow: 3px 0 6px rgba(230,234,238,0.9)
  background-color: #eef1f6;
  .logo {
    width: 300px
    height 100%
    background url("../assets/images/home/logo.png") no-repeat 0 0/contain
  }
  .nc-menu {
    flex 1
    li {
      width: 16%
      text-align center
    }
  }
}
  .base-color {
    color: #b49466
  }
</style>
