<template>
  <div class="contain">
    <nc-header activeIndex="3"></nc-header>
    <div class="main">
      <card></card>
    </div>
    <nc-footer></nc-footer>
  </div>
</template>

<script type="text/babel">
  import Lib from 'assets/js/Lib'
  import ncMenu from 'components/menu.vue'
  import card from 'components/card.vue'

  export default {
    mixins: [Lib],
    data () {
      return {
      }
    },
    components: {
      ncMenu,
      card,
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
    overflow hidden
  }
</style>
