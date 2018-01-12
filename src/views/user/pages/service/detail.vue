<template>
  <div class="detail">
    <head-info name="服务" v-if="JSON.stringify(detailObject) !== '{}'" :base-info="detailObject"></head-info>
    <div class="content">
      <div class="tabs">
        <el-tabs v-model="activeName" class="tab-item">
          <el-tab-pane label="服务详情" name="detail"></el-tab-pane>
          <el-tab-pane label="用户评价" name="evaluate"></el-tab-pane>
        </el-tabs>
      </div>
      <detail v-if="activeName === 'detail'" description="这是一个很长的yiduanhljljljk"></detail>
      <evaluation v-if="activeName === 'evaluate'" :evaluates="evaluates"></evaluation>
    </div>
  </div>
</template>
<script>
  import headInfo from '../../components/head-info.vue'
  import detail from '../../components/editor-detail.vue'
  import evaluation from '../../components/evaluation.vue'
  export default {
    data() {
      return {
        detailObject: {},
        description: '',  // 图文详情
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
    created() {
      const id = this.$route.query.id
      this.http.post('/rest/service/detail', { id }).then(
        (res) => {
          this.description = res.data.service.content
          this.detailObject = res.data.service
        }).catch( err => {
        this.$message.error({ message: err || '出错了' })
      })
    },
  }
</script>

<style lang="stylus" scoped>
  .detail {
    margin 20px 0 0 20px
    .tabs {
      height 60px
      padding-top 8px
      padding-left 20px
      background #fff
    }
  }
</style>
