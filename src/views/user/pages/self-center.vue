/**
* 个人中心页
*/

<template>
  <div>
    <div class="center-container">
      <div class="title">个人资料</div>
      <upload class="headImg" v-model="ruleForm.image" :aliCatalog="`data/customer/${userId}/img`" controlRight="public-read" :isUpload="false" :multiple="false"></upload>
      <div class="self-materies">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleclass">
          <!--<el-form-item label="个人ID">-->
            <!--{{ruleForm.id}}-->
          <!--</el-form-item>-->
          <el-form-item label="用户名">
            {{ruleForm.username}}
          </el-form-item>
          <el-form-item label="手机号码">
            {{ruleForm.phone}}
          </el-form-item>
          <el-form-item prop="nickname" label="昵称" required>
            <el-input v-model="ruleForm.nickname" :maxlength="20" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item prop="gender" label="性别">
            <el-radio-group v-model="ruleForm.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item  prop="email" label="邮箱" required>
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="area" class="area">
            <area-select :level='3' type="text" v-model='ruleForm.area'></area-select>
          </el-form-item>
          <el-form-item  prop="address" label="" class="address">
            <el-input v-model="ruleForm.address" placeholder="XX街道XX小区XX幢XX号"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="btn-set">
      <el-button type="primary" class="save-btn" @click="submitForm('ruleForm')">保存</el-button>
      <el-button type="primary" class="cancel-btn" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      const validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'))
        } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
          callback(new Error('请输入正确的邮箱格式'))
        } else {
          callback()
        }
      }
      return {
        headImgShow: false,
        userId: window.localStorage.getItem('netId'),
        ruleForm: {
          image: '', // 头像
          id: 1,
          username: 'haha',
          nickname: '',
          phone: '18867116861',
          email: '',
          gender: 1, // 1代表male，2代表female,0未选择
          birthday: '', // yyyy-mm-dd
          area: [], // 地区
          address: '', // 具体地址
        },
        rules: {
          nickname : [
            { required: true, message: '请输入昵称', trigger: 'blur' },
          ],
          email: [
            { validator: validateEmail, trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      headImgTip() {
        this.headImgShow = !this.headImgShow
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.http.post('/rest/customer/updateInfo', this.ruleForm).then(
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
  .center-container {
    .area {
      margin-bottom 10px
      .area-select  {
        margin-left -10px
      }
      .el-form-item__content {
        width: 100%;
        margin-left -10px
      }
    }
    .address .el-form-item__content {
      width: 77%;
    }
    .el-form-item__content {
      width 300px
    }
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
 .center-container {
   width 850px
   border 1px solid #ccc
   margin 5px 0 20px 0
   padding-bottom 20px
   .title {
     width 100%
     height 30px
     line-height 30px
     background #f9f9f9
     border-bottom 1px solid #ccc
     padding-left 20px
   }
   .headImg {
     margin 20px 0 20px 50px
   }
   .address {
     margin-left 10px
   }
 }
</style>
