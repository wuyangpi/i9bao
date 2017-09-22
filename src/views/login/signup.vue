<template>
  <div>
    <div class="wrap">
      <div class="signup">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" class="ruleclass">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名">
              <template class="grey-back" slot="prepend">用户名</template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="pwd1">
            <el-input type="password" v-model="ruleForm.pwd" placeholder="请输入密码">
              <template slot="prepend">设置密码</template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="pwd2">
            <el-input type="password" v-model="ruleForm.pwd" placeholder="请输入密码">
              <template slot="prepend">确认密码</template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="telphone">
            <el-input v-model="ruleForm.telphone" placeholder="请输入手机号码">
              <template slot="prepend">手机号码</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="telcode" class="vertical">
            <el-input class="vertical-input" v-model="ruleForm.telcode" placeholder="请输入验证码">
              <template slot="prepend">验证码</template>
            </el-input>
            <div class="vertical-btn" :class="{ 'vertical-btn-active' :hadVertical }" @click="getVerticalCode">{{verticalText}}</div>
          </el-form-item>
          <el-form-item v-model="ruleForm.protocol">
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
  import ElCheckbox from '../../../node_modules/element-ui/packages/checkbox/src/checkbox'
  export default{
    components: {ElCheckbox},
    data(){
      return{
        ruleForm: {
          username : '',
          pwd1: '',
          pwd2: '',
          telphone: '',
          telcode: '',
          protocol: false,
        },
        rules: {
          username : [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          pwd1: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          pwd2: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          telphone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
          ],
          telcode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        },
        advertise: require('../../assets/images/signup.png'),
        verticalText: '获取验证码',
        hadVertical: false, // 是否已经获取验证码，60到期重新获取
        reduceSec: 60,
      }
    },
    methods: {
      // 获得验证码
      getVerticalCode() {
        const _this = this
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
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .el-input-group__prepend {
    color #fff
    background #ddd
  }
  .grey-font {
    color #aea8ac
  }
  .save-btn {
    width 100%
    background #fe6e1b
    border-color #fe6e1b
    &:hover, &:active,&:visited,&:focus {
      background #fe6e1b
      border-color #fe6e1b
    }
  }
</style>
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
