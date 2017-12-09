<!-- 设置店铺用户评价页 -->
<template>
  <div>
    <div class="flex-wrap">
      <div class="left"></div>
      <div class="right">
        <p v-for="item in items">
          <span class="title line-block">{{item.label}}：</span>
          <span>{{item.value}}</span>
        </p>
      </div>
    </div>
    <div class="shop-contain">
      <div class="shop-set">
        <div class="title">店铺综合评分</div>
        <div class="content">
          <div class="all-evaluate" v-for="item in evaluateItems">
            <div>{{item.name}}：<span class="high">{{item.grade}}</span>分</div>
            <div>比同行业店铺水平</div>
            <div class="high">高{{item.percent}}%</div>
            <div>
              <el-rate
                v-model="item.value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>
          </div>
        </div>
      </div>
      <div class="service-set">
        <div class="title">店铺服务情况</div>
        <div class="content">
          <div class="all-evaluate" v-for="item in serviceItems">
            <div class="col">{{item.name}}</div>
            <div>{{item.week}}</div>
            <div>{{item.month}}</div>
            <div>{{item.season}}</div>
          </div>
        </div>
        <div class="foot">
          <span class="mar30">当前诚信度：99分</span>
          <span>当前诚信等级：优秀</span>
        </div>
      </div>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName" class="tab-item">
        <el-tab-pane label="来自征集商的评价" name="fromCollect"></el-tab-pane>
        <el-tab-pane label="对征集商的评价" name="toCollect"></el-tab-pane>
      </el-tabs>
    </div>
    <evaluation v-if="activeName === 'fromCollect'" title="商品名称" :hadReply="true" :evaluates="evaluates" >
    </evaluation>
    <evaluation v-if="activeName === 'toCollect'" title="商户名称" :hadReply="true" :evaluates="evaluates"></evaluation>
  </div>
</template>
<style lang="stylus" scoped>
  .flex-wrap {
    display flex
    flex-flow row nowrap
    align-items center
    .left {
      width 160px
      height 160px
      margin 0 20px
      background url("../../../../assets/images/home/orange.png") no-repeat center/contain
    }
    .right {
      flex 1
      p {
        margin 5px 0
      }
      .title {
        width 70px
      }
    }
  }
  .shop-contain {
    margin 20px
    width 750px
    .shop-set {
      border 1px solid #ccc
    }
    .title, .foot {
      width 100%
      height 36px
      border 1px solid #ccc
      line-height 36px
      background #cfcfcf
      padding-left 20px
    }
    .service-set {
      border 1px solid #ccc
      margin 20px 0
      .all-evaluate {
        >div {
          width 15%
        }
        .col {
          width 20%
        }
      }
      .mar30 {
        margin-right 30px
      }
    }
    .all-evaluate {
      >div {
        display inline-block
        margin 20px
      }
      .high {
        color #ff9900
      }
    }
  }
  .tabs {
      height 60px
      padding-top 8px
      padding-left 20px
      background #fff
    }
</style>
<script>
  import evaluation from '../../components/evaluation.vue'

  export default  {
    data() {
      return {
        activeName: 'fromCollect',
        items: [
          { label: '店铺名称', value: '女神梦', },
          { label: '店铺地址', value: '浙江省杭州市江干区市民中心D座', },
          { label: '店铺分类', value: '服装类、设计类', },
        ],
        evaluateItems: [
          { name: '完成质量', grade: 4.89, percent: 0.23, value: 4 },
          { name: '工作进度', grade: 4.69, percent: 0.23, value: 3.75 },
          { name: '服务态度', grade: 4.99, percent: 0.23, value: 3 },
        ],
        serviceItems: [
          { name: '', week: '本周', month: '本月', season: '本季' },
          { name: '退款笔数：', week: 10, month: 11, season: 41 },
          { name: '投诉次数：', week: 10, month: 11, season: 41 },
          { name: '纠纷次数：', week: 10, month: 11, season: 41 },
        ],
        evaluates: [
          { name: 'logo设计作品', img: '', time: '2017-08-26', content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容'},
          { name: '女神装上衣', img: '', time: '2017-08-26', content: '内容内容内容'},
          { name: '冬天裙子设计红色', img: '', time: '2017-08-26', content: '内容容内容内容内容容内容'}
        ],
      }
    },
    components: {
      evaluation,
    },
  }
</script>
