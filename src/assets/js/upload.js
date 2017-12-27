/**
 * 封装获取阿里云 aliOSS client对象的方法
 */
export default {
  methods: {
    getClient(catelog) {
      this.http.post('/rest/oss/sts', {resources: JSON.stringify([catelog])}).then(res => {
        if (res.result === 1) {
          const resDatas = res.data
          const ossclient = new OSS.Wrapper({
            region: resDatas.region,
            accessKeyId: resDatas.accessKeyId,
            accessKeySecret: resDatas.accessKeySecret,
            stsToken: resDatas.stsToken,
            bucket: resDatas.bucket,
          })
          return ossclient
        }
      }).catch(err => {
        this.$message.error(err)
        return null
      })
    },
  },
}
