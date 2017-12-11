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
        <el-select v-model="search.status" class="w150 marr10">
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
          v-model="search.name"
          :on-icon-click="searchList">
        </el-input>
        <el-button type="primary" class="w100 marr10" icon="search">查询</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableList"
        border
        style="width: 970px">
        <el-table-column
          prop="code"
          label="征集编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="发布时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="到期时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="price"
          label="金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="range"
          label="征集范围"
          width="120">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="90">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="180">
          <template scope="scope">
            <div class="operate-column">
              <a class="link" href="javascript: void(0);">提交</a>
              <a class="link" href="javascript: void(0);">删除</a>
              <a class="link" href="javascript: void(0);" @click="goView()">查看</a>
              <a class="link" href="javascript: void(0);">编辑</a>
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
          status: '',
          name: '',
          currentPage: 1,
          pageCount: 1,
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
        tableList: [{
          code: 201705190015,
          name: '女神梦服装logo征集',
          startDate: '2016-05-03',
          endDate: '2016-10-03',
          price: 5000,
          range: '全国范围',
          status: '待提交'
        }, {
          code: 201705190015,
          name: '女神梦服装logo征集',
          startDate: '2016-05-03',
          endDate: '2016-10-03',
          price: 5000,
          range: '全国范围',
          status: '待提交'
        }, {
          code: 201705190015,
          name: '女神梦服装logo征集',
          startDate: '2016-05-03',
          endDate: '2016-10-03',
          price: 5000,
          range: '全国范围',
          status: '待提交'
        }, {
          code: 201705190015,
          name: '女神梦服装logo征集',
          startDate: '2016-05-03',
          endDate: '2016-10-03',
          price: 5000,
          range: '全国范围',
          status: '待提交'
        }, {
          code: 201705190015,
          name: '女神梦服装logo征集',
          startDate: '2016-05-03',
          endDate: '2016-10-03',
          price: 5000,
          range: '全国范围',
          status: '待提交'
        }, {
          code: 201705190015,
          name: '女神梦服装logo征集',
          startDate: '2016-05-03',
          endDate: '2016-10-03',
          price: 5000,
          range: '全国范围',
          status: '待提交'
        }]
      }
    },
    methods: {
      /**
       * 跳往我的征集新建页面
       */
      gotoNew() {
        this.$router.push({ path: '/collecter/add'})
      },
      goView() {
        this.$router.push({ path: '/collecter/detail'})
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
        console.log(`每页 ${val} 条`);
      },
      /**
       * 更改当前currentpage
       * @param val {number} 跳转到第几页
       */
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>
