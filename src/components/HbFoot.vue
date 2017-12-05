<template>
    <div class="nc-footer">
      <div class="basic-flex top">
        <div class="left">
          <div class="title">网征</div>
          <div>您值得信赖的<br>权威征集平台</div>
        </div>
        <div class="right">
          <div class="wrap" v-for="data in footData">
            <div class="wrap-top">
              <i class="iconfont" :class="data.icon"></i>
              <span>{{data.name}}</span>
            </div>
            <div class="wrap-bottom" v-for="link in data.content">
              <a  :href="link.href" _target="blank">{{link.text}}</a>
            </div>
          </div>
          <div class="qrcode" v-for="(item, index) in qrcodeList" :key="index">
            <img src="../assets/images/home/qrcode.png" />
            <!--<div class="img" v-bind:style="{ backgroundImage: 'url(' + item.src + ')' }"></div>-->
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-info" :class="{'right-vline': index < basicInfo.length - 1}" v-for="(data, index) in basicInfo"><a href="javascript:void(0);">{{data.text}}</a></div>
      </div>
    </div>
</template>
<script type="text/babel">

import Lib from 'assets/js/Lib'

export default {
  data() {
    return {
      footData: [
        { name: '友情链接', icon: 'icon-youqinglianjie',
          content: [
            { text: '链接一', href: 'www.baidu.com'},
            { text: '链接二', href: 'www.baidu.com'},
            { text: '链接三', href: 'www.baidu.com'},
            {text: '饿了么官网', href: 'http://element.eleme.io/#/zh-CN/component/icon'}]},
        { name: '我要发布征集', icon: 'icon-bianji',
          content: [
            { text: '如何注册账户', href: 'www.baidu.com'},
            { text: '如何发布征集', href: 'http://element.eleme.io/#/zh-CN/component/icon'},
            { text: '征集注意事项', href: 'www.baidu.com'},
          ]
        },
        { name: '我要应征', icon: 'icon-moneybag',
          content: [
            { text: '如何参与应征', href: 'www.baidu.com'},
            { text: '如何设置店铺', href: 'http://element.eleme.io/#/zh-CN/component/icon'},
          ]
        },
        { name: '帮助中心', icon: 'icon-bangzhu',
          content: [
            { text: '如何注册', href: 'www.baidu.com'},
            { text: '忘记密码/修改密码', href: 'http://element.eleme.io/#/zh-CN/component/icon'},
            { text: '修改账号信息', href: 'www.baidu.com'},
          ]
        },
//        { name: 'APP下载', icon: 'el-icon-setting',
//          content: [
//            { text: 'Android下载', src: '../assets/images/logo.png'},
//            { text: 'IOS下载', src: '"../assets/images/logo.png'},
//          ]
//        },
      ],
      qrcodeList: [
        { src: '../assets/images/home/qrcode.png', name: '安卓手机下载' },
        { src: '../assets/images/home/qrcode.png', name: 'IOS手机下载' },
      ],
      basicInfo: [
        { text: '关于我们', href: 'www.baidu.com' },
        { text: '意见反馈', href: 'www.baidu.com' },
        { text: '法律申明', href: 'www.baidu.com' },
        { text: '诚聘英才', href: 'www.baidu.com' },
        { text: '联系我们', href: 'www.baidu.com' },
      ],
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .nc-footer {
    padding: 30px 0 10px 0
    box-sizing border-box
    background #ff6e1b
    color #fff
    border 1px solid #c8c7cd
    .basic-flex {
      margin 10px 0 30px 0
      display: flex
      flex-flow row nowrap
      justify-content: center
      align-items: center
      .left {
        min-width 350px
        text-align center
        .title {
          width 40px
          margin 0 auto
          position relative
          margin-bottom 10px
          font-size 20px
          &:after {
            position absolute
            left 0
            bottom -5px
            content ''
            width 40px
            height 2px
            background #fff
          }
        }
      }
      .right {
        display flex
        flex 1
        justify-content: center
        align-items: flex-start
        .wrap {
          position relative
          margin: 5px 30px
          min-width: 100px
          &:after {
            position absolute
            top 4px
            right -30px
            content ''
            width 1px
            height 130px
            background #fff
          }
          .wrap-top {
            padding-bottom 5px
          }
          .wrap-bottom {
            font-size 12px
            margin 6px 0
          }
        }
        .qrcode {
          font-size 12px
          margin 30px 20px
          img {
            widht 70px
            height 70px
            display block
          }
        }
      }
    }
    a {
      color #fff
    }
    .bottom {
      text-align center
      .bottom-info {
        display inline-block
        margin 0 10px
      }
    }
  }
  .right-vline {
    position relative
    &::after {
      position: absolute;
      top: 4px;
      content: "";
      display: inline-block;
      width: 1px;
      height: 12px;
      line-height: 12px;
      padding-left: 10px;
    }
  }
</style>
