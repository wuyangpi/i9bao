<template>
  <div class="wrap">
    <div class="title">{{title}}</div>
    <div class="ruleDetail mart20">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="商品主图" required>
          <upload v-model="ruleForm.collectImg" :isDelete="false" prompt="请上传JPG,JPEG,PNG,PDF格式的图片"></upload>
        </el-form-item>
        <el-form-item label="征集详情" required>
          <nc-editor></nc-editor>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "add-common.styl"
</style>
<script>
  import E from 'wangeditor'
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
    },
    methods: {
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

    }
  }
</script>
