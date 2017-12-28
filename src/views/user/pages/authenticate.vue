/**
* 身份认证模块
*/
<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="ruleclass">
      <el-form-item prop="name" label="姓名" required>
        <el-input v-model="ruleForm.name" :maxlength="10"></el-input>
      </el-form-item>
      <el-form-item  prop="idCard" label="法人身份证号码" required>
        <el-input v-model="ruleForm.idCard" :maxlength="18"></el-input>
      </el-form-item>
      <el-form-item label="身份证（正面）"  prop="idPic1" required>
        <upload v-model="ruleForm.idPic1"
                :aliCatalog="`data/customer/${userId}/cert`"
                :ossClient="ossclient"
                v-if="ossclient"
                :isDelete="false"
                maxSize="2"
                prompt="请上传JPG,JPEG,PNG,PDF格式的图片，图片大小不超过2M"></upload>
      </el-form-item>
      <el-form-item label="身份证（反面）" prop="idPic2"  required>
        <upload v-model="ruleForm.idPic2"
                :aliCatalog="`data/customer/${userId}/cert`"
                :isDelete="false"
                v-if="ossclient"
                :ossClient="ossclient"
                maxSize="2"
                prompt="请上传JPG,JPEG,PNG,PDF格式的图片，图片大小不超过2M"></upload>
      </el-form-item>
    </el-form>
    <div class="btn-set">
      <el-button type="primary" class="save-btn" @click="submitForm('ruleForm')">保存</el-button>
      <el-button type="primary" class="cancel-btn" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  import upload from 'src/assets/js/upload'

  export default{
    mixins: [upload],
    data() {
      const validateIdNum = (rule, value, callback) => {
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (value === '') {
          callback(new Error('请输入身份证号码'))
        } else if (!reg.test(value)) {
          callback(new Error('请输入正确的身份证号格式'))
        } else {
          callback()
        }
      }
      return {
        userId: 0,
        ossclient: null,
        ruleForm: {
          idPic1: '', // 身份证正面
          idPic2: '', // 身份证反面
          name: '', // 姓名
          idCard: '', // 身份证号码
        },
        rules: {
          name : [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          idCard: [
            { validator: validateIdNum, trigger: 'blur' },
          ],
          idPic1: [
            { required: true, message: '请上传图片', trigger: 'change' },
          ],
          idPic2: [
            { required: true, message: '请上传图片', trigger: 'change' },
          ],
        },
      }
    },
    created() {
      this.userId = window.localStorage.getItem('netId')
      this.requestQueue()
    },
    methods: {
      /**
       * 页面初始化所有的请求接口
       */
      async requestQueue() {
        await this.getEditData()
        await this.requestclient()
      },
      // 获取阿里云new oss接口
      async requestclient() {
        const param = `data/customer/${this.userId}/cert`
        await this.getClient(param, 'ossclient')
      },
      getEditData() {
        this.http.post('/rest/customer/info').then(
          (res) => {
            if (res.result === 1) {
              const data = res.data.customer.cert.extend
              this.ruleForm = {
                idPic1: data.idPic1,
                idPic2: data.idPic2,
                name: data.name,
                idCard: data.idCard, // 身份证号码
              }
            }
          }).catch(err => {
            this.$message.error({ message: err || '出错了' })
          })
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid && this.ruleForm.idPic1 && this.ruleForm.idPic2) {
            this.http.post('/rest/customer/cert/person', this.ruleForm).then(
              (res) => {
                if (res.result === 1) {
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                  })
                }
              }).catch(err => {
                this.$message.error({ message: err || '出错了' })
            })
          }
          return false;
        });
      },
      cancel() {
        history.back()
      },
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .ruleclass {
    margin 50px 0
    margin-left 20%
    .el-input {
      width 300px
    }
  }
</style>
