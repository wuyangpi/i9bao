<template>
  <div>
    <div class="info">
      <div class="shop-set">
        <div class="title">账户信息</div>
        <div class="content">
          <div class="item-contain" v-for="(item, index) in items" :class="{ 'mart10': index === 1}">
            <div>{{item.label}}：</div>
            <div v-if="item.value === 'price'"><span class="high">{{list[item.value]}}</span></div>
            <el-radio-group class="line-block paystyle" v-if="index === 1" v-model="list.card">
              <div class="pay-radio">
                <el-radio :label="0">
                  <img src="../../../assets/images/zhifubao.jpg" />
                </el-radio>
              </div>
              <div class="pay-radio">
                <el-radio :label="1">
                  <img src="../../../assets/images/weixin.jpg" />
                </el-radio>
              </div>
              <div class="pay-radio">
                <el-radio :label="2">
                  <img src="../../../assets/images/yinlian.jpg" />
                </el-radio>
              </div>
            </el-radio-group>
            <div class="vertical" v-if="index === 2">
              <el-input class="vertical-input" v-model="list.checkcode" placeholder="请输入验证码"></el-input>
              <div class="vertical-btn" :class="{ 'vertical-btn-active' :hadVertical }" @click="getVerticalCode">{{verticalText}}</div>
            </div>
            <span class="line-block password" v-if="index === 3">
              <span class="sperate-border" v-for="i in bordernum" :style="{ 'left': i*34 + 'px' }"></span>
              <input type="password" :value="list[item.value]" maxlength="6"/>
            </span>
            <span class="line-block password" v-if="index === items.length - 1">
              <span class="sperate-border" v-for="i in bordernum" :style="{ 'left': i*34 + 'px' }"></span>
              <input type="password" :value="list[item.value]" maxlength="6"/>
            </span>
          </div>
        </div>
      </div>
      <div class="btn-set">
        <el-button type="primary" :disabled="isDisabled" class="save-btn">提交</el-button>
        <el-button type="primary" :disabled="isDisabled" class="save-btn" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="stylus">
  .vertical-input {
    .el-input__inner {
      height 33px
      line-height 33px
    }
  }
  .paystyle {
    .el-radio__input {
      vertical-align top
    }
  }
</style>
<style lang="stylus" scoped>
  .info {
    .shop-set {
      width 900px
      margin 0 auto
      border 1px solid #eeeeee
    }
    .title {
      width 100%
      height 36px
      line-height 36px
      background #eee
      padding-left 20px
      border-bottom  1px solid #eee
    }
    .content {
      padding 25px
      padding-top 0
    }
    .item-contain {
      margin 30px 0
      display flex
      flex-flow row nowrap
      justify-content flex-start
    }
    .vertical {
      position relative
      .vertical-input {
        width 170px
        margin-top -6px
      }
      .vertical-btn {
        position absolute
        top -6px
        right -97px
        width 100px
        height 33px
        line-height 33px
        text-align center
        background #fe6e1b
        color #fff
        cursor pointer
      }
      .vertical-btn-active {
        color #fff
        background #ddd
      }
    }
  }
  .info {
    padding-left 20px
    .mart10 {
      margin 30px 0
    }
    .line-block {
      display inline-block
    }
    img {
      width 200px
      height 50px
      border 1px solid
      margin-top -15px
    }
    .paystyle {
      margin-top 5px
      .pay-radio {
        display inline-block
        margin 0 10px 10px
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
        verticalText: '获取验证码',
        hadVertical: false, // 是否已经获取验证码，60到期重新获取
        reduceSec: 60,
        list: {
          price: 5000.00,
          card: 1,
          checkcode: '',
          paypass: '',
          paypassAgain: '',
        },
        items: [
          { label: '账户余额', value: 'price', },
          { label: '银行卡', value: 'card', },
          { label: '手机验证码', value: 'checkcode', },
          { label: '设置密码', value: 'paypass', },
          { label: '确认密码', value: 'paypassAgain', },
        ],
        paystyles: [
          { img: require('../../../assets/images/zhifubao.jpg'), value: 0, },
          { img: require('../../../assets/images/weixin.jpg'), value: 1, },
          { img: require('../../../assets/images/yinlian.jpg'), value: 2, },
        ],
      }
    },
    methods: {
      getVerticalCode() {
        const _this = this
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