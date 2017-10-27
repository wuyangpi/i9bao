<template>
  <el-pagination
    v-if="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    v-bind="$props"
    :layout="`->, total, prev, pager, next, slot,${isSizes ? ' sizes,': ' '}jumper`">
  </el-pagination>
</template>
<script>
  // layout="->, total, sizes, prev, pager, next, jumper,slot"
  export default {
    props: {
      'current-page': {
        type: Number,
        default: () => {
          return 1
        },
      },
      'page-size': {
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
        default: true,
      },
      'page-sizes': {
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
      handleSizeChange(arg) {
        this.sizeChange(arg)
      },
      handleCurrentChange(arg) {
        this.currentChange(arg)
      }
    },
  }
</script>
