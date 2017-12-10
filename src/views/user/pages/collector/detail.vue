<!-- 新建的详细信息 -->
<template>
  <div class="wrap">
    <div class="title">{{title}}</div>
    <div class="ruleDetail mart20">
      <el-form :model="ruleForm" ref="ruleForm" label-width="80px">
        <el-form-item :label="labelImg" required>
          <upload v-model="ruleForm.mainPic " :isDelete="false" prompt="请上传JPG,JPEG,PNG,PDF格式的图片，大小不超过1M"></upload>
          <span class="error" v-if="ruleForm.mainPic === '' && isSubmit">请上传图片</span>
        </el-form-item>
        <slot name="desc"></slot>
        <el-form-item :label="labelDesc" required>
          <nc-editor :text="ruleForm.detail" @change="contentChange"></nc-editor>
          <span class="error error1" v-if="ruleForm.detail === '' && isSubmit">请填写详情信息</span>
          <!--<quill-editor :content="content"-->
                        <!--:options="editorOption"-->
                        <!--@change="onEditorChange($event)">-->
          <!--</quill-editor>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "add-common.styl"
  .error {
    position absolute
    bottom -20px
    color #ff4949
    font-size 12px
  }
  .error1 {
    bottom -30px
  }
</style>
<script>
  export default {
    props: {
      labelImg: {
        type: String,
        defalut: '商品主图',
      },
      labelDesc: {
        type: String,
        defalut: '征集详情',
      },
      title: {
        type: String,
        defalut: '标题',
      },
      onConfirm: {
        type: Function,
        defalut: () => {
        }
      }
    },
    data() {
      return {
        ruleForm: {
          mainPic : '',
          detail: ''
        },
        isSubmit: false,
      }
    },
    mounted() {
      this.$parent.$on('save', this.submitForm)
      this.$parent.$parent.$on('save', this.submitForm)
    },
    methods: {
      /**
       * 提交表单
       */
      submitForm() {
        this.isSubmit = true
        if (this.ruleForm.mainPic && this.ruleForm.detail) {
          this.onConfirm(this.ruleForm)
        }
      },
      /**
       * 内容变化
       * @param obj {Object} editor里面的对象
       */
      contentChange(obj) {
        this.ruleForm.detail = obj.html
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
