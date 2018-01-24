<template>
  <div class="collector-add">
    <h3>新增征集</h3>
    <baseInfo :onConfirm="submitBasic" name="征集" title="基本信息" :edits="editObject"></baseInfo>
    <!-- 价格信息-->
    <div class="wraps">
      <div class="title">价格信息</div>
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
          <div class="collect-price marb20">
            <div class="prc-title">征集价格：</div>
            <multiRadio v-model="type" :radioArray="radioList1" :changeValue="changeListType">
              <multiRadio slot="radio0" v-model="activeType" :isDisabled="type === 2" :radioArray="radio1List">
                <multiRadio slot="radio0"
                            v-if="activeType === 1"
                            :isDisabled="type === 2 || activeType === 2"
                            v-model="rangeType"
                            :radioArray="radio2List"
                            :changeValue="changeType">
                  <div slot="radio0" class="line-block font12">
                    <el-form-item  class="line-block small-input"  prop="fixedPrice">
                      <el-input type="number" :disabled="type === 2 || activeType === 2 || rangeType === 2" v-model="ruleForm.fixedPrice"></el-input>
                    </el-form-item>
                    <span>元</span>
                  </div>
                  <div class="line-block font12" slot="radio1">
                    <el-form-item class="line-block small-input" prop="pirceRange1">
                      <el-input type="number"
                                :disabled="type === 2 || activeType === 2 || rangeType === 1"
                                v-model="ruleForm.pirceRange1"></el-input>
                    </el-form-item>
                    <span>至</span>
                    <el-form-item class="line-block small-input" prop="pirceRange2">
                      <el-input :disabled="type === 2 || activeType === 2 || rangeType === 1"
                                type="number"
                                v-model="ruleForm.pirceRange2"></el-input>
                    </el-form-item>
                    <span>元</span>
                  </div>
                </multiRadio>
                <div slot="radio1" v-if="activeType === 2" class="line-block font14 marl20 stages">
                  <div class="line-block marr20" :class="{ mart20: index > 1 }" v-for="(item, index) in periods">
                    {{(index+1).toLocaleString('zh-Hans-CN-u-nu-hanidec')}}期付款：
                    <el-form-item class="line-block small-input" :prop="'stagePrice.' + index" :rules="[{ validator: validatePrice, trgger: 'blur' }]">
                      <el-input type="number" :disabled="type === 2 || activeType === 1" v-model="ruleForm.stagePrice[index]"></el-input>
                    </el-form-item>
                    <i v-if="index > 0" @click="reducePeriods(index)" class="line-block iconfont icon-chahao"></i>
                  </div>
                  <div class="line-block addStage" @click="addPeriods"><i class="iconfont icon-jiahao"></i></div>
                </div>
              </multiRadio>
            </multiRadio>
          </div>
          <div class="logistics-info">
            <div class="prc-title">物流信息：</div>
            <el-checkbox v-model="needLogistics">需要快递</el-checkbox>
            <!--<multiRadio v-model="needLogistics" :radioArray="radioExpress">-->
            <!--<multiRadio slot="radio0" v-model="isexpCost" :radioArray="expressCost"></multiRadio>-->
            <!--</multiRadio>-->
          </div>
        </el-form>
      </div>
    </div>
    <!-- 价格信息结束-->
    <!-- 详细信息-->
    <detail title="详细信息"
            :catelog="`data/demand/${userId}`"
            labelImg="商品主图"
            labelDesc="征集详情"
            :edits="editObject"
            :onConfirm="submitDetail"></detail>
    <div class="btn-set">
      <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="save">暂存</el-button>
      <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="submit">提交</el-button>
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
      const validFix = (rule, value, callback) => {
        if (this.type === 1 && this.activeType === 1 && this.rangeType === 1 && value === '') {
          callback(new Error('请输入价格'))
        }
        callback()
      }
      const validRange = (rule, value, callback) => {
        if (this.type === 1 && this.activeType === 1 && this.rangeType === 2 && value === '') {
          callback(new Error('请输入价格'))
        }
        callback()
      }
      return {
        userId: 0,
        type: 1, // 征集价格，商家报价还是指定价格
        activeType: 1,
        rangeType: 1,
        ruleForm: {
          fixedPrice: '', // 具体价格
          pirceRange1: '', // 区间价格1
          pirceRange2: '', // 区间价格2
          stagePrice: [], // 分期付款
        },
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
        periods: 1,
        basic: {},
        detail: {},
        editObject: {},  // 编辑时候的数据
        isSubmit: false, // false 代表暂存，true代表提交
        isDisabled: false, // false代表可以操作
        submitUrl: '/rest/demand/publish',  // 提交URL
        rules: {
          fixedPrice: [
            { validator: validFix, trigger: 'blur' },
          ],
          pirceRange1: [
            { validator: validRange, trigger: 'blur' },
          ],
          pirceRange2: [
            { validator: validRange, trigger: 'blur' },
          ],
        }
      }
    },
    created() {
      this.userId = window.localStorage.getItem('netId')
      const id = this.$route.query.id
      if (id) {
        this.http.post('/rest/demand/detail', { id }).then(
          (res) => {
            this.editObject = res.data.demand
            this.needLogistics = this.editObject.needLogistics
            this.dealEditPrice(this.editObject.price)
          }).catch(err => {
            this.$message.error({ message: err || '出错了' })
          })
        this.submitUrl = '/rest/demand/edit'
      }
    },
    methods: {
      changeType(val) {
        if (val === 2) {
          this.$refs.ruleForm.validateField('fixedPrice')
        } else {
          this.$refs.ruleForm.validateField('pirceRange1')
          this.$refs.ruleForm.validateField('pirceRange2')
        }
      },
      changeListType(val) {
        if (val === 2) {
          if (this.activeType === 2) {
            for (let i = 0; i < this.periods; i++) {
              this.$refs.ruleForm.validateField('stagePrice.' + i)
            }
          } else {
            this.$refs.ruleForm.validateField('fixedPrice')
            this.$refs.ruleForm.validateField('pirceRange1')
            this.$refs.ruleForm.validateField('pirceRange2')
          }
        }
      },
      /**
       * 动态校验分期分款
       * @param {Object} rule 校验信息规则
       * @param {string} value 当前字段的值
       * @param {function} callback 回调函数
       */
      validatePrice(rule, value, callback) {
        if (this.type === 1 && !value) {
          callback(new Error('请输入价格'))
        }
        callback()
      },
      /**
       * 提交基本信息
       * @param {Object} data 基本信息
       */
      submitBasic(data) {
        this.basic = data
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
        this.$refs.ruleForm.validate((valid) => {
          if (valid && flag) {
            this.isDisabled = true
            this.priceJson = this.dealPrice()
            const price = { priceJson: JSON.stringify(this.priceJson), needLogistics: this.needLogistics, isSubmit: this.isSubmit }
            const id = this.$route.query.id
            let params
            if (id) {
              params = Object.assign({ demandId: id }, this.basic, price, this.detail)
            } else {
              params = Object.assign({}, this.basic, price, this.detail)
            }
            this.http.post(this.submitUrl, params).then(
              (res) => {
                this.isDisabled = false
                this.$message.success({ message: res.message || '提交成功' })
                history.go(-1)
              }).catch( err => {
                this.isDisabled = false
                this.$message.error({ message: err || '提交失败' })
              })
          } else {
            this.$message.error({ message: '请填写完整信息！' })
          }
        })
      },
      /**
       * 增加分期
       */
      addPeriods() {
        if (this.type === 2 || this.activeType === 1) return
        if (this.periods < 5) {
          this.periods++
        }
      },
      /**
       * 删除某一期
       * @param {Number} index 删除第几期
       */
      reducePeriods(index) {
        if (this.type === 2 || this.activeType === 1) return
        if (this.periods > 1) {
          this.periods--
          this.ruleForm.stagePrice.splice(index, 1)
        }
      },
      /**
       * 提交按钮
       */
      submit() {
        this.isSubmit = true
        this.operate()
      },
      /**
       * 暂存按钮
       */
      save() {
        this.isSubmit = false
        this.operate()
      },
      /**
       * 按钮开关
       */
      operate() {
        this.basic = {}
        this.detail = {}
        this.$emit('save')
      },
      /**
       * 提交处理编辑回来的价格信息
       * @param {object} priceobj 价格对象
       */
      dealEditPrice(priceobj) {
        for(let key in priceobj) {
          if (typeof this[key] !== 'undefined') {
            this[key] = priceobj[key]
          } else if(typeof this.ruleForm[key] !== 'undefined') {
            this.ruleForm[key] = priceobj[key]
            if (key === 'stagePrice') {
              this.periods = this.ruleForm[key].length
            }
          } else {
            if (Object.prototype.toString.call(priceobj[key]) === '[object Array]') {
              [this.ruleForm.pirceRange1, this.ruleForm.pirceRange2] = priceobj[key]
            }
          }
        }
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
              obj.fixedPrice = this.ruleForm.fixedPrice
            } else {
              obj.rangePrice = [this.ruleForm.pirceRange1, this.ruleForm.pirceRange2]
            }
          } else {
            obj.stagePrice = this.ruleForm.stagePrice
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
