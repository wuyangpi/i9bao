/**
* 我的发布-基本信息
*/
<template>
  <div class="wraps">
    <div class="title">{{title}}</div>
    <div class="ruleclass">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="title" :label="`${name}标题`">
              <el-input v-model="ruleForm.title" :maxlength="20" placeholder="请输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="categoryArray" :label="`${name}分类`">
              <el-cascader
                expand-trigger="hover"
                :props="props"
                :options="options"
                class="selectWidth"
                v-model="ruleForm.categoryArray">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="email" :label="`${name}邮箱`">
              <el-input v-model="ruleForm.email" :maxlength="20" placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="keysWord" label="标题关键词">
              <el-input v-model="ruleForm.keysWord" :maxlength="20" placeholder="请输入关键词"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <!-- 地区选到省，可多选，可搜索-->
            <el-form-item prop="areacode" :label="`${name}地区`">
              <el-select v-model="ruleForm.areacode"  multiple filterable class="selectWidth" placeholder="请选择地区">
                <el-option v-for="(key, val) in provinces"
                           :key="val"
                           :label="key"
                           :value="key">
                </el-option>
              </el-select>
              <!--<area-select :level='0' type="text" v-model='ruleForm.area' @change="areaChange"></area-select>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="date" :label="`${name}时间`">
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
            <el-form-item prop="announced" label="是否公告" v-if="name === '征集'">
              <el-select v-model="ruleForm.announced" class="selectWidth" placeholder="请选择">
                <el-option
                  v-for="item in announces"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="stock" label="服务库存" v-else>
              <el-input v-model="ruleForm.stock" :maxlength="11"></el-input>
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
        <slot></slot>
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
      name: {
        type: String,
        defalut: '征集',
      },
      title: {
        type: String,
        defalut: '标题',
      },
      edits: {
        type: Object,
        defalut: () => {
          return {}
        },
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
          title: '',
          category: 0,
          categoryArray: [],
          keysJson: '',
          keysWord: '',
          email: '',
          date: '',
          startDt: '',
          endDt: '',
          area: [], // 由areacode转变而来
          areacode: [], // 回显的时候使用key['110000', '120000']格式
          recommend: 1, // '1'为true, '0'为false，默认推荐一天
          announced: 1, // 1代表推荐
          stock: '',
        },
        rules: {
          title : [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          categoryArray : [
            { type: 'array', validator: validForm.validateCate, trigger: 'change' },
          ],
          keysWord : [
            { required: true, message: '请输入关键字', trigger: 'blur' },
          ],
          email: [
            { validator: validForm.validateEmail, trigger: 'blur' },
          ],
          date: [
            { validator: validForm.validateDate, trigger: 'blur' },
          ],
          areacode: [
            { validator: validForm.validateArea, trigger: 'change' },
          ],
          stock: [
            { validator: validForm.validateNum, trigger: 'blur' },
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
        options: [],
        props: {
          label: 'name',
          value: 'id',
        },
      }
    },
    watch: {
      edits(val) {
        if (JSON.stringify(val) !== {}) {
          for(let key in val) {
            this.ruleForm[key] = val[key]
          }
          this.ruleForm.areacode = this.ruleForm.area
          this.ruleForm.keysWord = this.ruleForm.keys[0]
          this.ruleForm.recommend = this.ruleForm.recommend ? 1 : 0
          this.ruleForm.announced = this.ruleForm.announced ? 1 : 0
          this.ruleForm.date = [new Date(val.startDt), new Date(val.endDt)]
          this.ruleForm.categoryArray = this.dealCategory(val.category)
        }
      },
    },
    created() {
      this.http.post('/rest/common/category/listByBelong', { belong: 'demand' }).then(
        (res) => {
          if (res.result === 1) {
            this.options = res.data.categories
          }
        }).catch(err => {
          this.$message.error({ message: err || '出错了' })
        })
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
            this.ruleForm.keysJson = JSON.stringify([this.ruleForm.keysWord])
            this.ruleForm.area = JSON.stringify(this.ruleForm.areacode) // this.codeToText()
            this.ruleForm.startDt = date[0]
            this.ruleForm.endDt = date[1]
            this.ruleForm.category = this.ruleForm.categoryArray[this.ruleForm.categoryArray.length - 1]
            this.onConfirm(this.ruleForm)
          } else {
            this.onConfirm({})
          }
        });
      },
      dealCategory(obj) {
        let arr = [obj.id]
        const level = obj.level
        const pa = obj.parent
        if (pa && pa.level === level - 1) {
          arr.push(pa.id)
          const pap = pa.parent
          if (pap) {
            arr.push(pap.id)
          }
        }
        return arr.reverse()
        // this.loopCate(level, id, this.options)
      },
      loopCate(level, id, arr) {
        for (let i = 0; i < arr.length; i++ ) {
          const idp = arr[i].id
          if (level === 0) {
            if (idp === id) {
              this.ruleForm.categoryArray.push(id)
              break
            } else {
              this.ruleForm.categoryArray.push(idp)
            }
          } else if (level > 0 && arr[i].children) {
            this.loopCate(--level, id, arr[i].children)
          }
        }
        console.log('00000000==' + this.ruleForm.categoryArray)
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
        for (let i =0, l = this.ruleForm.areacode.length; i < l; i++) {
          arr.push(this.provinces[this.ruleForm.areacode[i]])
        }
        return arr
      },
    },
  }
</script>
