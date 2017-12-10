<!--征集的详情页面-->
<template>
  <div class="detail">
    <head-info name="服务">
      <div slot="operate">
        <el-button type="primary" @click="goTocollect">立即购买</el-button>
      </div>
    </head-info>
    <div class="content">
      <div class="tabs">
        <el-tabs v-model="activeName" class="tab-item">
          <el-tab-pane label="服务详情" name="detail"></el-tab-pane>
          <el-tab-pane label="用户评价" name="evaluate"></el-tab-pane>
          <el-tab-pane label="其他要求" name="other"></el-tab-pane>
        </el-tabs>
      </div>
      <detail v-if="activeName === 'detail'" :description="description"></detail>
      <evaluation v-if="activeName === 'evaluate'" :evaluates="evaluates"></evaluation>
      <detail v-if="activeName === 'other'" :description="others"></detail>
    </div>
  </div>
</template>
<script>
  import headInfo from '../user/components/head-info.vue'
  import detail from '../user/components/editor-detail.vue'
  import evaluation from '../user/components/evaluation.vue'
  export default {
    data() {
      return {
        description: '这是一个很长的yiduanhljljljk有很长的一段话多色防晒服多色防晒服',
        others: '这其他要求到底是什么呀？？？？？',
        activeName: 'detail',
        evaluates: [
          { name: 'xyz123', img: '', time: '2017-08-26', content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容'},
          { name: 'xyz1234545', img: '', time: '2017-08-26', content: '内容内容内容'},
          { name: 'x4545yz123', img: '', time: '2017-08-26', content: '内容容内容内容内容容内容'}
        ]
      }
    },
    components: {
      headInfo,
      detail,
      evaluation
    },
    methods: {
      goTocollect() {
        this.$router.push({ path: '/immediately'})
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .detail {
    width 1024px
    margin 20px auto
    .tabs {
      height 60px
      padding-top 8px
      padding-left 20px
      background #fff
    }
  }
</style>
