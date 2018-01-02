/**
* 我的征集列表页面
* 三部分组成
* 搜索部分，表格，分页
*/
<template>
  <div class="contain">
    <div class="search">
      <el-button class="new" @click="gotoNew">新建</el-button>
      <div>
        创建时间
        <el-date-picker type="daterange" class="marr10" placeholder="选择日期" v-model="search.date"></el-date-picker>
        <el-select v-model="search.progress" class="w150 marr10">
          <el-option label="请选择征集状态" value=""></el-option>
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
        <el-button type="primary" class="w100 marr10" icon="search" @click="searchList">查询</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableList"
        border
        style="width: 970px">
        <el-table-column
          prop="number"
          label="征集编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="名称"
          width="180">
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
          prop="area"
          label="征集范围"
          width="120">
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
          width="180">
          <template scope="scope">
            <div class="operate-column">
              <a class="link" href="javascript: void(0);" v-if="scope.row.progress === 0" @click="operateItem(scope.row.id, 'submit')">提交</a>
              <a class="link" href="javascript: void(0);" v-if="scope.row.progress < 1" @click="operateItem(scope.row.id, 'delete')">删除</a>
              <a class="link" href="javascript: void(0);" v-if="scope.row.progress > 0" @click="goView(scope.row.id)">查看</a>
              <a class="link" href="javascript: void(0);" v-if="scope.row.progress === 3" @click="operateItem(scope.row.id, 'pause')">暂停</a>
              <a class="link" href="javascript: void(0);" v-if="scope.row.progress === 3" @click="operateItem(scope.row.id, 'down')">下架</a>
              <a class="link" href="javascript: void(0);" v-if="scope.row.progress === 4" @click="operateItem(scope.row.id, 'resume')">恢复</a>
              <a class="link" href="javascript: void(0);" v-if="scope.row.progress === 5" @click="operateItem(scope.row.id, 'up')">上架</a>
              <a class="link" href="javascript: void(0);" v-if="scope.row.progress !== 5" @click="gotoedit(scope.row.id)">编辑</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <nc-page
      :size-change="handleSizeChange"
      :current-change="handleCurrentChange"
      :current-page="search.currentPage"
      :page-size="search.pageSize"
      :total="search.totalCount"></nc-page>
  </div>
</template>
<style lang="stylus" scoped>
  .contain {
    width 100%
    margin 20px
    .search {
      display flex
      flex-flow row wrap
      margin 20px 0
      .new {
        border-color #fe6e1b
        color #fe6e1b
        margin-right 15px
      }
      .w150 {
        width 150px
      }
      .w200 {
        width 200px
      }
      .marr10 {
        margin-right 5px
      }
    }
    .table {
      margin-bottom 20px
      a {
        color #fe6e1b
        cursor pointer
      }
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        search: {
          date: '',
          start: '',
          end: '',
          progress: '',
          search_key: '',
          offset: 1,
          num: 1, // pageCount
          pageSize: 10,
          totalCount: 0,
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
            label: '征集中',
            value: 2,
          },
          {
            label: '暂停中',
            value: 3,
          },
          {
            label: '已完成',
            value: 4,
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
      this.getList(1)
    },
    methods: {
      /**
       * 请求
       * @param {number} val 页码
       */
      getList(val) {
        if (val) {
          this.search.currentPage = val
        }
        debugger
        if (this.search.date) {
          this.search.start = this.dealDate(this.search.date[0])
          this.search.end = this.dealDate(this.search.date[1])
        }
        this.http.post('/rest/demand/listMine', this.search).then(
          (res) => {
            this.tableList = res.data.list
          }).catch( err => {
            this.$message.error({ message: err || '出错了' })
          })
      },
      /**
       * 处理的日期
       */
      dealDate(date) {
        const dates = new Date(date)
        const month = dates.getMonth()+1
        const day = dates.getDate()
        const months =  month > 9 ? month : `0${month}`
        const days = day > 9 ? day : `0${day}`
        return `${dates.getFullYear()}-${months}-${days}`
      },
      /**
       * 跳往我的征集新建页面
       */
      gotoNew() {
        this.$router.push({ path: '/collecter/add'})
      },
      /**
       * 查看详情
       * @param {number} id 编辑的征集ID
       */
      goView(id) {
        this.$router.push({ path: '/collecter/detail', query: { id }, })
      },
      /**
       * 操作
       * @param {string} id 提交的对象ID
       * @param {string} operate 操作的字符串
       */
      operateItem(id, operate) {
        const params = { demandId: id,  operation: operate }
        this.http.post('/rest/demand/updateProgress', params).then(
          (res) => {
            console.log(res.message)
            this.$message.success({
              message: res.message || operateObj[operate],
              onClose: () => {
                this.getList()
              }
            })
          }).catch( err => {
            this.$message.error({ message: err })
          })
      },
      /**
       * 编辑
       * @param {number} id 编辑的征集ID
       */
      gotoedit(id) {
        this.$router.push({ path: '/collecter/add',
          query: {
            id
          },
        })
      },
      /**
       * 点击搜索
       */
      searchList() {
        this.getList(1)
      },
      /**
       * 更改pagesize
       * @param val {number} 页面容积
       * 更改pagesize的时候，也会执行currentChange
       */
      handleSizeChange(val) {
        this.search.pageSize = val
        this.getList(1)
      },
      /**
       * 更改当前currentpage
       * @param val {number} 跳转到第几页
       */
      handleCurrentChange(val) {
        this.getList(val)
      }
    },
  }
</script>
