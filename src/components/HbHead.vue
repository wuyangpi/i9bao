<template>
  <div>
    <div class="basic-flex headfix">
      <div class="left marlr10">
        <el-button type="text">立即注册</el-button>
        <el-button type="text">立即登录</el-button>
      </div>
      <div class="right marlr10">
        <el-button type="text">掌上网征</el-button>
        <el-button type="text">帮助中心</el-button>
        <el-button type="text">联系电话400-4568-2568</el-button>
      </div>
    </div>
    <div class="basic-flex headmenu">
      <div class="logo">logo</div>
      <router-link class="marlr10" v-for="data in menuJson" :to="data.link">
        <el-button class="basic-width" type="primary">{{data.text}}</el-button>
      </router-link>
    </div>
  </div>
</template>

<script type="text/babel">

import Lib from 'assets/js/Lib'

export default {
  data() {
    return {
      menuJson: [
        { text: '首页', link: '/home' },
        { text: '我要征集', link: '/home' },
        { text: '我要应征', link: '/home' },
        { text: '征集服务', link: '/home' },
        { text: '征集公告', link: '/home' },
        { text: '个人中心', link: '/login' },
      ],
      logoPng: 'assets/images/logo.png',
    }
  },
  props: {
	headfont: {
		type: String,
		default: '导航'
	}
  },
  //实例初始化最之前，无法获取到data里的数据
  beforeCreate(){


  },
  //在挂载开始之前被调用
  beforeMount(){


  },
  //已成功挂载，相当ready()
  mounted(){



  },
  //相关操作事件
  methods: {




  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .basic-flex {
    display: -webkit-flex
    display: flex
    flex-flow:row nowrap
    justify-content: space-between
    align-items: center
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.headfix{
  height 40px
  background-color: #e4e8f1;
  /**box-shadow: 3px 0 6px rgba(230,234,238,0.9)
  border-bottom: 1px solid #e6eaee;**/
}
.headmenu {
  justify-content: space-around
  height 80px
  barder 1px solid #eaeefb
  box-shadow: 3px 0 6px rgba(230,234,238,0.9)
  background-color: #eef1f6;
  .basic-width {
    width: 120px
  }
  .logo {
    width: 110px
    height 50px
    background url("../assets/images/logo.png") no-repeat 30px 0/contain
  }
}
</style>
