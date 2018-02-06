<template>
  <div class="contain">
    <nc-header activeIndex="6"></nc-header>
    <div class="main">
      <div class="header">
        <p class="title">“网征” 介绍</p>
        <p class="content">“网征”是一个专业的个性定制、征集发布平台；其特色为：“精准定位、信息匹配，让我知道你要、让你知道我有”。</p>
      </div>
      <div class="basic">
        <div class="main">
          <div class="jianjie">
            <p class="about-us">关于我们</p>
            <div>
              <p class="introduce">中文名：网征 </p>
              <p class="introduce">外文名：Netcollect</p>
            </div>
            <div>
              <p class="introduce">释义：网络征集、搜集 </p>
              <p class="introduce">域名网址：wangluozhengji.com</p>
            </div>

          </div>
          <div class="xitong">
            <p class="start">项目简介：</p>
            <p class="content">网征是一个帮助供需双方匹配个性化、定制化服务的平台；个性定制需求者，既可以到平台发布需求，也可以在平台上直接找到相关的定制公司；定制公司以提供个性产品、优质服务为理念，既可以在平台展示公司形象、相关产品，也可以在平台寻找发布需求的客户。</p>
            <p class="start">产生背景：</p>
            <p class="content">个性化需求的时代，消费者开始引导供应链。消费关系是：消费者需要什么，生产者就得生产什么，这是一个逆向生产的过程。在消费者的主动权变大同时，网征平台积极为消费者个性需求补充了另一种购物方式。</p>
            <p class="start">网购和网征的区别及共同点：</p>
            <p class="content" style="margin-bottom: 10px;">“网购”是商家把产品展示于网络上，消费者根据自己的需求进行购买。（优点：消费成本低；缺点：大众化、商家利润透明、恶性竞争）</p>
            <p class="content" style="margin-bottom: 10px;">“网征”是消费者把需求展示于网络上寻找服务，商家根据其需求量身定做。（优点：个性化、服务到位；缺点：由于商家提供个性化优质服务，消费成本相对高）</p>
            <p class="content" style="padding-bottom: 50px;margin-bottom: 0;">共同点：网购或网征都是由消费者进行筛选。</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import Lib from 'assets/js/Lib'

  export default {
    mixins: [Lib],
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  *{
    margin: 0;
    padding: 0;
    font-family: arial;
  }
  body {
    margin: 0 auto;
  }
  .header {
    background: url(bnr1.jpg) no-repeat center top;
    padding-top: 20px;
    text-align: center;
    background-position: center center;
    min-height: 490px;
    width: 100%;
    -webkit-background-size: 100%;
    -moz-background-size: 100%;
    -o-background-size: 100%;
    background-size: 100%;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  .header .title {
    font-size: 55px;
    text-align: center;
    font-weight: bold;
    letter-spacing: 15px;
    padding: 90px 0;
    text-shadow: -3px 4px #000;
    color: #fff;
  }
  .header .content {
    font-size: 26px;
    margin: 0 auto;
    max-width: 1000px;
    padding: 0 8px 15px 10px;
    line-height: 50px;
    text-indent: 32px;
    font-weight: 400;
    color: #fff;
  }
  .basic {
    background-color: #f9f9f9;
  }
  .basic .main {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 40px;
  }
  .basic:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    clear: both;
  }
  .basic .main .jianjie {
    background: rgba(73, 151, 250, 0.11);
    padding: 10px 10px 20px;
  }
  .basic .main .jianjie:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    clear: both;
  }
  .basic .main .jianjie .about-us{
    color: #a0ba73;
    font-size: 34px;
    text-align: center;
    font-weight: 600;
    letter-spacing: 8px;
  }
  .basic .main .jianjie div {
    float: left;
    width: 50%;
  }
  .basic .main .jianjie div .introduce {
    line-height: 38px;
    padding-left: 150px;
    font-size: 18px;
  }
  .xitong .start {
    font-size: 22px;
    padding: 20px 8px 10px 18px;
    line-height: 40px;
    letter-spacing: 4px;
    font-weight: 400;
  }
  .xitong .content {
    font-size: 18px;
    line-height: 36px;
    margin-bottom: 20px;
    text-indent: 36px;
  }
  @media (max-width: 848px){
    .basic .main .jianjie div .introduce {
      padding-left: 80px;
    }
  }
  @media (max-width: 705px){
    .header .title {
      font-size: 46px;
    }
    .header .content {
      font-size: 24px;
      text-indent: 48px;
    }
    .basic .main .jianjie div .introduce {
      padding-left: 40px;
    }
  }
  @media (max-width: 620px){
    .header .title {
      font-size: 46px;
    }
    .header .content {
      font-size: 24px;
      text-indent: 48px;
    }
    .basic .main .jianjie div .introduce {
      padding-left: 0;
    }
  }
  .contain {
    width 100%
    height 100%
    min-height 100%
    display: -webkit-flex
    display: flex
    flex-flow:column nowrap
    justify-content: flex-start
    .main {
      flex 1
      position relative
      display: -webkit-flex
      display: flex
      flex-flow:column nowrap
      justify-content: flex-start
      .main-content {
        flex: 1
        margin-bottom 15px
      }
    }
  }
</style>
