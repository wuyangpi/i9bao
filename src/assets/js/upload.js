/**
 * 封装获取阿里云 aliOSS client对象的方法
 */
export default {
  methods: {
    async getClient(catelog, key) {
      let ossclient = null
      await this.http.post('/rest/oss/sts', {resources: JSON.stringify([catelog])}).then(res => {
        if (res.result === 1) {
          const resDatas = res.data
          ossclient = {
            region: resDatas.region,
            accessKeyId: resDatas.accessKeyId,
            accessKeySecret: resDatas.accessKeySecret,
            stsToken: resDatas.stsToken,
            bucket: resDatas.bucket,
          }
        }
      }).catch(err => {
        this.$message.error(err)
      })
      this[key] = ossclient
    },
  },
}
