<template>
  <div class="wrap">
    <div class="title">{{title}}</div>
    <div class="ruleDetail mart20">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="商品主图" required>
          <upload v-model="ruleForm.collectImg" :isDelete="false" prompt="请上传JPG,JPEG,PNG,PDF格式的图片"></upload>
        </el-form-item>
        <el-form-item label="征集详情" required>
          <div class="detail"></div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "add-common.styl"
  .detail {
    width 500px
    height 200px
    border 1px solid
  }
</style>
<script>
  export default {
    props: {
      title: {
        type: String,
        defalut: '标题',
      },
    },
    data() {
      return {
        ruleForm: {
          collectImg: '',
          detail: ''
        },
        rules: {
          collectImg: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
        },
        priceList: [
          { label: '指定价格', value: '0', },
          { label: '商家报价', value: '0', },
        ],
      }
    }
  }
</script>
