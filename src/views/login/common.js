/**
 * 获取校验码的公共方法
 */
export default {
  data() {
    return {
      verticalText: '获取验证码',
      hadVertical: false, // 是否已经获取验证码，60到期重新获取
      reduceSec: 60,
    }
  },
  methods: {
    // 获得验证码
    getVerticalCode() {
      const _this = this
      let text = ''
      this.$refs.ruleForm.validateField('phone', (err) => {
        text = err
      })
      if (text === '') {
        this.http.post('/rest/common/sms', { phone: this.ruleForm.phone }).then((res) => {
          if (res.result === 1) {
            this.$message({
              message: '发送成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.message || '发送失败！',
              type: 'error'
            })
          }
        })
        if (!this.hadVertical) {
          _this.hadVertical = true
          this.verticalText = this.reduceSec + '秒'
          let time = setInterval(function () {
            _this.reduceSec--
            _this.verticalText = _this.reduceSec + '秒'
            if (_this.reduceSec <= 0) {
              _this.hadVertical = false
              _this.reduceSec = 60
              _this.verticalText = '获取验证码'
              clearInterval(time)
            }
          }, 1000)
        }
      }
    },
  }
}