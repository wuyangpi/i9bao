<template>
  <div class="center-container">
    <div class="title">个人资料</div>
    <div class="headImg" @mouseover="headImgTip" @mouseout="headImgTip">
      <div v-show="headImgShow">请上传头像</div>
    </div>
    <div class="self-materies">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleclass">
        <el-form-item label="个人ID">
          {{ruleForm.id}}
        </el-form-item>
        <el-form-item label="用户名">
          {{ruleForm.username}}
        </el-form-item>
        <el-form-item label="手机号码">
          {{ruleForm.phone}}
        </el-form-item>
        <el-form-item prop="nickname" label="昵称" requird>
          <el-input v-model="ruleForm.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item  prop="email" label="邮箱">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="area">
          <div>地址插件正在寻找。。</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .center-container {
    .el-form-item__content {
      width 300px
    }
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
 .center-container {
   width 800px
   border 1px solid #ccc
   .title {
     width 100%
     height 30px
     line-height 30px
     background #f9f9f9
     border 1px solid #ccc
     padding-left 20px
   }
   .headImg {
     margin 20px
     width 100px
     height 100px
     border 1px solid #cfcfcf
     color #fff
     border-radius 50%
     background url('../../../assets/images/home/add_upload.png') no-repeat 0 0/ cover
     cursor pointer
     div {
       width 100%
       height 100%
       border-radius 50%
       text-align center
       padding-top 40%
       background rgba(131, 129, 133, 0.5)
     }
   }
 }
</style>
<script>
  export default{
    data() {
      return {
        headImgShow: false,
        ruleForm: {
          image: '', // 头像
          id: 111,
          username: '哈哈哈哈哈',
          nickname: '',
          phone: '13958655236',
          email: '',
          gender: 1, // 1代表male，2代表female,0未选择
          birthday: '', // yyyy-mm-dd
          area: '', // 地区
          address: '',
        },
      }
    },
    methods: {
      headImgTip() {
        this.headImgShow = !this.headImgShow
      },
    },
  }
</script>
