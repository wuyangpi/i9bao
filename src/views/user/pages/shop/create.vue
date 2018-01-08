<template>
  <div>
    <div class="wraps">
      <div class="title">创建店铺</div>
      <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item prop="name" label="店铺名称">
                <el-input v-model="ruleForm.name" :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="categoryArray" label="店铺分类">
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
              <el-form-item prop="address" label="店铺地址">
                <el-input v-model="ruleForm.address" :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="property" label="店铺性质">
                <el-select v-model="ruleForm.property" class="selectWidth" placeholder="请选择店铺性质">
                  <el-option v-for="item in propertys"
                             :key="item.value"
                             :label="item.label"
                             :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="headImg" label="店铺头像">
                <upload class="headImg"
                        v-model="ruleForm.headImg"
                        aliCatalog="data/service"
                        controlRight="public-read"
                        :multiple="false"></upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="店铺简介" required>
                <nc-editor :text="ruleForm.description" aliCatalog="data/service" @change="contentChange"></nc-editor>
                <span class="error" v-if="ruleForm.description === '' && isSubmit">请填写详情信息</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="btn-set">
      <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="save">保存</el-button>
      <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  import validForm from '../../common/valid-form'

  export default {
    mixins: [validForm],
    data() {
      return {
        isSubmit: false,
        isDisabled: false,
        ruleForm: {
          name: '',
          categoryId: '',
          categoryArray: [],
          address: '',
          headImg: '',
          property: '',
          description: '',
        },
        props: {
          label: 'name',
          value: 'id',
        },
        options: [],
        propertys: [
          {
            value: '0',
            label: '官方直营'
          }, {
            value: '1',
            label: '旗舰店'
          },
          {
            value: '2',
            label: '连锁店'
          }
        ],
        rules: {
          name : [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          categoryArray : [
            { type: 'array', validator: validForm.validateCate, trigger: 'change' },
          ],
          address: [
            { required: true, message: '请输入店铺地址', trigger: 'blur' },
          ],
          property: [
            { required: true, message: '请选择店铺性质', trigger: 'blur' },
          ],
          headImg: [
            { required: true, message: '请选择图片', trigger: 'change' },
          ],
        },
      }
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
    methods: {
      /**
       * 内容变化
       * @param obj {Object} editor里面的对象
       */
      contentChange(obj) {
        this.ruleForm.description = obj.html
      },
      save() {
        this.isSubmit = true
        this.$refs.ruleForm.validate((valid) => {
          if (valid && this.ruleForm.description) {
            this.ruleForm.categoryId = this.ruleForm.categoryArray[this.ruleForm.categoryArray.length - 1]
            this.http.post('/rest/shop/create', this.ruleForm).then(
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
      cancel() {
        this.$confirm('离开后，已填写的数据将不被保留。确定离开？', '提示', {
          confirmButtonText: '离开',
          cancelButtonText: '留在此页',
        }).then(() => {
          history.go(-1)
        })
      },
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../collector/add-common.styl"
  .selectWidth {
    width 100%
  }
  .error {
    margin-left 10px
    color #ff4949
    font-size 12px
  }
</style>