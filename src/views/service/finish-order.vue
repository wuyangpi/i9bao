<template>
  <div class="order">
    <h1>支付{{status}}</h1>
    <p v-for="(item, index) in items" :class="{ 'mart10': item.value === 'payStyle' }">
      <span class="title">{{item.label}}：</span>
      <span>{{list[item.value]}}</span>
    </p>
    <div class="btn-set">
      <el-button type="primary" class="save-btn" @click="continueBuy">继续购买</el-button>
      <el-button type="primary" class="save-btn" @click="backHome">返回首页</el-button>
    </div>
  </div>
</template>
<style lang="stylus">
  .paystyle {
    .el-radio__input {
      vertical-align top
    }
  }
</style>
<style lang="stylus" scoped>
  .order {
    h1 {
      text-align center
      font-size 50px
      font-weight 700
    }
    width 500px
    margin 50px auto
    .mart10 {
      margin 30px 0 10px 0
    }
    .line-block {
      display inline-block
    }
    p {
      margin 10px 0
      padding-left 100px
    }
    .title {
      display inline-block
      text-align right
      width 100px
      font-weight 700
    }
    .btn-set {
      text-align: center;
      width: 100%
      padding: 30px 0
      .save-btn, .cancel-btn {
        width: 150px;
      }
    }
  }
</style>
<script>
  export default  {
    data() {
      return {
        status: '成功',
        list: {
          code: 'zgwz20150202156',
          goods: '女神套装',
          buyNum: 1,
          realPrice: 5000.00,
          address: 'jljjl辣椒辣椒经济辣椒辣椒了ljljll',
          people: '范勇',
        },
        items: [
          { label: '订单编号', value: 'code', },
          { label: '商品名称', value: 'goods', },
          { label: '数量', value: 'buyNum', },
          { label: '实付款', value: 'realPrice', },
          { label: '收货地址', value: 'address', },
          { label: '收货人', value: 'people', },
        ],
      }
    },
    methods: {
      continueBuy() {
        this.$router.push({ path: '/' })
      },
      backHome() {
        window.location = '/home'
      },
    },
  }
</script>