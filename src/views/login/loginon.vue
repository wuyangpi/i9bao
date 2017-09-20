<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="loginon">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="role">
        <el-radio-group v-model="ruleForm.role">
          <el-radio label="1" name="role">我是征集商</el-radio>
          <el-radio label="2" name="role">我是服务商</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="keepPwd">记住密码</el-checkbox>
        <router-link :to="links.toFind" class="forget-pwd">
          <el-button type="text">忘记密码</el-button>
        </router-link>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="save-btn" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
    <router-link :to="links.toFind">
      <el-button>找回密码</el-button>
    </router-link>
    <router-link :to="links.signup">
      <el-button>注册</el-button>
    </router-link>
    <router-link :to="links.editPass">
      <el-button>修改密码</el-button>
    </router-link>
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
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .loginon {
    width: 350px
  }
  .forget-pwd {
    float right
  }
  .save-btn {
    width 250px
  }
</style>
