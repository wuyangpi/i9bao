<template>
  <div>
    <h1>征集订单详情</h1>
    <collect-detail>
    <areaTitle title="应征作品">
      <div class="table">
        <el-table
          :data="tableList"
          border
          style="width: 970px">
          <el-table-column
            prop="code"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="time"
            label="提交时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="shopname"
            label="应征商户名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="shopcate"
            label="应征商户类别"
            width="150">
          </el-table-column>
          <el-table-column
            prop="price"
            label="应征商户报价"
            width="150">
          </el-table-column>
          <el-table-column
            label="作品"
            width="120">
            <template scope="scope">
              <div class="operate-column">
                <a class="link" href="javascript: void(0);">下载附件.doc</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="100">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template scope="scope">
              <div class="operate-column">
                <a class="link" href="javascript: void(0);">处理</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </areaTitle>
    </collect-detail>
  </div>
</template>
<script>
  import collectDetail from '../collector/collect-detail.vue'
  import areaTitle from 'components/area-title.vue'

  export default {
    components: {
      collectDetail,
      areaTitle
    },
    data() {
      return {
        tableList: [{
          code: 10,
          shopname: '女神梦服装logo征集',
          shopcate: '服装类',
          time: '2016-05-03',
          price: 1000,
          status: '待反馈'
        },
          {
            code: 11,
            shopname: '女神梦服装logo征集',
            shopcate: '服装类',
            time: '2016-05-03',
            price: 1000,
            status: '待反馈'
          },
          {
            code: 12,
            shopname: '女神梦服装logo征集',
            shopcate: '服装类',
            time: '2016-05-03',
            price: 1000,
            status: '待反馈'
          },]
      }
    },
  }
</script>
<style lang="stylus" scoped>
  .table {
    a {
      color #fe6e1b
    }
  }
</style>