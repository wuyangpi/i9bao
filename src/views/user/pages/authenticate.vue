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
      <el-form-item label="身份证（正面）" required>
        <upload v-model="ruleForm.idPic1" :aliCatalog="`data/customer/${userId}/cert`" :isDelete="false" maxSize="2" prompt="请上传JPG,JPEG,PNG,PDF格式的图片，图片大小不超过2M"></upload>
      </el-form-item>
      <el-form-item label="身份证（反面）" required>
        <upload v-model="ruleForm.idPic2" :aliCatalog="`data/customer/${userId}/cert`" :isDelete="false" maxSize="2" prompt="请上传JPG,JPEG,PNG,PDF格式的图片，图片大小不超过2M"></upload>
      </el-form-item>
    </el-form>
    <div class="btn-set">
      <el-button type="primary" class="save-btn" @click="submitForm('ruleForm')">保存</el-button>
      <el-button type="primary" class="cancel-btn" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  export default{
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
        },
      }
    },
    created() {
      this.userId = window.localStorage.getItem('netId')
    },
    methods: {
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
