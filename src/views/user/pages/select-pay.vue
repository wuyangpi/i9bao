<template>
  <div id="testpay">
    选择支付方式
    <p>
    <el-form ref="ruleForm">
    <p v-if="tip > 0">打赏应征者{{tip}}元</p>
  <input type="radio" value="alipay" name="payWay" id="alipay" /><label for="alipay">支付宝</label>
  <input type="radio" value="ips" name="payWay" id="ipspay" /><label for="ipspay">环讯</label>
  <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="submit">提交</el-button>
  </el-form>
  </p>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<script>
  export default{
    data() {
      return {
        msg:'支付宝，环讯',
        submitUrl: '/rest/pay/alipayToPay',  // 提交URL
        isDisabled: false, // false代表可以操作
	tip: this.$route.query.tip,
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
	var radio = document.getElementsByName("payWay");
	var payway = "alipay";
	for (var i=0; i<radio.length; i++) {
		if (radio[i].checked) {
			payway = radio[i].value;
		}
	}
      this.submitUrl = '/rest/pay/' + payway + 'ToPay'; 
      let params;
      var sid = this.$route.query.solutionId;
      params = Object.assign({ solutionId: sid });
      
      if(this.tip > 0){
	this.submitUrl += 'More'; 
	params = Object.assign({ tip: this.tip,solutionId: sid  });
      }
      this.http.post(this.submitUrl, params).then(
        (res) => {
          this.isDisabled = false
	  if(payway == 'alipay'){
		this.$message.success({ message: '正在跳转到支付宝页面......' || res.result   })
		var div = document.getElementById('testpay')
		div.innerHTML = res.message
		document.forms[0].submit()
	  }else if(payway == 'ips'){
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
