<template>
  <div class="menu-contain" :style="{'z-index': menuZdex }">
    <div class="title">
      <span>{{menuTitle}}</span>
    </div>
    <div rel="menulist">
      <ul class="menu-list" @mouseover="showMenu($event)"  @mouseout="hideMenu($event)">
        <li v-for="item in menuList" :key="item.id" :data-id="item.id">{{item.name}}({{item.amount}})</li>
      </ul>
      <div class="wrap" v-show="isSecond && isActive" @mouseover="isActive = true" @mouseout="isActive = false" >
        <ul>
          <li v-for="data in menuList[activeIndex].list">
            <a class="wrap-title">{{data.title}}<i class="iconfont icon-dayuhao"></i></a>
            <div class="content">
              <a v-for="list in data.content" href="javascript: void(0)">{{list.value}}</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--<ul v-if="isSecond">-->
      <!--<li v-for="item in model">-->
        <!--<div @click='toggle'>-->
          <!--<i v-if='isFolder' class="fa" :class="[open?'fa-folder-open':'fa-folder']">{{item.data.menuName}}</i>-->
          <!--&lt;!&ndash;isFolder判断是否存在子级改变图标&ndash;&gt;-->
          <!--<i v-if='!isFolder' class="fa fa-file-text"></i>-->
        <!--</div>-->
        <!--<ul>-->
          <!--&lt;!&ndash;<div v-for='cel in item.childTreeNode'>{{cel}}</div>&ndash;&gt;-->
          <!--&lt;!&ndash;<items v-if="item.childTreeNode.length > 0" v-model='item.childTreeNode'></items>&ndash;&gt;-->
        <!--</ul>-->
      <!--</li>-->
    <!--</ul>-->
  </div>
</template>
<script type="text/babel">
  import EventListener from 'src/utils/EventListener.js'
  export default {
    props: {
      /**
       * 目前选中的菜单
       */
      menuTitle: {
        type: String,
        default: '商家企业类',
      },
      menuZdex: {
        type: Number,
        default: 100,
     },
      isSecond: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        activeIndex: '0',
        isActive: false,
        menuList: [
          { id: 100,
            name: '手机/运营商/数码',
            amount: 5000,
            list: [
              { title: '手机产品',
                content: [ { id: 11, value: '诺基亚' },{ id: 12, value: 'vivo' },{ id: 13, value: 'oppo' },{ id: 14, value: '苹果' },
                  { id: 11, value: '华为' },{ id: 11, value: '灯红酒绿' },{ id: 11, value: '师傅的师傅' },{ id: 11, value: '是否' },
                ]},
              { title: '手机配件',
                content: [ { id: 11, value: '诺基亚' },{ id: 12, value: 'vivo' },{ id: 13, value: 'oppo' },{ id: 14, value: '苹果' },
                  { id: 11, value: '华为' },{ id: 11, value: '灯红酒绿' },{ id: 11, value: '师傅的师傅' },{ id: 11, value: '是否' },
                ]},
              { title: '属马报名',
                content: [ { id: 11, value: '诺基亚' },{ id: 12, value: 'vivo' },{ id: 13, value: 'oppo' },{ id: 14, value: '苹果' },
                  { id: 11, value: '华为' },{ id: 11, value: '灯红酒绿' },{ id: 11, value: '师傅的师傅' },{ id: 11, value: '是否' },
                ]},
              { title: '了建立健全',
                content: [ { id: 11, value: '诺基亚' },{ id: 12, value: 'vivo' },{ id: 13, value: 'oppo' },{ id: 14, value: '苹果' },
                  { id: 11, value: '华为' },{ id: 11, value: '灯红酒绿' },{ id: 11, value: '师傅的师傅' },{ id: 11, value: '是否' },
                ]},
              { title: '服务产品',
                content: [ { id: 11, value: '延保服务' },{ id: 12, value: '上门安装' },{ id: 13, value: '养老金' },{ id: 14, value: '爽肤水' },
                ]},
            ],
          },
          { name: '电脑/办公', amount: 5000, id: 110,
            list: [
              { title: '手机产品',
                content: [ { id: 11, value: '诺基亚' },{ id: 12, value: 'vivo' },{ id: 13, value: 'oppo' },{ id: 14, value: '苹果' },
                  { id: 11, value: '华为' },{ id: 11, value: '灯红酒绿' },{ id: 11, value: '师傅的师傅' },{ id: 11, value: '是否' },
                ]}
            ]},
          { name: '家具/家装/厨具', amount: 5000, id: 120,},
          { name: '男装/女装/童装/内衣', amount: 5000, id: 130,},
          { name: '美妆/个护/宠物', amount: 5000, id: 140,},
          { name: '女鞋/箱包/钟表/珠宝', amount: 5000, id: 150,},
          { name: '食品/酒类/生鲜/特产', amount: 5000, id: 160,},
          { name: '食品/酒类/生鲜/特产', amount: 5000, id: 170,},
          { name: '食品/酒类/生鲜/特产', amount: 5000, id: 180,},
          { name: '食品/酒类/生鲜/特产', amount: 5000, id: 190,},
          { name: '食品/酒类/生鲜/特产', amount: 5000, id: 200,},
          { name: '食品/酒类/生鲜/特产', amount: 5000, id: 210, },
        ],
        contentEl: '',
      }
    },
