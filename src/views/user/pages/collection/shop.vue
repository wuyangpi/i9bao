/**
* 我的服务列表页面
* 三部分组成
* 搜索部分，表格，分页
*/
<template>
  <div class="contain">
    <div class="search">
      <el-button class="w100 new" @click="gotoNew">新建</el-button>
      <div>
        创建时间
        <el-date-picker type="daterange" class="marr10" placeholder="选择日期" v-model="search.date"></el-date-picker>
        <el-select v-model="search.status" class="w150 marr10">
          <el-option label="请选择服务状态" value=""></el-option>
          <el-option
            v-for="item in stateList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          class="w200 marr10"
          placeholder="名称/编号"
          icon="search"
          v-model="search.search_key"
          :on-icon-click="searchList">
        </el-input>
        <el-button type="primary" class="w100 marr10" icon="search" @click="getList(0)">查询</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableList"
        border
        style="width: 970px">
        <el-table-column
          type="index"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="title"
          label="店铺名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="startDt"
          label="店铺种类"
          width="100">
        </el-table-column>
        <el-table-column
          label="店铺等级"
          width="120">
          <template scope="scope">
            {{scope.row.area.join('、')}}
          </template>
        </el-table-column>
        <el-table-column
          label="店铺状态"
          width="90">
          <template scope="scope">
            <span v-if="scope.row.status < 4">{{progressArr[scope.row.status]}}</span>
            <span v-else>{{progressArr[scope.row.status - 1]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="180">
          <template scope="scope">
            <div class="operate-column">
              <a class="link" href="javascript: void(0);" @click="cancelCollect(scope.row.id)">取消收藏</a>
              <a class="link" href="javascript: void(0);" @click="goSolution(scope.row.id)">查看店铺</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <nc-page
      :size-change="handleSizeChange"
      :current-change="handleCurrentChange"
      :total="search.pageCount * search.num"
      :page-size="10"
      :page-count="search.pageCount"
      :current-page="search.offset + 1"></nc-page>
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
          date: '',
          start: '',
          end: '',
          status: '',
          search_key: '',
          offset: 0, // 当前页
          pageCount: 1, // 总页数
          num: 10, // pageSize一页的最大条数
          pageSize: 10,
        },
        progressArr: ['待提交', '待审核', '审核被拒', '已上架', '已下架'],
        operateObj: {
          'submit': '提交成功',
          'delete': '删除成功',
          'down': '下架成功',
          'up': '上架成功',
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
            label: '审核通过',
            value: 2,
          },
          {
            label: '已上架',
            value: 3,
          },
          {
            label: '已下架',
            value: 5,
          }],
        tableList: [],
      }
    },
    created() {
      this.getList()
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
        this.http.post('/rest/shop/myCollection').then(
          (res) => {
            const data = res.data
            this.tableList = data.list
            this.search.offset = data.offset
            this.search.num = data.num
            this.search.pageCount = data.total
          }).catch( err => {
          this.$message.error({ message: err || '出错了' })
        })
      },
      cancelCollect(id) {
        this.http.post('/rest/shop/collect', { shopId: id, isCollected: false }).then(
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
       * 编辑
       * @param {number} id 编辑的征集ID
       */
      gotoedit(id) {
        this.$router.push({ path: '/myservice/add',
          query: {
            id
          },
        })
      },
      /**
       * 点击搜索
       */
      searchList() {
        console.log(this.search)
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
