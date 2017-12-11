<template>
  <div class="order">
    <p v-for="(item, index) in items" :class="{ 'mart10': item.value === 'payStyle' }">
      <span class="title">{{item.label}}：</span>
      <span v-if="item.value !== 'payStyle' && item.value !== 'paypass'">{{list[item.value]}}</span>
      <span class="line-block password" v-if="index === items.length - 1">
        <span class="sperate-border" v-for="i in bordernum" :style="{ 'left': i*34 + 'px' }"></span>
        <input type="password" :value="list[item.value]" maxlength="6"/>
      </span>
      <!-- -if="item.value === 'payStyle'"-->
      <el-radio-group class="line-block paystyle" v-if="index === items.length - 2" v-model="list.payStyle">
        <div class="pay-radio">
          <el-radio :label="0">
            <img src="../../assets/images/zhifubao.jpg" />
          </el-radio>
        </div>
        <div class="pay-radio">
          <el-radio :label="1">
            <img src="../../assets/images/weixin.jpg" />
          </el-radio>
        </div>
        <div class="pay-radio">
          <el-radio :label="2">
            <img src="../../assets/images/yinlian.jpg" />
          </el-radio>
        </div>
      </el-radio-group>
    </p>
    <div class="btn-set">
      <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="submit">确认支付</el-button>
      <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="cancel">取消</el-button>
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
    width 500px
    margin 50px auto
    padding-left 20px
    .mart10 {
      margin 30px 0 10px 0
    }
    .line-block {
      display inline-block
    }
    img {
      width 200px
      height 70px
      border 1px solid
      margin-top -15px
    }
    p {
      margin 10px 0
    }
    .title {
      display inline-block
      text-align right
      width 100px
      font-weight 700
    }
    .paystyle {
      vertical-align top
      margin-top 5px
      .pay-radio {
        margin-bottom 20px
      }
    }
    .password {
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 200px
      .sperate-border {
        display: inline-block;
        position: absolute;
        top 5px
        width 1px
        height 20px
        background #ccc
        border none
      }
      input {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #d8dce5;
        box-sizing: border-box;
        color: #5a5e66;
        display: inline-block;
        font-size: inherit;
        padding-left 10px
        height: 30px;
        line-height: 1;
        outline: none;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;
        letter-spacing 28px
      }
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
        isDisabled: false,
        bordernum: 5,
        list: {
          code: 'zgwz20150202156',
          goods: '女神套装',
          receive: '提供服务的用户',
          pay: '需要服务的用户',
          price: 5000.00,
          discount: 0.00,
          realPrice: 5000.00,
          payStyle: 1,
          paypass: '',
        },
        items: [
          { label: '订单编号', value: 'code', },
          { label: '购买商品', value: 'goods', },
          { label: '收款方', value: 'receive', },
          { label: '付款方', value: 'pay', },
          { label: '需付金额', value: 'price', },
          { label: '优惠金额', value: 'discount', },
          { label: '实付金额', value: 'realPrice', },
          { label: '付款方式', value: 'payStyle', },
          { label: '付款密码', value: 'paypass', },
        ],
        paystyles: [
          { img: require('../../assets/images/zhifubao.jpg'), value: 0, },
          { img: require('../../assets/images/weixin.jpg'), value: 1, },
          { img: require('../../assets/images/yinlian.jpg'), value: 2, },
        ],
      }
    },
    methods: {
      submit() {
        this.$router.push({ path: '/payed' })
      },
      cancel() {
        this.$confirm('确认取消支付吗？', '提示', {
          confirmButtonText: '离开',
          cancelButtonText: '留在此页',
        }).then(() => {
          history.go(-1)
        })
      },
    },
  }
</script>