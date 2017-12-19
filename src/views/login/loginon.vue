<template>
  <div class="wrap">
    <div class="loginon">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" class="ruleclass">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名">
            <template class="grey-back" slot="prepend"><i class="iconfont icon-yonghuming"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" placeholder="请输入密码">
            <template slot="prepend"><i class="iconfont icon-password"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox class="grey-font" v-model="keepPwd">记住密码</el-checkbox>
          <a class="forget-pwd grey-font" href="/login/findpass">忘记密码</a>
        </el-form-item>
        <el-button type="primary" class="save-btn" @click="submitForm('ruleForm')">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script type="text/babel">
  export default{
    data(){
      return{
        ruleForm: {
          username : '',
          pwd: '',
          role: '',
        },
        rules: {
          username : [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        },
        // 是否记住密码
        keepPwd: false,
        links: {
          toFind: '/findpass',
          signup: '/signup',
          editPass: '/editPass'
        },
      }
    },
    methods: {
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.http.post('/rest/customer/login', this.ruleForm).then(
              (res) => {
                if (res.result === 1) {
                  this.$message({
                    message: '登录成功',
                    type: 'success',
                    onClose: () => {
                      this.$router.push( { path: '/home' })
                    }
                  })
                } else {
                  this.$message({
                    message: res.message || '登录失败！',
                    type: 'error'
                  })
                }
              })
          }
          return false;
        })
      }
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrap {
    width 100%
    height 500px
    background #f6c4e7
    position relative
  }
  .loginon {
    padding 30px
    border:1px solid #c8c7cd
    background #fef5fa
    position absolute
    top 50%
    right 20%
    margin-top -150px
    .ruleclass {
      width: 250px
      margin-top 10px
    }
    .save-btn {
      width 100%
    }
  }
  .forget-pwd {
    float right
  }
</style>
