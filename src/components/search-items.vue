<template>
  <div class="search">
    <div class="search-top">
      <div>
        <span v-if="!all">已选择条件：与<span class="selected">{{category}}</span>分类相关的征集,</span>
        共<span class="selected">{{count}}</span>条
      </div>
      <div>
        <el-input
          class="w200 marr10"
          :placeholder="placeholderName"
          icon="search"
          v-model="search.name">
        </el-input>
        <el-button type="primary" class="w100 marr10" icon="search">查询</el-button>
      </div>
    </div>
    <searchMenu :all="all" :menuList="menuList"></searchMenu>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .search {
    width 100%
    margin 0 auto
  }
  .search-top {
  display flex
  flex-flow row nowrap
  justify-content space-between
  align-items center
  margin 10px 0
  .selected {
    color #ff6e1e
  }
  }
  .w200 {
    width 200px
  }
  .w100 {
    width 100px
  }
  .marr10 {
    margin-right 10px
  }
</style>
<script>
  import searchMenu from './search-menu.vue'

  export default {
    props: {
      all: [Boolean],
      menuList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        category: '数码产品',
        count:9999,
        placeholderName: '请输入征集名称',
        search: {
          name: '',
        },
      }
    },
    components: {
      searchMenu,
    },
  }
</script>
