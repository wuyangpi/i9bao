<template>
  <div>
    <div class="tabs">
      <el-tabs v-model="activeName" class="tab-item">
        <el-tab-pane label="收藏的征集" name="collect"></el-tab-pane>
        <el-tab-pane label="收藏的服务" name="service"></el-tab-pane>
        <el-tab-pane label="收藏的店铺" name="shop"></el-tab-pane>
      </el-tabs>
    </div>
    <collect v-show="activeName === 'collect'"></collect>
    <service v-if="activeName === 'service'"></service>
    <shop v-if="activeName === 'shop'"></shop>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<script>
  import collect from './collect.vue'
  import service from './service.vue'
  import shop from './shop.vue'

  export default{
    data() {
      return {
        activeName: 'collect'
      }
    },
    components: {
      collect,
      service,
      shop,
    },
  }
</script>

