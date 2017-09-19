<template>
  <div>
    您现在的位置是登录页面
    <router-link :to="links.toFind">
      <el-button>找回密码</el-button>
    </router-link>
    <router-link :to="links.signup">
      <el-button>注册</el-button>
    </router-link>
    <router-link :to="links.editPass">
      <el-button>修改密码</el-button>
    </router-link>
  </div>
</template>
<style scoped>
  div{
       background-color:#ff0000;
    }
</style>
<script type="text/babel">
  export default{
    data(){
      return{
        links: {
          toFind: '/findpass',
          signup: '/signup',
          editPass: '/editPass'
        },
      }
    },
  }
</script>
