<template>
  <div>
    <div class="wrap">
      <div class="signup">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" class="ruleclass">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名" :maxlength="20">
              <template class="grey-back" slot="prepend">用户名</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input type="password" v-model="ruleForm.pwd" placeholder="请输入密码" :maxlength="20">
              <template slot="prepend">设置密码</template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="pwdAagin">
            <el-input type="password" v-model="ruleForm.pwdAagin" placeholder="请再一次输入密码" :maxlength="20">
              <template slot="prepend">确认密码</template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号码">
              <template slot="prepend">手机号码</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="sms" class="vertical">
            <el-input class="vertical-input" v-model="ruleForm.sms" placeholder="请输入验证码">
              <template slot="prepend">验证码</template>
            </el-input>
            <div class="vertical-btn" :class="{ 'vertical-btn-active' :hadVertical }" @click="getVerticalCode">{{verticalText}}</div>
          </el-form-item>
          <el-form-item>
            <el-checkbox class="grey-font" v-model="ruleForm.protocol">阅读并同意《用户注册协议》</el-checkbox>
          </el-form-item>
          <el-button type="primary" class="save-btn" @click="submitForm('ruleForm')">立即注册</el-button>
        </el-form>
      </div>
      <div class="image">
        <img :src="advertise">
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import validates from './validate'

  export default{
    mixins: [validates],
    data() {
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
        ruleForm: {
          username : '',
          pwd: '',
          pwdAagin: '',
          phone: '',
          sms: '',
          protocol: false,
        },
        rules: {
          username : [
            { validator: validates.validateName, trigger: 'blur' },
          ],
          pwd: [
            { validator: validates.validatePwd, trigger: 'blur' },
          ],
          pwdAagin: [
            { validator: validatePwdagain, trigger: 'blur' },
          ],
          phone: [
            { validator: validates.validatePhone, trigger: 'blur' },
          ],
          sms: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        },
        advertise: require('../../assets/images/home/signup.png'),
        verticalText: '获取验证码',
        hadVertical: false, // 是否已经获取验证码，60到期重新获取
        reduceSec: 60,
      }
    },
    methods: {
      // 获得验证码
      getVerticalCode() {
        const _this = this
        let text = ''
        this.$refs.ruleForm.validateField('phone', (err) => {
          text = err
        })
        if (text === '') {
          this.http.post('/rest/common/sms', { phone: this.ruleForm.phone }).then((res) => {
            if (res.result === 1) {
              this.$message({
                message: '发送成功！',
                type: 'success'
              })
            } else {
              this.$message({
                message: res.message || '发送失败！',
                type: 'error'
              })
            }
          })
          if (!this.hadVertical) {
            _this.hadVertical = true
            this.verticalText = this.reduceSec + '秒'
            let time = setInterval(function () {
              _this.reduceSec--
              _this.verticalText = _this.reduceSec + '秒'
              if (_this.reduceSec <= 0) {
                _this.hadVertical = false
                _this.reduceSec = 60
                _this.verticalText = '获取验证码'
                clearInterval(time)
              }
            }, 1000)
          }
        }
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.ruleForm.protocol) {
              this.$message({
                message: '请同意协议',
                type: 'warning',
              })
              return
            }
            this.http.post('/rest/customer/reg', this.ruleForm).then(
              (res) => {
                if (res.result === 1) {
                  this.$message({
                    message: '注册成功',
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
        })
      }
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrap {
    display: -webkit-flex
    display: flex
    flex-flow:row nowrap
    justify-content: space-around
    align-items center
    .signup {
      flex 1
      margin 20px
      overflow hidden
      .ruleclass {
        width 320px
        float right
        margin-right 18%
      }
    }
    .image {
      flex 1
      margin 20px
      img {
        width 80%
        height 500px
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
  }
</style>
