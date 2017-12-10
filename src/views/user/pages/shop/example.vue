<!-- 设置店铺经典案例 -->
<template>
  <div>
    <h3>新增案例</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
    <div class="wraps">
      <div class="title">基本信息</div>
      <div class="ruleclass">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="category" label="案例分类">
              <el-cascader
                expand-trigger="hover"
                :options="categoryList"
                class="selectWidth"
                v-model="ruleForm.category">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="fee" label="设计费用">
              <el-input v-model="ruleForm.fee" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="title" label="案例标题">
              <el-input v-model="ruleForm.title " :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="labels" label="案例标签">
              <el-input v-model="ruleForm.labels" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="name" label="客户姓名`">
              <el-input v-model="ruleForm.name " :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="date" label="完成日前">
              <el-date-picker type="daterange"
                              placeholder="开始日期-结束日期"
                              v-model="ruleForm.date"
                              :picker-options="pickerOptions"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </div>
    <detail labelImg="案例主图"
            labelDesc="案例内容"
            title="详细信息"
            :onConfirm="submitDetail">
      <el-form-item label="设计方案" prop="description" slot="desc">
        <el-input type="textarea" :maxlength="200" placeholder="请输入设计描述，不超过200字" v-model="ruleForm.description"></el-input>
      </el-form-item>
    </detail>
    <el-form-item label="" prop="promiseflag">
      <el-checkbox label="我承诺以上图文信息不涉及侵权，如若侵权，发生知识产权纠纷，与网络征集网无关。" v-model="ruleForm.promiseflag"></el-checkbox>
    </el-form-item>
    </el-form>
    <div class="btn-set">
      <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="save">暂存</el-button>
      <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../collector/add-common.styl"
  .wraps {
    min-height 250px
    .title {
      margin-bottom 10px
    }
    .ruleclass {
      top 50px
      left 10px
    }
  }
</style>
<script>
  // description和promisflag 不能同时校验，detail组件的事件监听优化
  import categoryList from './category'
  import validForm from '../../common/valid-form'
  import detail from '../collector/detail.vue'

  export default {
    components: {
      detail,
    },
    data() {
      return {
        // 已有分类
        categoryList: categoryList,
        isDisabled: false, // 按钮控制
        isSubmit: false,
        detail: {},
        promise: false,
        ruleForm: {
          fee: '11',
          title: '',
          category: ["zhinan", "shejiyuanze", "yizhi"],
          labels: '',
          name: '',
          date: '',
          startDt: '',
          endDt: '',
          description: '', //描述
          promiseflag: false,
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
          category: [
            { validator: validForm.validateCate, trigger: 'change' },
          ],
          labels: [
            { required: true, message: '请输入标签', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          date: [
            { validator: validForm.validateDate, trigger: 'blur' },
          ],
          fee: [
            { validator: validForm.validatefee, trigger: 'blur' },
          ],
          description: [
            { required: true, message: '请填写描述信息', trigger: 'blur' },
          ],
          promiseflag: [
            { required: true, message: '请同意承诺', trigger: 'change' },
          ],
        },
        pickerOptions: { // 有效期-固定日期的选择范围
          /**
           * 限制今天过去的时间不能选，置灰
           * @param {date} time 标准时间
           * @return {boolean} 返回的ture则置灰
           */
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          },
        },
      }
    },
    methods: {
      /**
       * 处理饿了么时间，格式为yyyy-MM-dd
       * @param {Array} date 饿了么时间[new Date, new date]
       */
      dealDate(date) {
        let arr = []
        if (Array.isArray(date) && date.length ===2) {
          date.forEach(l => {
            const date = new Date(l)
            let text = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
            arr.push(text)
          })
        }
        return arr
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
        this.detail = {}
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const date = this.dealDate(this.ruleForm.date)
            this.ruleForm.startDt = date[0]
            this.ruleForm.endDt = date[1]
            this.onConfirm(this.ruleForm)
          }
          return false;
        });
        this.$emit('save')
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
          this.isDisabled = true
          this.priceJson = this.dealPrice()
          const price = { priceJson: this.priceJson, needLogistics: this.needLogistics, isSubmit: this.isSubmit }
          const params = Object.assign({}, this.basic, price, this.deatil)
//          this.isDisabled = false 请求成功后false掉
          // /rest/demand/publish post 请求
        }
      },
    },
  }
</script>
