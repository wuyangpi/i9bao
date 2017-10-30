<template>
  <div class="collector-add">
    <baseInfo title="基本信息"></baseInfo>
    <!-- 价格信息-->
    <div class="wrap">
      <div class="title">价格信息</div>
      <div>
        <div class="collect-price">
          <span>征集价格：</span>
          <multiRadio v-model="collPrice" :radioArray="radioList1">
            <multiRadio slot="radio0" v-model="typePrice" :radioArray="radio1List">
              <multiRadio slot="radio0" v-model="setPrice" :radioArray="radio2List">
                <div slot="radio0" class="line-block">
                  <el-input class="line-block small-input" v-model="specificPirce"></el-input>
                  <span>元</span>
                </div>
                <div class="line-block" slot="radio1">
                  <el-input class="line-block small-input" v-model="pirceRange1"></el-input>
                  <span>至</span>
                  <el-input class="line-block small-input" v-model="pirceRange2"></el-input>
                </div>
              </multiRadio>
            </multiRadio>
          </multiRadio>
        </div>
        <div class="logistics-info"></div>
      </div>
    </div>
    <!-- 价格信息结束-->
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "add-common.styl"
  .collector-add {
    margin-top 20px
    .title {
      margin-bottom 20px
    }
    .small-input {
      width 100px
      margin 0 10px
    }
  }
</style>
<script>
  import baseInfo from './basic.vue'
  import multiRadio from '../../components/multi-radio.vue'
  export default{
    components: {
      baseInfo,
      multiRadio
    },
    data() {
      return {
        collPrice: 0,
        typePrice: 'once',
        setPrice: 'specific',
        specificPirce: '', // 具体价格
        pirceRange1: '', // 区间价格1
        pirceRange2: '', // 区间价格2
        radioList1: [
          { label: 0, value: '指定价格' },
          { label: 1, value: '商家报价' },
        ],
        radio1List: [
          { label: 'once', value: '一次性付款' },
          { label: 'stages', value: '分期付款' },
        ],
        radio2List: [
          { label: 'specific', value: '具体价格' },
          { label: 'section', value: '区间价格' },
        ],
      }
    },
    watch: {
      collPrice(val, old) {
        console.log(val, old)
      }
    },
  }
</script>
