<template>
  <div>
    <nc-header></nc-header>
    <h1>这是首页，进来的地方，我可以从这里跳转到任何地方</h1>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-button><a href="/login/findpass">跳转路径</a> </el-button>
    <nc-footer></nc-footer>
  </div>
</template>

<script type="text/babel">
  import Lib from 'assets/js/Lib'

  export default {
    data() {
      return {

      }
    },
  }
</script>
<style>
</style>
