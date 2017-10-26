<template>
  <div>
    <div class="wrap">
      <p class="title">征集发布</p>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="tel" label="服务编号">
            <el-input v-model="ruleForm.tel" :maxlength="20" placeholder="请输入昵称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="tel" label="服务标题">
            <el-input v-model="ruleForm.tel" :maxlength="20" placeholder="请输入昵称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
 .wrap {
   width 70%
   padding 20px
 }
</style>
<script>
  export default{
    data() {
      return {
        msg:'hello vue'
      }
    },
  }
</script>
