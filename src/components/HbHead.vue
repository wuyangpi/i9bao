<template>
  <div class="top">
    <div class="basic-flex headfix">
      <div class="marlr10 base-color">
        <div class="basebtn pdtop" @click="goSignUp">
          <i class="iconfont icon-zhuce"></i>
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
        <el-menu-item v-for="(data, index) in menuJson" :index='`${index +1}`' :route="data.link">{{data.text}}</el-menu-item>
      </el-menu>
      <!--<template v-for="data in menuJson">-->
        <!--<el-button class="marlr10 basic-width" type="primary">{{data.text}}</el-button>-->
      <!--</template>-->
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  data() {
    return {
      menuJson: [
        { text: '首页', link: { path: '/home' } },
        { text: '我要征集', link: { path: '/home' } },
        { text: '我要应征', link: { path: '/home' } },
        { text: '征集服务', link: { path: '/home' } },
        { text: '征集公告', link: { path: '/home' } },
        { text: '个人中心', link: { path: '/login' } },
      ],
      logoPng: 'assets/images/logo.png',
      activeIndex: '1',
    }
  },
  props: {
	headfont: {
		type: String,
		default: '导航'
	}
  },
  //相关操作事件
  methods: {
    goSignUp() {
      location.href='/login/signup'
    },
    goSignOn() {
      location.href='/login'
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
  .headmenu {
    .el-menu--horizontal>.el-menu-item:hover,
    .el-menu--horizontal>.el-submenu.is-active .el-submenu__title,
    .el-menu--horizontal>.el-submenu:hover .el-submenu__title {
      border-bottom: 5px solid #ff6e1b
      color: #ff6e1b;
    }
   .el-menu-item.is-active {
     color: #ff6e1b;
   }
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
    background url("../assets/images/logo.png") no-repeat 0 0/contain
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
