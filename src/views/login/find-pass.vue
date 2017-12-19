<template>
  <div>
    <div class="wrap">
      <div class="edit-pass">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" class="ruleclass">
          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号码">
              <template class="grey-back" slot="prepend">手机号码</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="sms" class="vertical">
            <el-input class="vertical-input" v-model="ruleForm.sms" placeholder="请输入验证码">
              <template slot="prepend">验证码</template>
            </el-input>
            <div class="vertical-btn" :class="{ 'vertical-btn-active' :hadVertical }" @click="getVerticalCode">{{verticalText}}</div>
          </el-form-item>
          <el-form-item  prop="pwd">
            <el-input type="password" v-model="ruleForm.pwd" placeholder="请输入密码">
              <template slot="prepend">新密码</template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="newtoPwd">
            <el-input type="password" v-model="ruleForm.newtoPwd" placeholder="请输入密码">
              <template slot="prepend">确认密码</template>
            </el-input>
          </el-form-item>
          <el-button type="primary" class="save-btn" @click="submitForm('ruleForm')">确定</el-button>
          <el-button type="primary" class="cancel-btn" @click="cancel">取消</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import validates from './validate'
  import mixinCommon from './common'

  export default {
    mixins: [mixinCommon],
    data(){
      const validatePwdagain = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value !== this.ruleForm.pwd) {
          callback(new Error('请和设置密码保持一致'))
        } else {
          callback()
        }
      }
      return{
        mixins: [validates],
        ruleForm: {
          phone : '',
          pwd: '',
          newtoPwd: '',
          sms: '',
        },
        rules: {
          phone: [
            { validator: validates.validatePhone, trigger: 'blur' },
          ],
          pwd: [
            { validator: validates.validatePwd, trigger: 'blur' },
          ],
          newtoPwd: [
            { validator: validatePwdagain, trigger: 'blur' },
          ],
          sms: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.http.post('/rest/customer/forgetPwd', this.ruleForm).then(
              (res) => {
                if (res.result === 1) {
                  this.$message({
                    message: res.message || '找回成功！',
                    type: 'success',
                    onClose: () => {
                      this.$router.push( { path: '/login' })
                    }
                  })
                } else {
                  this.$message({
                    message: res.message || '出错了',
                    type: 'error'
                  })
                }
              })
          }
          return false
        });
      },
      cancel() {
        history.back()
      },
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cancel-btn {
    width 47%
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrap {
    width 100%
    height 500px
    background #f6c4e7
    position relative
  }
  .edit-pass {
    padding 30px
    border:1px solid #c8c7cd
    background #fef5fa
    position absolute
    top 50%
    right 20%
    margin-top -150px
    .ruleclass {
      width: 300px
      margin-top 10px
    }
    .save-btn {
      width 48%
    }
  }
  .vertical {
    .el-form-item__content {
      position relative
    }
    .vertical-input {
      width 225px
    }
    .vertical-btn {
      position absolute
      top 0
      right 0
      width 100px
      text-align center
      background #fe6e1b
      color #fff
      cursor pointer
    }
    .vertical-btn-active {
      color #fff
      background #ddd
    }
  }
</style>

