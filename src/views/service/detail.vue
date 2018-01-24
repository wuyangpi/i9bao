<template>
  <div class="detail">
    <head-info name="征集" v-if="JSON.stringify(detailObject) !== '{}'" catelog="data/service" :base-info="detailObject">
      <div slot="operate">
        <el-button type="primary" @click="goTocollect">立即购买</el-button>
        <el-button type="primary" @click="addCollect">{{isCollected ? '取消' : '加入'}}收藏</el-button>
      </div>
    </head-info>
    <div class="content">
      <div class="tabs">
        <el-tabs v-model="activeName" class="tab-item">
          <el-tab-pane label="服务详情" name="detail"></el-tab-pane>
          <el-tab-pane label="用户评价" name="evaluate"></el-tab-pane>
        </el-tabs>
      </div>
      <detail v-show="activeName === 'detail'" :description="description"></detail>
      <evaluation v-show="activeName === 'evaluate'" :id="id"></evaluation>
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
        id: 0, // 当前征集ID
        isCollected: false, // 是否加入收藏，默认是没有加入收藏
        detailObject: {},
        description: '这是一个很长的yiduanhljljljk有很长的一段话多色防晒服多色防晒服',
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
      this.id = this.$route.params.id
      this.http.post('/rest/demand/detail', { id: this.id }).then(
        (res) => {
          this.description = res.data.demand.content
          this.detailObject = res.data.demand
        }).catch( err => {
        this.$message.error({ message: err || '出错了' })
      })
    },
    methods: {
      goTocollect() {
        // this.$router.push({ path: '/immediately'})
        this.$router.push({ path: `/immediately/${this.id}`})
      },
      addCollect() {
        this.http.post('/rest/service/collect', { serviceId: this.id, isCollected: !this.isCollected }).then(
          () => {
            const text = this.isCollected ? '取消' : '加入'
            this.$message.success({ message: `${text}收藏成功` })
            this.isCollected = !this.isCollected
          }).catch( err => {
          this.$message.error({ message: err || '出错了' })
        })
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
