<template>
  <div class="collector-add">
    <baseInfo :onConfirm="submitBasic" title="基本信息"></baseInfo>
    <!-- 价格信息-->
    <div class="wrap">
      <div class="title">价格信息</div>
      <div>
        <div class="collect-price marb20">
          <div class="prc-title">征集价格：</div>
          <multiRadio v-model="type" :radioArray="radioList1">
            <multiRadio slot="radio0" v-model="activeType" :radioArray="radio1List">
              <multiRadio slot="radio0" v-if="activeType === 1" v-model="rangeType" :radioArray="radio2List">
                <div slot="radio0" class="line-block font12">
                  <el-input class="line-block small-input" v-model="fixedPrice"></el-input>
                  <span>元</span>
                </div>
                <div class="line-block font12" slot="radio1">
                  <el-input class="line-block small-input" v-model="pirceRange1"></el-input>
                  <span>至</span>
                  <el-input class="line-block small-input" v-model="pirceRange2"></el-input>
                  <span>元</span>
                </div>
              </multiRadio>
              <div slot="radio1" v-if="activeType === 2" class="line-block font14 marl20 stages">
                <div class="line-block marr20" :class="{ mart20: index > 1 }" v-for="(item, index) in periods">
                    {{(index+1).toLocaleString('zh-Hans-CN-u-nu-hanidec')}}期付款：
                  <el-input class="line-block small-input" v-model="stagePrice[index]"></el-input>
                  <i v-if="index > 0" @click="reducePeriods(index)" class="line-block iconfont icon-chahao"></i>
                </div>
                <div class="line-block addStage" @click="addPeriods"><i class="iconfont icon-jiahao"></i></div>
              </div>
            </multiRadio>
          </multiRadio>
        </div>
        <div class="logistics-info">
          <div class="prc-title">物流信息：</div>
          <multiRadio v-model="needLogistics" :radioArray="radioExpress">
            <multiRadio slot="radio0" v-model="isexpCost" :radioArray="expressCost"></multiRadio>
          </multiRadio>
        </div>
      </div>
    </div>
    <!-- 价格信息结束-->
    <!-- 详细信息-->
    <detail title="详细信息" :onConfirm="submitDetail"></detail>
    <div class="btn-set">
      <el-button type="primary" class="save-btn" @click="save">保存</el-button>
      <el-button type="primary" class="cancel-btn">取消</el-button>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "add-common.styl"
  .collector-add {
    margin-top 20px
    .title {
      margin-bottom 20px
    }
    .collect-price, .logistics-info {
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
    .stages {
      align-self: flex-start;
      .icon-chahao {
        cursor pointer
        font-size 16px
        color #bfcbd9
      }
    }
    .addStage {
      text-align center
      vertical-align middle
      cursor pointer
      .icon-jiahao {
        font-size 25px
        color #ff6e1b
      }
    }
  }
</style>
<script>
  import baseInfo from './basic.vue'
  import multiRadio from '../../components/multi-radio.vue'
  import detail from './detail.vue'
  export default{
    components: {
      baseInfo,
      multiRadio,
      detail
    },
    data() {
      return {
        type: 1, // 征集价格，商家报价还是指定价格
        activeType: 1,
        rangeType: 1,
        fixedPrice: '', // 具体价格
        pirceRange1: '', // 区间价格1
        pirceRange2: '', // 区间价格2
        stagePrice: [], // 分期付款
        needLogistics: false, // 是否需要快递
        isexpCost: false, // 是否免快递费
        priceJson: {}, // 价格信息集合
        radioList1: [
          { label: 1, value: '指定价格' },
          { label: 2, value: '商家报价' },
        ],
        radio1List: [
          { label: 1, value: '一次性付款' },
          { label: 2, value: '分期付款' },
        ],
        radio2List: [
          { label: 1, value: '具体价格' },
          { label: 2, value: '区间价格' },
        ],
        radioExpress: [
          { label: true, value: '需要快递' },
        ],
        expressCost: [
          { label: true, value: '快递费' },
          { label: false, value: '免快递费' },
        ],
        periods: 5,
        basic: {},
        detail: {},
      }
    },
    methods: {
      /**
       * 提交基本信息
       * @param {Object} data 基本信息
       */
      submitBasic(data) {
        this.basic = data
        this.confirm()
      },
      /**
       * 提交详细信息
       * @param {Object} data 详细信息
       */
      submitDetail(data) {
        this.detail = data
        this.confirm()
      },
      /**
       * 判断是否是空对象
       * @return {Boolean} true表示是空对象
       */
      isNullObj(obj) {
        return JSON.stringify(obj) === '{}'
      },
      /**
       * 确认提交
       */
      confirm() {
        const flag = !(this.isNullObj(this.basic) || this.isNullObj(this.detail))
        if (flag) {
          this.priceJson = this.dealPrice()
          const price = { priceJson: this.priceJson, needLogistics: this.needLogistics }
          const params = Object.assign({}, this.basic, price, this.deatil)
          console.log(params)
          // /rest/demand/publish post 请求
        }
      },
      /**
       * 增加分期
       */
      addPeriods() {
        if (this.periods < 5) {
          this.periods++
        }
      },
      /**
       * 删除某一期
       * @param {Number} index 删除第几期
       */
      reducePeriods(index) {
        if (this.periods > 1) {
          this.periods--
          this.stagePrice.splice(index, 1)
        }
      },
      /**
       * 保存按钮
       */
      save() {
        this.basic = {}
        this.detail = {}
        this.$emit('save')
      },
      /**
       * 提交处理价格信息
       * price jsonb default '{}'::jsonb,
       * -- 价格：type:1-指定价格/2-商家报价，
       * activeType:1-一次性/2-分期，
       * rangeType:1-固定/2-范围，
       * fixedPrice:5000.0, rangePrice:[1000.0,5000.0],
       * stagePrice:[1000.0,2000.0,2000.0]分期价格
       */
      dealPrice() {
        let obj = {}
        obj.type = this.type
        if (this.type === 1) {
          obj.activeType = this.activeType
          if (this.activeType === 1) {
            obj.rangeType = this.rangeType
            if (this.rangeType === 1) {
              obj.fixedPrice = this.fixedPrice
            } else {
              obj.rangePrice = [this.pirceRange1, this.pirceRange2]
            }
          } else {
            obj.stagePrice = this.stagePrice
          }
        }
        return obj
      }
    },
    watch: {
      typePrice(val, old) {

      }
    },
  }
</script>
