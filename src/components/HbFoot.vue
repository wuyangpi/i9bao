<template>
    <div class="nc-footer">
      <div class="basic-flex top">
        <div class="wrap" v-for="data in footData">
          <div class="wrap-top">
            <i class="el-icon-share"></i>
            <span>{{data.name}}</span>
          </div>
          <div class="wrap-bottom" v-for="link in data.content">
            <a  :href="link.href" _target="blank">{{link.text}}</a>
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
        { name: '友情链接', icon: 'el-icon-share',
          content: [{ text: '链接一', href: 'www.baidu.com'}, {text: '饿了么官网', href: 'http://element.eleme.io/#/zh-CN/component/icon'}]},
        { name: '我要发布征集', icon: 'el-icon-information',
          content: [
            { text: '如何注册', href: 'www.baidu.com'},
            {text: '如何发布征集', href: 'http://element.eleme.io/#/zh-CN/component/icon'},
            { text: '发布征集注意事项', href: 'www.baidu.com'},
          ]
        },
        { name: '我要应征', icon: 'el-icon-information',
          content: [
            { text: '如何参与应征', href: 'www.baidu.com'},
            {text: '如何设置自已的店铺', href: 'http://element.eleme.io/#/zh-CN/component/icon'},
          ]
        },
        { name: '帮助中心', icon: 'el-icon-setting',
          content: [
            { text: '如何注册', href: 'www.baidu.com'},
            {text: '忘记密码/修改密码', href: 'http://element.eleme.io/#/zh-CN/component/icon'},
            { text: '修改账号信息', href: 'www.baidu.com'},
          ]
        },
        { name: 'APP下载', icon: 'el-icon-setting',
          content: [
            { text: 'Android下载', src: '../assets/images/logo.png'},
            { text: 'IOS下载', src: '"../assets/images/logo.png'},
          ]
        },
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
    padding: 30px 10px;
    box-sizing border-box
    background #eef1f6
    border 1px solid #c8c7cd
    .top {
      justify-content: space-around
      align-items: flex-start
      padding-bottom: 20px
      margin-bottom: 20px
      border-bottom: 1px solid #20a0ff
      .wrap {
        text-align center
        align-content: center
        .wrap-top {
          padding-bottom 12px
          border-bottom: 1px solid #20a0ff
        }
        .wrap-bottom {
          margin 12px 0
        }
      }
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
      border-right: 1px solid #20a0ff;
    }
  }
</style>
