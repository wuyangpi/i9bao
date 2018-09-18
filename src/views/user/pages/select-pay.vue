<template>
  <div id="testpay">
    选择支付方式
    <el-form>
    <p v-if="tip > 0">打赏应征者{{tip}}元</p>
    <p v-else>支付金额：{{tip}}元</p>
      <el-radio-group class="paystyle" v-model="payStyle">
        <div class="pay-radio">
          <el-radio label="alipay">
            <img src="../../../assets/images/zhifubao.jpg" />
          </el-radio>
        </div>
        <div class="pay-radio">
          <el-radio label="ips">
            <img src="../../../assets/images/huanxun.jpg" />
          </el-radio>
        </div>
      </el-radio-group>
    <!--<input type="radio" value="alipay" name="payWay" id="alipay" /><label for="alipay">支付宝</label>-->
    <!--<input type="radio" value="ips" name="payWay" id="ipspay" /><label for="ipspay">环讯</label>-->
    <el-button type="primary" :disabled="isDisabled" class="submit-btn" @click="submit">支付</el-button>
  </el-form>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .paystyle {
    display block
    margin-top 5px
    .pay-radio {
      display inline-block
      margin 0 10px 10px
      img {
        width: 100px;
        vertical-align: middle;
      }
    }
  }
  .submit-btn {
    width: 200px;
  }
</style>
<script>
  export default{
    data() {
      return {
        msg:'支付宝，环讯',
        submitUrl: '/rest/pay/alipayToPay',  // 提交URL
        isDisabled: false, // false代表可以操作
	      tip: this.$route.query.tip,
        payStyle: 'alipay',
      }
    },
    
    created() {

   },
   methods: {
   /**
    * 提交按钮
    */
   submit() {
     this.isSubmit = true
     this.operate()
     this.confirm();
   },
   /**
    * 按钮开关
    */
   operate() {
     this.basic = {}
     this.detail = {}
     this.$emit('save')
   },
   getNowFormatDate() {
    var date = new Date();
    var seperator1 = "";
    var seperator2 = "";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + "" + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
    },
    /**
     * 确认提交
     */
    confirm() {
      const payway = this.payStyle
      const sid = this.$route.query.solutionId;
      this.submitUrl = `/rest/pay/${payway}ToPay`;
      let params = { solutionId: sid }
      if(this.tip > 0){
        this.submitUrl = `${this.submitUrl}More`
        params = { tip: this.tip, solutionId: sid  }
      }
      this.http.post(this.submitUrl, params).then(
        (res) => {
          this.isDisabled = false
          if (payway === 'alipay') {
            this.$message.success({ message: '正在跳转到支付宝页面......' || res.result   })
            var div = document.getElementById('testpay')
            div.innerHTML = res.message
            document.forms['punchout_form'].submit()
          } else if (payway == 'ips') {
            this.$message.error({ message: '环讯支付正在开发中' || res.result   })
          }
        }).catch( err => {
          this.isDisabled = false
          this.$message.error({ message: '支付失败' || err})
        })
    }
   }
  }


</script>
