<!--征集的详情页面-->
<template>
  <div class="detail">
    <head-info name="征集" v-if="JSON.stringify(detailObject) !== '{}'" :base-info="detailObject"></head-info>
    <!--<div class="shop-set">-->
      <!--<div class="title">征集服务要求</div>-->
      <!--<div class="content">{{demand}}</div>-->
    <!--</div>-->
    <!--<div class="shop-set">-->
      <!--<div class="title">个人信息</div>-->
      <!--<div class="content">-->
        <!--<div>联系方式：18923458767</div>-->
        <!--<div>姓名：王先生张三</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="shop-set">
      <div class="title">应征描述</div>
      <div class="content">
        <el-input class="area-width" :rows="5" type="textarea" v-model="description"></el-input>
      </div>
    </div>
    <div class="shop-set">
      <div class="title">应征资料</div>
      <div class="content">
        <upload title="上传文件"
                :aliCatalog="`data/solution/${userId}/public`"
                :multiple="true"
                :multiContent="content"
                maxSize="100"
                accept="image/png,image/jpeg,application/json,audio/mp4,application/vnd.ms-powerpoint,application/vnd.ms-excel,application/msword "
                v-model="mainPic"
                prompt="支持上传图片、视频、PPT、语音、PDF、word 、excel等支持上传多个应征产品"></upload>
      </div>
    </div>
    <div class="shop-set">
      <div class="title">应征价格</div>
      <div class="content">
        <el-input class="area-width20" type="number" :maxlength="12" v-model="price"></el-input>元
      </div>
    </div>
    <!--<div class="shop-set">-->
      <!--<div class="title">物流信息</div>-->
      <!--<div class="content">-->
        <!--<div class="line1">-->
          <!--<div>收件人：{{info.name}}</div>-->
          <!--<div>联系电话：{{info.phone}}</div>-->
          <!--<div>邮政编码：{{info.poster}}</div>-->
        <!--</div>-->
        <!--<div>收获地址：{{info.address}}</div>-->
        <!--<div class="line1">-->
          <!--<div>物流公司：-->
            <!--<el-input class="base-width" v-model="info.company"></el-input>-->
          <!--</div>-->
          <!--<div>物流单号：-->
            <!--<el-input class="base-width" v-model="info.postercode"></el-input>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div>-->
          <!--<span class="comment">备注：</span>-->
          <!--<el-input class="area-width" type="textarea" v-model="info.comment"></el-input>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="btn-set">
      <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="submit">{{content.length ? '编辑' : '提交'}}资料</el-button>
      <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  import headInfo from '../user/components/head-info.vue'
  export default {
    data() {
      return {
        // id编码
        id: this.$route.params.id,
        // 用户id
        userId: '',
        activeName: 'detail',
        detailObject: {},
        mainPic: '',
        submitUrl: '/rest/demand/solution/publish',
//        demand: '要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求' +
//        '要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求' +
//        '要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求要求' +
//        '要求要求要求要求要求要求要求要求要求要求要求要求要求',
//        info: {
//          name: '范勇',
//          phone: 15679881234,
//          poster: 234567,
//          address: '浙江省杭州市江干区市民中心D座410室',
//          company: '',
//          postercode: '',
//          comment: '',
//        },
        solutionId: '', // 当前的应征编码ID
        content: [], // 上传的附件
        price: '',
        description: '',
        isDisabled: false,
      }
    },
    components: {
      headInfo,
    },
    created() {
      // 用户ID
      this.userId = window.localStorage.getItem('netId')
      if (this.$route.fullPath.indexOf('solution') > 0) {
        this.getEditInfo()
      } else {
        this.getDemandInfo()
      }
    },
    methods: {
      // 获得征集详情
      getDemandInfo() {
        this.http.post('/rest/demand/detail', { id: this.id }).then(
          (res) => {
            this.detailObject = res.data.demand
          }).catch( err => {
            this.$message.error({ message: err || '出错了' })
          })
      },
      // 编辑应征的时候的请求
      getEditInfo() {
        this.submitUrl = '/rest/demand/solution/update'
        this.http.post('/rest/demand/solution/detail', { id: this.id }).then(
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
      submit() {
        const params = {
          content_json: '',
          description: this.description,
          price: this.price,
        }
        const arr = []
        this.$children[1].multiArray.forEach(l => {
          arr.push(l.value)
        })
        if (this.description === '' && arr.length === 0) {
          this.$message.error({ message: '请上传资料或添加描述' })
          return
        }
        if (this.price === '') {
          this.$message.error({ message: '请填写应征价格' })
          return
        }
        if (this.solutionId) {
          params.solutionId = this.id
        } else {
          params.demandId = this.id
        }
        params.content_json = JSON.stringify(arr)
        const text = this.$route.fullPath.indexOf('solution') > 0 ? '编辑' : ''
        this.http.post(this.submitUrl, params).then(l => {
          this.$message.success({
            message: l.message || `${text}应征成功！`,
            onClose: () => {
              if (text) {
                history.back()
              } else {
                this.$router.push({ path: '/single' })
              }
            }
          })
        }).catch(err => { this.$message.error({ message: err }) })
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
    }
    .base-width {
      width 200px
    }
    .area-width {
      width 80%
    }
    .area-width20 {
      width 20%
    }
    .comment {
      vertical-align top
    }
    .btn-set {
      text-align: center;
      width: 100%
      margin: 30px;
      .save-btn, .cancel-btn {
        width: 150px;
      }
    }
  }
</style>
