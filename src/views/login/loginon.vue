<template>
  <div class="wrap">
    <div class="loginon">
      <ul>
        <li v-for="(item, index) in tabList" :key="item.value"
            @click="() => { activeName = item.value}"
            :class="{ 'choosed': item.value === activeName }">{{item.label}}</li>
      </ul>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" class="ruleclass">
        <div v-if="activeName === '0'">
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
        </div>
        <div v-if="activeName === '1'">
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
        </div>
      </el-form>
      <el-button type="primary" class="save-btn" @click="submitForm('ruleForm')">登录</el-button>
    </div>
  </div>
</template>
<script type="text/babel">
  import validates from './validate'
  import mixinCommon from './common'

  export default {
    mixins: [mixinCommon],
    data(){
      return{
        activeName: '0',
        tabList: [
          { label: '用户名登录', value: '0' },
          { label: '手机号登录', value: '1' },
        ],
        ruleForm: {
          username : '',
          pwd: '',
          role: '',
          phone: '',
          sms: '',
        },
        rules: {
          username : [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          phone: [
            { validator: validates.validatePhone, trigger: 'blur' },
          ],
          sms: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
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
        const url = this.activeName === '0' ? '/rest/customer/login' : '/rest/customer/loginByPhone'
        this.$refs[formName].validate((valid) => {
          // 登录记住密码，cookie不安全,cookie的生命周期
          if (valid) {
            if (this.keepPwd) {
              this.setCookie(this.ruleForm.username, this.ruleForm.pwd, 30)
            } else {
              this.delCookie(this.ruleForm.username)
            }
            this.http.post(url, this.ruleForm).then(
              (res) => {
                if (res.result === 1) {
                  window.localStorage.setItem('netId', res.data.customer.id)
                  this.$message({
                    message: '登录成功',
                    type: 'success',
                    onClose: () => {
                     //  history.go(-1)
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
      },
      // 设置cookie
      setCookie(key, val, expire) {
        let exp = ''
        if (expire) {
          const exdate = new Date()
          exdate.setTime(exdate.getTime() + expire*24*60*60*1000)
          exp = `;expires=${exdate.toGMTString()}`
        }
        document.cookie = `${key}=${encodeURIComponent(val)}${exp} `
        console.log(document.cookie)
      },
      // 获取cookie
      getCookie(name) {
        const cookies = document.cookie
        if (cookies.length > 0) {
          const arrCookie = cookies.split(';')
          for (let i = 0; i < arrCookie.length; i++) {
            const val = arrCookie[i].trim()
            const index = val.indexOf(`${name}=`)
            if (index == 0) {
              return val.substring(index, val.length)
            }
          }
        }
        return ''
      },
      // 删除cookie
      delCookie(name) {
        const exp = new Date()
        exp.setTime(exp.getTime() -1)
        const value = this.getCookie(name)
        if (value !== '') {
          document.cookie = `${name}=${value};expires=${exp.toGMTString()}`
        }
      },
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
    border:1px solid #c8c7cd
    border-top 0
    background #fef5fa
    position absolute
    height 300px
    top 50%
    right 20%
    margin-top -150px
    ul {
      width 100%
      background #fefefe
      border-bottom 1px solid #ff6e1b
      cursor pointer
      li {
        &:first-child {
          border-right 1px solid #ccc
        }
        width 49.8%
        display inline-block
        height 40px
        line-height 40px
        text-align center
        color #ff6e1b
      }
      .choosed {
        color #fff
        background-color #ff6e1b
      }
    }
    .ruleclass {
      padding 30px
      width: 300px
    }
    .save-btn {
      margin-left 18px
      width 90%
      position absolute
      bottom 20px
    }
  }
  .forget-pwd {
    float right
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
