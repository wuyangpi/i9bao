<template>
  <div class="contain">
    <nc-header></nc-header>
    <div class="main">
      <div class="main-content">
        <h1>这是首页，进来的地方，我可以从这里跳转到任何地方</h1>
        <el-carousel height="150px">
          <el-carousel-item v-for="(data, index) in item" :key="index">
            <h3 :style="{'background': data}">{{ data }}</h3>
          </el-carousel-item>
        </el-carousel>
        <el-row>
          <el-col :span="8" v-for="(o, index) in 9" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="cardpic" class="image">
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

  export default {
    mixins: [Lib],
    data () {
      return {
        item: ['#ccc', 'blue', 'pink'],
        cardpic:  require('../../assets/images/logo.png'),
        currentDate: new Date()
      }
    }
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
