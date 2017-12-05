<template>
  <div class="contain">
    <nc-header activeIndex="3"></nc-header>
    <div class="main">
      </div>
      <nc-footer></nc-footer>
    </div>
  </div>
</template>

<script type="text/babel">
  import Lib from 'assets/js/Lib'
  import ncMenu from 'components/menu.vue'
  import areaTitle from 'components/area-title.vue'
  import tabList from 'components/tab-list.vue'

  export default {
    mixins: [Lib],
    data () {
      return {
      }
    },
    components: {
      ncMenu,
      areaTitle,
      tabList,
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

</style>
