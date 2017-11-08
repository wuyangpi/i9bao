/**
* 我的发布-基本信息
*/
<template>
  <div class="wrap">
    <div class="title">{{title}}</div>
    <div class="ruleclass">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="number" label="征集编号">
              <el-input v-model="ruleForm.number " :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="title" label="征集标题">
              <el-input v-model="ruleForm.title" :maxlength="20" placeholder="请输入标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="category" label="征集分类">
              <el-cascader
                expand-trigger="hover"
                :options="categorys"
                class="selectWidth"
                v-model="ruleForm.category">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="keysJson" label="标题关键词">
              <el-input v-model="ruleForm.keysJson" :maxlength="20" placeholder="请输入昵称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="email" label="征集邮箱">
              <el-input v-model="ruleForm.email " :maxlength="20" placeholder="请输入昵称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="date" label="征集时间">
              <el-date-picker type="daterange"
                              placeholder="开始日期-结束日期"
                              v-model="ruleForm.date"
                              :picker-options="pickerOptions"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <!-- 地区选到省，可多选，可搜索-->
            <el-form-item prop="area" label="征集地区">
              <el-select v-model="ruleForm.area"  multiple filterable class="selectWidth" placeholder="请选择">
                <el-option v-for="(key, val) in provinces"
                           :key="key"
                           :label="key"
                           :value="val">
                </el-option>
              </el-select>
              <!--<area-select :level='0' type="text" v-model='ruleForm.area' @change="areaChange"></area-select>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="recommend" label="是否推荐">
              <el-select v-model="ruleForm.recommend" class="selectWidth" placeholder="请选择">
                <el-option
                  v-for="item in recommends"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="announced" label="是否公告">
              <el-select v-model="ruleForm.announced" class="selectWidth" placeholder="请选择">
                <el-option
                  v-for="item in announces"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "add-common.styl"
</style>
<script>
  import validForm from '../../common/valid-form'
  import AreaData from 'area-data'
  export default {
    mixins: [validForm],
    props: {
      title: {
        type: String,
        defalut: '标题',
      },
      onConfirm: {
        type: Function,
        defalut: () => {
        }
      }
    },
    data() {
      return {
        ruleForm: {
          number: '201709122344',
          title: '',
          category: ["zhinan", "shejiyuanze", "yizhi"],
          keysJson: '',
          email: '',
          date: '',
          startDt: '',
          endDt: '',
          area: [], // 回显的时候使用key['110000', '120000']格式
          recommend: 1, // '1'为true, '0'为false，默认推荐一天
          announced: 1, // 1代表推荐
        },
        rules: {
          title : [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          category : [
            { validator: validForm.validateCate, trigger: 'change' },
          ],
          keysJson : [
            { required: true, message: '请输入关键字', trigger: 'blur' },
          ],
          email: [
            { validator: validForm.validateEmail, trigger: 'blur' },
          ],
          date: [
            { validator: validForm.validateDate, trigger: 'blur' },
          ],
          area : [
            { validator: validForm.validateArea, trigger: 'change' },
          ],
        },
        provinces: AreaData['86'], // 所有的省，直辖市
        recommends: [
          { label: '推荐', value: 1 },
          { label: '不推荐', value: 0 },
        ],
        announces: [
          { label: '是', value: 1 },
          { label: '否', value: 0 },
        ],
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
        categorys: [{ // 征集分类假数据
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }],
      }
    },
    mounted() {
      this.$parent.$on('save', this.submitForm)
    },
    methods: {
      /**
       * 提交表单
       */
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const date = this.dealDate(this.ruleForm.date)
            this.ruleForm.area = this.codeToText()
            this.ruleForm.startDt = date[0]
            this.ruleForm.endDt = date[1]
            this.onConfirm(this.ruleForm)
          }
          return false;
        });
      },
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
            console.log(text)
            arr.push(text)
          })
        }
        return arr
      },
      /**
       * 处理地区，将已有的ruleForm.area[code]转换为文字 string
       * @return {Array} 返回的是中文地区名
       */
      codeToText() {
        let arr = []
        for (let i =0, l = this.ruleForm.area.length; i < l; i++) {
          arr.push(this.provinces[this.ruleForm.area[i]])
        }
        return arr
      },
    },
  }
</script>
