<template>
  <div class="contain">
    <nc-header></nc-header>
    <div class="main">
      <h1>这是首页，进来的地方，我可以从这里跳转到任何地方</h1>
      <div>
        <el-carousel height="150px">
          <el-carousel-item v-for="(data, index) in item" :key="index">
            <h3 :style="{'background': data}">{{ data }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <nc-footer></nc-footer>
    </div>
  </div>
</template>

<script type="text/babel">
  import Lib from 'assets/js/Lib'

  export default {
    data() {
      return {
        item: ['#ccc', 'blue', 'pink']
      }
    },
  }
</script>
<style>

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
    }
  }
  /**幻灯片demo**/
  .el-carousel {
    margin 0 auto
    width: 500px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    height 150px;
    line-height: 150px;
    margin: 0;
  }
</style>
