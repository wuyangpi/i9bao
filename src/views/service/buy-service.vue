<!--征集的详情页面-->
<template>
  <div class="detail">
    <head-info name="服务" v-if="JSON.stringify(detailObject) !== '{}'" catelog="data/service" :base-info="detailObject">
      <div slot="operate">
        <div slot="operate" v-if="used">
          服务商等级：
          <el-rate
            class="line-block"
            v-model="rate"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </div>
      </div>
    </head-info>
    <div class="shop-set">
      <div class="title">所需服务要求</div>
      <div class="content">
        <el-input class="area-width" :rows="5" type="textarea" v-model="requirement"></el-input>
        <upload title="上传附件"
                aliCatalog="data/service"
                :multiple="true"
                :multiContent="content"
                numbers="5"
                maxSize="50"
                :onSuccess="getContent"
                accept="image/png,image/jpeg,application/json,audio/mp4,application/vnd.ms-powerpoint,application/vnd.ms-excel,application/msword"
                v-model="mainPic"
                prompt="最多可添加五个附件，每个大小不超过50M.如果您有相关资料也可以传给服务商参考"></upload>
      </div>
    </div>
    <!--<div class="shop-set">-->
      <!--<div class="title">个人信息</div>-->
      <!--<div class="content">-->
        <!--<div>联系方式：18923458767</div>-->
        <!--<div>姓名：王先生张三</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="shop-set">-->
      <!--<div class="title">上传资料</div>-->
      <!--<div class="content">-->
        <!---->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="shop-set">-->
      <!--<div class="title">-->
        <!--<div class="line1">-->
          <!--<div>物流信息</div>-->
          <!--<div>-->
            <!--<el-button class="admin" type="plain" v-if="!used">管理收获地址</el-button>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="content">-->
        <!--<div class="line1">-->
          <!--<div>收件人：{{info.name}}</div>-->
          <!--<div>联系电话：{{info.phone}}</div>-->
          <!--<div>邮政编码：{{info.poster}}</div>-->
        <!--</div>-->
        <!--<div>收获地址：{{info.address}}</div>-->
        <!--<div class="line1">-->
          <!--<div>运送方式：-->
            <!--<el-select v-model="info.express" class="base-width">-->
              <!--<el-option-->
                <!--v-for="item in expressStyle"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</div>-->
          <!--<div>运费：-->
            <!--<el-input class="base-width" :disabled="true" v-model="info.fee"></el-input>元-->
          <!--</div>-->
        <!--</div>-->
        <!--<div>-->
          <!--<span class="comment">备注：</span>-->
          <!--<el-input class="area-width" type="textarea" v-model="info.comment"></el-input>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="btn-set" v-if="!used">
      <div class="line-block"><span class="bolder high">总计金额: </span>{{price}}&nbsp;&nbsp;&nbsp;
        (含快递费<span class="high">{{info.fee}}</span>元)</div>
      <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="toOrder">去支付</el-button>
      <div class="tips">
        官方提供线上担保交易，保障您的资金安全。 80%的欺诈、
        资金盗取均由线下交易导致，请勿线下交易。
      </div>
    </div>
  </div>
</template>
<script>
  import headInfo from '../user/components/head-info.vue'
  export default {
    props: {
      used: [Boolean],
      state: [String],
    },
    data() {
      return {
        id: 0, // 服务id
        progressArr: ['待提交', '待审核', '审核被拒', '上架中', '已下架'],
        // 多数组物流
        content: [],
        // 服务要求
        requirement: '',
        price: 110,
        rate: 3.75,
        activeName: 'detail',
        mainPic: '',
        info: {
          name: '范勇',
          phone: 15679881234,
          poster: 234567,
          address: '浙江省杭州市江干区市民中心D座410室',
          express: 0,
          fee: 10,
          comment: '',
        },
        expressStyle: [
          {
            label: '普通快递',
            value: 0,
          },
          {
            label: '顺丰速递',
            value: 1,
          },
        ],
        detailObject: {},
        isDisabled: false,
      }
    },
    components: {
      headInfo,
    },
    created() {
      this.id = this.$route.params.id
      this.http.post('/rest/service/detail', { id: this.id }).then(
        (res) => {
          const service = res.data.service
          this.detailObject = service
        }).catch( err => {
          this.$message.error({ message: err || '出错了' })
        })
    },
    methods: {
      getContent(arr) {
        const content = []
        arr.forEach(l => {
          content.push(l.value)
        })
        const params = {
          serviceId: this.id,
          requirement: this.requirement,
        }
        params.attachment = JSON.stringify(content)
        this.http.post('/rest/service/order/genOrder', params).then(
          (res) => {
            const data = res.data.solution
            this.detailObject = data.demand
            this.content = data.content
            this.price = data.price
            this. description = data.description
            this.solutionId = data.id
          }).catch( err => {
          this.$message.error({ message: err || '出错了' })
        })
      },
      // 去下单
      toOrder() {
        this.$emit('submit')
      },
      toPay() {
        this.$router.push({ path: '/order' })
      },
      cancel() {
        this.$confirm('离开后，已填写的数据将不被保留。确定离开？', '提示', {
          confirmButtonText: '离开',
          cancelButtonText: '留在此页',
        }).then(() => {
          history.go(-1)
        })
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .detail {
    width 800px
    margin 20px auto
    .shop-set {
      width 100%
      margin-top 20px
      border 1px solid #eee
    }
    .content {
      padding 15px
      >div {
        margin 10px
      }
    }
    .title {
      width 100%
      height 36px
      border-bottom 1px solid #eee
      line-height 36px
      background #eee
      padding-left 20px
    }
    .line1 {
      display flex
      flex-flow row nowrap
      justify-content space-between
      .admin {
        padding 6px 10px
      }
    }
    .base-width {
      width 200px
    }
    .area-width {
      width 80%
    }
    .comment {
      vertical-align top
    }
    .line-block {
      display inline-block
      vertical-align top
    }
    .btn-set {
      text-align: right;
      margin: 30px 0
      height 100px
      position relative
      .line-block {
        vertical-align middle
      }
      .bolder {
        font-weight: 700
      }
      .save-btn {
        margin-left 20px
        width: 120px;
      }
      .tips {
        position absolute
        right 0
        top 50px
        text-align right
        font-size 12px
        width 600px
        color red
      }
    }
    .high {
      color #ff9900
    }
  }
</style>
