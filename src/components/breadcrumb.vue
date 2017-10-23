<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in itemBread" :to="{ path: item.link }">{{item.title}}</el-breadcrumb-item>
    <el-breadcrumb-item >{{title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
  export default{
    data(){
      return{
        title: '这个页面', // 这个页面的标题
        itemBread: [],
      }
    },
    watch: {
      $route() {
        this.buildItems()
      }
    },
    created() {
      this.buildItems()
    },
    methods: {
      buildItems() {
        if (this.$route) {
          const {title , breadcrumb} = this.$route.meta
          this.title = title
          this.itemBread = breadcrumb.slice()
        }
      },
    },
  }
</script>
