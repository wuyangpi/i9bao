<!--征集的详情页面-->
<template>
  <div class="detail">
    <head-info name="征集" v-if="JSON.stringify(detailObject) !== '{}'" :catelog="`data/demand/${userId}`" :base-info="detailObject"></head-info>
    <slot></slot>
    <div class="content">
      <div class="tabs">
        <el-tabs v-model="activeName" class="tab-item">
          <el-tab-pane label="征集详情" name="detail"></el-tab-pane>
          <el-tab-pane label="应征作品" name="solution"></el-tab-pane>
          <el-tab-pane label="用户评价" name="evaluate"></el-tab-pane>
        </el-tabs>
      </div>
      <detail v-show="activeName === 'detail'" :description="description"></detail>
      <evaluation v-if="activeName === 'evaluate'" :evaluates="evaluates"></evaluation>
      <solution v-if="activeName === 'solution'" :id="id"></solution>
    </div>
  </div>
</template>
<script>
  import headInfo from '../../components/head-info.vue'
  import detail from '../../components/editor-detail.vue'
  import solution from './solution.vue'
  import evaluation from '../../components/evaluation.vue'
  export default {
    data() {
      return {
        userId: 0,
        id: this.$route.params.id - 0,
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
      solution,
      evaluation
    },
    created() {
      this.userId = window.localStorage.getItem('netId')
      const id = this.$route.params.id
      this.http.post('/rest/demand/detail', { id }).then(
        (res) => {
          this.description = res.data.demand.content
          this.detailObject = res.data.demand
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