//    mounted() {
//      let el = this.contentEl = this.$refs.menulist
//      this._closeListener = EventListener.listen(window, 'mouseover', (e) => {
//        debugger
//        if (!((this.$ref && this.$ref.contains(e.target))
//          || (el && el.contains(e.target)))) {
//          this.isActive = false
//        }
//      })
//    },
    beforeDestroy() {
      if (this._closeListener) this._closeListener.remove()
    },
    methods: {
      /**
       * 鼠标移入时触发，将二级子菜单展现
       */
      showMenu(e) {
        this.isActive = false
        for (let i=0; i < this.menuList.length; i++) {
          if (`${e.target.dataset.id}` === `${this.menuList[i].id}`) {
            this.activeIndex = i
            this.isActive = true
            break
          }
        }
      },
      hideMenu() {
        this.isActive = false
      }
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .menu-contain {
    font-size 12px
    width 190px
    position relative
    top 0
    margin-right 20px
    .title {
      width 100%
      height 40px
      line-height 40px
      background: #ff5f03
      color #fff
      font-size 16px
      padding-left 20px
      position relative
      &::after {
        position absolute
        content ''
        top 7px
        left 10px
        width 2px
        height 70%
        background #fff
        border-radius 2px
      }
    }
    .menu-list {
      li {
        box-sizing border-box
        width 100%
        height 35px
        line-height 35px
        padding-left 20px
        background rgba(244,243,242,0.4)
        border 1px solid #f1f0ef
        cursor pointer
        &:hover {
          background #ff7f35
          color #fff
        }
      }
    }
    .wrap {
      position absolute
      top 40px
      left 190px
      width 700px
      background #fff
      border 1px solid #cccccc
      border-left none
      box-shadow 2px 0 5px rgba(0,0,0,.3)
      .icon-dayuhao {
        font-weight 600
        font-size 12px
        padding 0 5px
      }
      li {
        display flex
        flex-flow row nowrap
        align-items center
        margin 10px 0
        cursor pointer
        .wrap-title {
          text-align right
          width 110px
          &:hover,&:active,&:visited,&:focus {
            color #ff7f35
          }
        }
        .content {
          margin-left 10px
          a {
            display inline-block
            height 20px
            line-height 20px
            padding 0 10px
            margin 5px 0
            border-left 1px solid #e0e0e0
            &:hover,&:active,&:visited,&:focus {
              color #ff7f35
            }
          }
        }
      }
    }
  }
</style>
