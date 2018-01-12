export default {
  methods: {
    getCategory(prop, val) {
      let params = { belong: 'demand' }
      if (val) {
        params.belong = val
      }
      this.http.post('/rest/common/category/listByBelong', params).then(
        (res) => {
          if (res.result === 1) {
            this[prop] = res.data.categories
          }
        }).catch(err => {
        this.$message.error({ message: err || '出错了' })
      })
    },
  }
}