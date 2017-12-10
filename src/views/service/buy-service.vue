<!--征集的详情页面-->
<template>
  <div class="detail">
    <head-info name="服务">
      <div slot="operate">
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
    </head-info>
    <div class="shop-set">
      <div class="title">所需服务要求</div>
      <div class="content">{{demand}}</div>
    </div>
    <div class="shop-set">
      <div class="title">个人信息</div>
      <div class="content">
        <div>联系方式：18923458767</div>
        <div>姓名：王先生张三</div>
      </div>
    </div>
    <div class="shop-set">
      <div class="title">上传资料</div>
      <div class="content">
        <upload title="上传文件"
                accept="image/png,image/jpeg,application/json,audio/mp4,application/vnd.ms-powerpoint,pplication/vnd.ms-excel,application/msword "
                v-model="mainPic"
                prompt="支持上传图片、视频、PPT、语音、PDF、word 、excel等"></upload>
      </div>
    </div>
    <div class="shop-set">
      <div class="title">
        <div class="line1">
          <div>物流信息</div>
          <div>
            <el-button class="admin" type="plain">管理收获地址</el-button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="line1">
          <div>收件人：{{info.name}}</div>
          <div>联系电话：{{info.phone}}</div>
          <div>邮政编码：{{info.poster}}</div>
        </div>
        <div>收获地址：{{info.address}}</div>
        <div class="line1">
          <div>运送方式：
            <el-select v-model="info.express" class="base-width">
              <el-option
                v-for="item in expressStyle"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>运费：
            <el-input class="base-width" :disabled="true" v-model="info.fee"></el-input>元
          </div>
        </div>
        <div>
          <span class="comment">备注：</span>
          <el-input class="area-width" type="textarea" v-model="info.comment"></el-input>
        </div>
      </div>
    </div>
    <div class="btn-set">
      <div class="line-block"><span class="bolder high">总计金额: </span>{{price}}&nbsp;&nbsp;&nbsp;
        (含快递费<span class="high">{{info.fee}}</span>元)</div>
      <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="toPay">去支付</el-button>
      <div class="tips">
        官方提供线上担保交易，保障您的资金安全。 80%的欺诈、
        资金盗取均由线下交易导致，请勿线下交易。
      </div>
    </div>
  </div>
</template>
<script>
  import headInfo from '../user/components/head-info.vue'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'
  export default {
    data() {
      return {
        price: 110,
        rate: 3.75,
        activeName: 'detail',
        mainPic: '',
        demand: '要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求' +
        '要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求' +
        '要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求' +
        '要求要求要求要求要求要求要求要求要求要求要求要求要求',
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
        isDisabled: false,
      }
    },
    components: {
      ElButton,
      headInfo,
    },
    methods: {
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
      .high {
        color #ff9900
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
  }
</style>
