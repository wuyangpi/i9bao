<template>
  <div class="collector-add">
    <h3>新增服务</h3>
    <baseInfo class="serviceWrap" :onConfirm="submitBasic" :edits="editObject" name="服务" title="基本信息">
      <template>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
          <el-row>
            <el-col :span="20">
              <div class="collect-price marb20">
                <div class="prc-title marl20">服务报价：</div>
                <multiRadio v-model="type" :radioArray="radioList1">
                  <multiRadio slot="radio0" v-model="rangeType" :is-disabled="type === 2" :radioArray="radio2List">
                    <div slot="radio0" class="line-block font12">
                      <el-form-item prop="fixedPrice" class="line-block">
                        <el-input class="small-input" :disabled="type === 2 || rangeType === 2" v-model="ruleForm.fixedPrice"></el-input>
                      </el-form-item>
                     <span>元</span>
                    </div>
                    <div class="line-block font12" slot="radio1">
                      <el-form-item class="line-block" prop="pirceRange1">
                        <el-input class="small-input" :disabled="type === 2 || rangeType === 1" v-model="ruleForm.pirceRange1"></el-input>
                      </el-form-item>
                      <!--<el-input class="line-block small-input" :disabled="type === 2 || rangeType === 1" v-model="pirceRange1"></el-input>-->
                      <span>至</span>
                      <el-form-item class="line-block" prop="pirceRange2">
                        <el-input class="small-input" :disabled="type === 2 || rangeType === 1" v-model="ruleForm.pirceRange2"></el-input>
                      </el-form-item>
                      <!--<el-input class="line-block small-input" :disabled="type === 2 || rangeType === 1" v-model="pirceRange2"></el-input>-->
                      <span>元</span>
                    </div>
                  </multiRadio>
                </multiRadio>
              </div>
            </el-col>
            <el-col :span="4"></el-col>
          </el-row>
        </el-form>
      </template>
    </baseInfo>
    <!-- 详细信息-->
    <detail title="详细信息"
            labelImg="商品主图"
            labelDesc="服务详情"
            :edits="editObject"
            :onConfirm="submitDetail"></detail>
    <div class="btn-set">
      <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="save">暂存</el-button>
      <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../collector/add-common.styl"
  .collector-add {
    margin-top 20px
    .serviceWrap {
      min-height 600px
    }
    .collect-price {
      display flex
      flex-flow row nowrap
      align-items center
      margin-left 10px
      .prc-title {
        width 70px
      }
      .line-block {
        flex 1
      }
    }
  }
  .rel {
    position relative
    .error {
      position absolute
      left 10px
      bottom -20px
      color #ff4949
      font-size 12px
    }
  }
</style>
<script>
  import baseInfo from '../collector/basic.vue'
  import multiRadio from '../../components/multi-radio.vue'
  import detail from '../collector/detail.vue'
  export default{
    components: {
      baseInfo,
      multiRadio,
      detail
    },
    data() {
      const validatorFixPrice = (rule, value, callback) => {
        if (this.rangeType === 1 && this.type === 1) {
          if (value === '') {
            callback(new Error('请输入金额'))
          } else if (!/^\d+$/.test(value)) {
            callback(new Error('金额只能输入数字'))
          }
        }
        callback()
      }
      const validatorPrice = (rule, value, callback) => {
        if (this.rangeType === 2 && this.type === 1) {
          if (value === '') {
            callback(new Error('请输入金额'))
          } else if (!/^\d+$/.test(value)) {
            callback(new Error('金额只能输入数字'))
          }
        }
        callback()
      }
      return {
        basic: {},
        detail: {},
        editObject: {},
        type: 1, // 1 指定价格
        rangeType: 1, // 1 代表固定价格
        ruleForm: {
          fixedPrice: '',
          pirceRange1: '',
          pirceRange2: '',
        },
        radioList1: [
          { label: 1, value: '指定价格' },
          { label: 2, value: '商家报价' },
        ],
        radio2List: [
          { label: 1, value: '具体价格' },
          { label: 2, value: '区间价格' },
        ],
        isSubmit: false, // false 代表暂存，true代表提交
        isDisabled: false, // false代表可以操作
        valid: false, // 是否通过验证
        submitUrl: '/rest/service/publish',
        rules: {
          fixedPrice: [
            { validator: validatorFixPrice, trigger: 'blur' },
          ],
          pirceRange1: [
            { validator: validatorPrice, trigger: 'blur', },
          ],
          pirceRange2: [
            { validator: validatorPrice, trigger: 'blur', },
          ],
        },
      }
    },
    methods: {
      validateNum(value){
        let error = ''
        if (value === '') {
          error = '请输入金额'
        } else if (/^\d+$/.test(value)) {
          error = '金额只能输入数字'
        }
        this.rule.fixedPrice = error
      },
      /**
       * 提交基本信息
       * @param {Object} data 基本信息
       */
      submitBasic(data) {
        this.basic = data
        // this.confirm()
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
        if (flag && this.valid) {
          this.isDisabled = true
          this.priceJson = this.dealPrice()
          const price = { priceJson: JSON.stringify(this.priceJson), isSubmit: this.isSubmit }
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
              this.$message.success({
                message: res.message || '提交成功',
                onClose: () => {
                  history.go(-1)
                }
              })
            }).catch( err => {
            this.isDisabled = false
            this.$message.error({ message: err || '提交失败' })
          })
        } else {
          this.$message.error({ message: '请填写完整信息！' })
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
        this.$refs.ruleForm.validate((valid) => {
          this.valid = valid
        })
        this.$emit('save')
      },
      /**
       * 提交处理价格信息
       * price jsonb default '{}'::jsonb,
       * -- 价格：type:1-指定价格/2-商家报价，
       * activeType:1-一次性/2-分期，
       * rangeType:1-固定/2-范围，
       * fixedPrice:5000.0, rangePrice:[1000.0,5000.0],
       */
      dealPrice() {
        let obj = {}
        obj.type = this.type
        if (this.type === 1) {
          obj.rangeType = this.rangeType
          if (this.rangeType === 1) {
            obj.fixedPrice = this.ruleForm.fixedPrice
          } else {
            obj.rangePrice = [this.ruleForm.pirceRange1, this.ruleForm.pirceRange2]
          }
        }
        return obj
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
          } else {
            if (Object.prototype.toString.call(priceobj[key]) === '[object Array]') {
              [this.ruleForm.pirceRange1, this.ruleForm.pirceRange2] = priceobj[key]
            }
          }
        }
      },
    },
    created() {
      const id = this.$route.query.id
      if (id) {
        this.http.post('/rest/service/detail', { id }).then(
          (res) => {
            this.editObject = res.data.service
            this.dealEditPrice(this.editObject.price)
          }).catch(err => {
          this.$message.error({ message: err || '出错了' })
        })
        this.submitUrl = '/rest/demand/edit'
      }
    },
    watch: {
      type(val) {
        if (val === 2) {
          this.$refs.ruleForm.validateField('fixedPrice')
          this.$refs.ruleForm.validateField('pirceRange1')
          this.$refs.ruleForm.validateField('pirceRange2')
        }
      },
      rangeType(val) {
        if (val === 2) {
          this.$refs.ruleForm.validateField('fixedPrice')
        } else {
          this.$refs.ruleForm.validateField('pirceRange1')
          this.$refs.ruleForm.validateField('pirceRange2')
        }
      },
    },
  }
</script>
