<template>
  <div class="collector-add">
    <baseInfo title="基本信息"></baseInfo>
    <!-- 价格信息-->
    <div class="wrap">
      <div class="title">价格信息</div>
      <div>
        <div class="collect-price">
          <div class="prc-title">征集价格：</div>
          <multiRadio v-model="collPrice" :radioArray="radioList1">
            <multiRadio slot="radio0" v-model="typePrice" :radioArray="radio1List">
              <multiRadio slot="radio0" v-model="setPrice" :radioArray="radio2List">
                <div slot="radio0" class="line-block font12">
                  <el-input class="line-block small-input" v-model="specificPirce"></el-input>
                  <span>元</span>
                </div>
                <div class="line-block font12" slot="radio1">
                  <el-input class="line-block small-input" v-model="pirceRange1"></el-input>
                  <span>至</span>
                  <el-input class="line-block small-input" v-model="pirceRange2"></el-input>
                  <span>元</span>
                </div>
              </multiRadio>
              <div slot="radio1" class="line-block font14 marl20 stages">
                <div class="line-block marb20" v-for="(item, index) in periods">
                    {{(index+1).toLocaleString('zh-Hans-CN-u-nu-hanidec')}}期付款：
                  <el-input class="line-block small-input" v-model="stagePrice[index]"></el-input>
                </div>
                <div class="line-block addStage">+</div>
              </div>
            </multiRadio>
          </multiRadio>
        </div>
        <div class="logistics-info">
          <div class="prc-title">物流信息：</div>
          <multiRadio v-model="isExpress" :radioArray="radioExpress">
            <multiRadio slot="radio0" v-model="isexpCost" :radioArray="expressCost"></multiRadio>
          </multiRadio>
        </div>
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
    .collect-price {
      display flex
      flex-flow row nowrap
      align-items center
      .prc-title {
        width 70px
      }
      .line-block {
        flex 1
      }
    }
    .small-input {
      width 100px
      margin 0 10px
    }
    .marl20 {
      margin-left 20px
    }
    .marb20 {
      margin-bottom 20px
    }
    .stages {
      align-self: flex-start;
    }
    .addStage {
      width 20px;
      height 20px;
      text-align center
      cursor pointer
      border 1px solid #ccc;
      border-radius: 2px;
      box-shadow: 0 0 0 1px rgba(0,0,0, 0.3);
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
        stagePrice: [], // 分期付款
        isExpress: false, // 是否需要快递
        isexpCost: false, // 是否免快递费
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
        radioExpress: [
          { label: true, value: '需要快递' },
        ],
        expressCost: [
          { label: true, value: '快递费' },
          { label: false, value: '免快递费' },
        ],
        periods: 5
      }
    },
    watch: {
      typePrice(val, old) {

      }
    },
  }
</script>
