<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pagesizes"
      :page-size="pageSize"
      layout="`->, total, prev, pager, next, slot,${isSizes ? ' sizes,': ' '}jumper`"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    props: {
      currentPage: {
        type: Number,
        default: () => {
          return 1
        },
      },
      pageSize: {
        type: Number,
        default: () => {
          return 10
        },
      },
      total: {
        type: Number,
        default: () => {
          return 0
        },
      },
      isSizes: {
        type: Boolean,
        default: true,
      },
      pagesizes: {
        type: Array,
        default: () => [10, 20, 40, 60, 80, 100],
      },
      sizeChange: {
        type: Function,
        default: () => {},
      },
      currentChange: {
        type: Function,
        default: () => {},
      },
    },
    methods: {
      handleSizeChange() {
        this.sizeChange()
      },
      handleCurrentChange() {
        this.currentChange()
      }
    },
  }
</script>
