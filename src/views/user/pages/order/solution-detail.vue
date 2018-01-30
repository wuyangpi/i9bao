/**
* 我的征集列表页面
* 三部分组成
* 搜索部分，表格，分页
*/
<template>
  <div>
    <head-info name="征集" v-if="JSON.stringify(detailObject) !== '{}'" :base-info="detailObject"></head-info>
    <nc-list-area :show="true" title="应征描述">
      <div>{{info.description}}</div>
    </nc-list-area>
    <nc-list-area :show="true" title="应征资料">
      <ul>
        <li v-for="(item, index) in info.content" :key="index" class="li-base">{{item}} <a href="javascript: void(0);" @click="getDown(item)">下载查看</a></li>
      </ul>
    </nc-list-area>
    <nc-list-area title="应征价格">{{info.price}}元</nc-list-area>
  </div>
</template>
<style lang="stylus" scoped>
  @import "../../common/list.styl"
  .li-base {
    line-height 2
    margin: 10px 0
    list-style decimal
  }
</style>
<script>
  import upload from 'src/assets/js/upload'
  import headInfo from '../../components/head-info.vue'

  export default {
    mixins: [upload],
    components: {
      headInfo
    },
    data() {
      return {
        detailObject: {},
        info: {
          description: '',
          price: '',
          content: [],
        },
        ossclient: null,
        client: null,
        bucketUrl: '',
      }
    },
    created() {
      const id = this.$route.params.id
      this.http.post('/rest/demand/solution/detail', { id }).then(
        (res) => {
          const data = res.data.solution
          this.detailObject = data.demand
          this.info = {
            description: data.description,
            price: data.price || '暂无报价',
            content: data.content
          }
        }).catch( err => {
          this.$message.error({ message: err || '出错了' })
        })
    },
    methods: {
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
        // this.bucketUrl = `http://${this.ossclient.bucket}.${this.ossclient.region}.aliyuncs.com/`
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
    },
  }
</script>
