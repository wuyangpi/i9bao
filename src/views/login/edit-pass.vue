<template>
  <div>
    <div class="wrap">
      <div class="edit-pass">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" class="ruleclass">
          <el-form-item prop="passOld">
            <el-input v-model="ruleForm.passOld" type="password" placeholder="请输入密码">
              <template class="grey-back" slot="prepend">原密码</template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="pwd1">
            <el-input type="password" v-model="ruleForm.pwd1" placeholder="请输入密码">
              <template slot="prepend">新密码</template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="pwd2">
            <el-input type="password" v-model="ruleForm.pwd2" placeholder="请输入密码">
              <template slot="prepend">确认密码</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="telcode" class="vertical">
            <el-input class="vertical-input" v-model="ruleForm.telcode" placeholder="请输入验证码">
              <template slot="prepend">验证码</template>
            </el-input>
            <div class="vertical-btn" :class="{ 'vertical-btn-active' :hadVertical }" @click="getVerticalCode">{{verticalText}}</div>
          </el-form-item>
          <el-button type="primary" class="save-btn" @click="submitForm('ruleForm')">确定</el-button>
          <el-button type="primary" class="cancel-btn" @click="cancel">取消</el-button>
        </el-form>
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
          passOld : '',
          pwd1: '',
          pwd2: '',
          telcode: '',
        },
        rules: {
          passOld : [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          pwd1: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          pwd2: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          telcode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        },
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
      },
      cancel() {
        history.back()
      },
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .save-btn {
    width 48%
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

