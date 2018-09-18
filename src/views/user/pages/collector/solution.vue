<template>
  <div>
    <div class="one-line" v-if="list.length" v-for="(data, pindex) in list ">
      <div class="head">
        <div class="info">
          <div class="floor-tag" :style="{ backgroundImage: `url(${bucketUrl}/${data.customer.image})`}">
            <img :src="`${bucketUrl}/${data.customer.image}`" /></div>
            <span class="name">{{data.customer.username}}</span>
        </div>
        <div class="time">
          提交时间：{{data.createDt}}
        </div>
      </div>
      <div class="body">
        <div class="desc">
          <div class="title">作品简介：</div>
          <div class="content">{{data.description}}</div></div>
        <ul>
          <li v-for="(item, index) in data.content" :key="index" class="li-base">{{index + 1}}、{{item}} <a href="javascript: void(0);" @click="getDown(item)">下载</a></li>
        </ul>
      </div>
      <div class="foot">
        <template v-if="data.progress === 0">
          <el-button type="primary" class="save-btn" @click="operate(data.id, true)">录用</el-button>
          <el-button type="plain" class="save-btn" @click="operate(data.id, false)">拒绝录用</el-button>
        </template>
        <el-button v-if="data.progress === 1" type="primary" class="save-btn" @click="selectPay(data.id)">去支付</el-button>
        <el-button v-if="data.progress === 3" type="primary" @click="toRefund(data.id)" class="save-btn">申请退款</el-button>
        <el-button v-if="data.progress === 10" type="primary" class="save-btn">申请退款中</el-button>
        <el-popover
          placement="bottom"
          width="310"
          trigger="click">
          <div class="pop-wrap">
            <div class="pop-content">
              <el-input placeholder="0.00"
                        v-model="prizePrice"
                        type="tel">
                <template slot="prepend">￥</template>
              </el-input>
            </div>
            <div class="pop-bottom">
              <el-button type="primary" @click="toPayMore(data.id)">去支付</el-button>
              <el-button @click="hidePop">狠心拒绝</el-button>
            </div>
          </div>
          <el-button type="primary" class="save-btn" slot="reference">打赏</el-button>
        </el-popover>
      </div>
    </div>
    <blank v-if="list.length === 0" message="暂无应征作品"></blank>
  </div>
</template>
<script>
  import blank from 'components/blank.vue'
  import upload from 'src/assets/js/upload'

  export default {
    mixins: [upload],
    components: {
      blank
    },
    props: {
      id: [Number],
    },
    data() {
      return {
        list: [],
        info: {
          content: '',
        },
        prizePrice: '',
        ossclient: null,
        client: null,
        bucketUrl: '',
      }
    },
    created() {
      this.bucketUrl = window.localStorage.getItem('bucketUrl')
      this.getList()
    },
    methods: {
      // 获取应征列表
      getList() {
        this.http.post('/rest/demand/solution/listByMyDemand', { demandId: this.id }).then(
          (res) => {
            this.list = res.data.solutions
          }).catch( err => {
            this.$message.error({ message: err || '出错了' })
          })
      },
      // 提交支付
      selectPay(id) {
        this.$router.push({ path: '/selectPay?solutionId='+id})
      },  
      // 提交支付
      toPayMore(id) {
        this.$router.push({ path:'/selectPay?solutionId='+id+'&tip='+this.prizePrice})
      },    
      // 申请退款
      toRefund(id) {
        this.http.post('/rest/demand/solution/refundApply', { solutionId: id }).then(
          () => {
            this.$message.success({ message: '申请成功' })
            this.getList()
          }).catch( err => {
            this.$message.error({ message: err || '出错了' })
          })
      },
      operate(id, isAccept) {
        this.http.post('/rest/demand/solution/accept', { solutionId: id, accept: isAccept }).then(
          (res) => {
            const text = isAccept ? '录用成功' : '拒绝成功'
            this.$message.success({ message: text })
            this.getList()
          }).catch( err => {
            this.$message.error({ message: err || '出错了' })
          })
      },
      getDown(item) {
        if (this.client) {
          this.dealItems(item)
        } else {
          const index = item.lastIndexOf('/')
          const alicateLog = item.substring(0, index)
          this.requestclient(item, alicateLog)
        }
      },
      // 获取阿里云new oss接口
      async requestclient(item, alicateLog) {
        await this.getClient(alicateLog, 'ossclient')
        this.client = new OSS.Wrapper(this.ossclient)
        this.dealItems(item)
      },
      // 下载文件
      dealItems(item) {
        const index = item.lastIndexOf('/')
        const filename = item.substring(index + 1)
        const url = this.client.signatureUrl(item, { response: {
          'content-disposition': 'attachment; filename="' + filename + '"'
        }
        })
        window.location = url
      },
      /**
       * 隐藏浮层
       */
      hidePop() {
        global.document.body.click()
      },
    },
  }
</script>
<style lang="stylus" scoped>
  .one-line {
    overflow hidden
    clear both
    width 90%
    margin 0 auto
    padding 20px 0
    color #ccc
    font-size 12px
    border-bottom 1px #ccc solid
    .head {
      display flex
      flex-flow row nowrap
      justify-content space-between
    }
    .name {
      color: #555;
      font-size: 14px;
      vertical-align super
    }
    .desc {
      display flex
      flex-flow row nowrap
      .title {
        width 60px
      }
      .content {
        flex 1
        line-height 1.5
        color #555
      }
    }
    .li-base {
      line-height 2
      color #555
      margin: 10px 0
      list-style decimal
    }
    .floor-tag {
      width 30px
      height 30px
      border-radius 50%
      margin-right 10px
      display inline-block
      img {
        width 100%
      }
    }
    .time {
      line-height 2.5
    }
    .foot {
      float right
      .save-btn {
        height 30px
        padding 0 20px
      }
    }
  }
  .pop-wrap {
    .pop-content {
      width: 250px;
      margin: 20px auto 30px;
      line-height: 25px;
      &.center {
        text-align: center;
      }
      &.left {
        text-align: left;
      }
    }
    .pop-bottom {
      text-align: center;
      margin-bottom: 20px;
      button {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
</style>