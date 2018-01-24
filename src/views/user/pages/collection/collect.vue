/**
* 我的征集列表页面
* 三部分组成
* 搜索部分，表格，分页
*/
<template>
  <div class="contain">
    <div class="table">

      <el-table
        :data="tableList"
        border
        style="width: 840px">
        <el-table-column
          type="index"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="title"
          label="名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="startDt"
          label="发布时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="endDt"
          label="到期时间"
          width="100">
        </el-table-column>
        <el-table-column
          label="金额(元)"
          width="100">
          <template scope="scope">
            <span v-if="scope.row.price.type === 1">
              <span v-if="scope.row.price.activeType === 1">
                <span v-if="scope.row.price.rangeType === 1">{{scope.row.price.fixedPrice}}</span>
                <span v-else>{{scope.row.price.rangePrice[0]}}~{{scope.row.price.rangePrice[1]}}</span>
              </span>
              <span v-else>分期</span>
            </span>
            <span v-else>商家报价</span>
          </template>
        </el-table-column>
        <el-table-column
          label="征集范围"
          width="120">
          <template scope="scope">
            {{scope.row.area.join('、')}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="90">
          <template scope="scope">
            <span v-if="scope.row.progress === -1">{{progressArr[8 - scope.row.progress]}}</span>
            <span v-else>{{progressArr[scope.row.progress]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="130">
          <template scope="scope">
            <div class="operate-column">
              <a class="link" href="javascript: void(0);" @click="cancelCollect(scope.row.id)">取消收藏</a>
              <a class="link" href="javascript: void(0);" @click="goSolution(scope.row.id)">去应征</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--<nc-page-->
      <!--:isSizes="false"-->
      <!--:size-change="handleSizeChange"-->
      <!--:current-change="handleCurrentChange"-->
      <!--:total="search.pageCount * search.num"-->
      <!--:current-page="search.currentPage"-->
      <!--:page-size="search.num"-->
      <!--:page-count="search.pageCount"></nc-page>-->
  </div>
</template>
<style lang="stylus" scoped>
  @import "../../common/list.styl"
</style>
<script>
  export default {
    data() {
      return {
        search: {
          offset: 0, // 当前页
          currentPage: 1,
          pageCount: 1, // 总页数
          num: 10, // pageSize一页的最大条数
          pageSize: 10,
          totalCount: 20,
        },
        stateList: [
          {
            label: '待提交',
            value: 0,
          },
          {
            label: '待审核',
            value: 1,
          },
          {
            label: '审核被拒',
            value: 2,
          },
          {
            label: '征集中',
            value: 3,
          },
          {
            label: '暂停中',
            value: 4,
          },
          {
            label: '已下架',
            value: 5,
          },
          {
            label: '已完成',
            value: 6,
          }],
        progressArr: ['待提交', '待审核', '审核被拒', '征集中', '暂停中', '下架', '已完成', '已删除'],
        operateObj: {
          'submit': '提交成功',
          'delete': '删除成功',
          'pause': '暂停成功',
          'resume': '恢复成功',
          'down': '下架成功',
          'up': '上架成功',
        },
        tableList: [],
      }
    },
    created() {
      this.getList(0)
    },
    methods: {
      /**
       * 请求
       * @param {number} val 页码
       */
      getList(val) {
        if (val) {
          this.search.offset = val
        }
        if (this.search.date) {
          this.search.start = this.dealDate(this.search.date[0])
          this.search.end = this.dealDate(this.search.date[1])
        } else {
          this.search.start = ''
          this.search.end = ''
        }
        this.http.post('/rest/demand/myCollection').then(
          (res) => {
            const data = res.data
            this.tableList = data.list
          }).catch( err => {
            this.$message.error({ message: err || '出错了' })
          })
      },
      cancelCollect(id) {
        this.http.post('/rest/demand/collect', { demandId: id, isCollected: false }).then(
          () => {
            this.$message.success({ message: '取消收藏成功' })
          }).catch( err => {
            this.$message.error({ message: err || '出错了' })
          })
      },
      goSolution(id) {
        window.location.href = `/collect/immediately/${id}`
      },
      /**
       * 更改pagesize
       * @param val {number} 页面容积
       * 更改pagesize的时候，也会执行currentChange
       */
      handleSizeChange(val) {
        this.search.num = val - 1
        this.getList()
      },
      /**
       * 更改当前currentpage
       * @param val {number} 跳转到第几页
       */
      handleCurrentChange(val) {
        this.getList(val - 1)
      }
    },
  }
</script>
