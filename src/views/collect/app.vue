<template>
  <div class="contain">
    <nc-header activeIndex="2"></nc-header>
    <div class="main">
      <div class="search">
        <div class="search-top">
          <div>
            已选择条件：与<span class="selected">{{category}}</span>分类相关的征集,
            共<span class="selected">{{count}}</span>条</div>
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
        <searchMenu></searchMenu>
      </div>
    </div>
    <nc-footer></nc-footer>
    </div>
  </div>
</template>

<script type="text/babel">
  import Lib from 'assets/js/Lib'
  import searchMenu from 'components/search-menu.vue'

  export default {
    mixins: [Lib],
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
    created() {
//      this.$http({
//        method:'get',
//        url:'http://sh-images.oss-cn-hangzhou.aliyuncs.com/?max-keys=100',
//      }).then(function(res) {
//        console.log(res)
////          response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
//      });
//      http://sh-images.oss-cn-hangzhou.aliyuncs.com/?max-keys=100
    },
    methods: {
      handleIconClick(ev) {
        console.log(ev);
      }
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.main {
  height 100%
}
  .search {
    width 800px
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
