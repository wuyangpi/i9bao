<template>
  <div>
    <tablist></tablist>
    <div class="btn">
      <ul @click="onchoose($event)">
        <li>A</li>
        <li>B</li>
        <li>C</li>
      </ul>
    </div>
    <!--<div class="content" ref="content">-->
      <!--<div class="divclass div1">这是第一块</div>-->
      <!--<div class="divclass div2">这是第二块</div>-->
      <!--<div class="divclass div3">这是第三块</div>-->
    <!--</div>-->
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  ul {
    li {
      display inline-block
      width 100px
      height 30px
      border 1px solid #000000
    }
  }
  .content {
    height 500px
  }
  .divclass {
    width 90%;
    margin 0 auto
  }
  .div1 {
    height: 400px;
    background #000000
  }
  .div2 {
    height 300px;
    background #1c94f9
  }
  .div3 {
    height 300px;
    background #D1AD0A
  }
</style>
<script>
  import tablist from "src/components/tab-list.vue"

  export default {
    data() {
      return {
        msg:'hello vue'
      }
    },
    components: {
      tablist,
    },
    methods: {
      onchoose(e) {
        return
        const content = this.$refs.content
        let target = e.target.innerText
        let top = content.scrollTop
        if (target === 'A') {
          top = 0
        } else if (target === 'B'){
          top = 400
        } else {
          top = 600
        }
      }
    },
  }
</script>
