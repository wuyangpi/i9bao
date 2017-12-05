<template>
  <div>
    <div class="search-menu">
      <div class="item-menu" v-for="(data, pindex) in menuList" :key="data.id">
        <div class="name">{{data.name}}</div>
        <ul class="list" @click="changeSelect($event, pindex)">
          <li v-for="(item ,index) in data.list" :class="{'selected': data.selectedIndex === index}">{{item.label}}</li>
        </ul>
      </div>
    </div>
    <div class="item-menu multi-search">
      <div class="name">{{multiItem.name}}</div>
      <ul class="list" @click="changeMultSelect($event)">
        <li v-for="(item ,index) in multiItem.list" :class="{'selected': multiItem.selectedIndex === index}">{{item.label}}</li>
      </ul>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    props: {

    },
    data() {
      return {
        menuList: [
          { id: 100,
            name: '关键字',
            selectedIndex: -1,
            list: [
              { label: '数码', value: '11' },
              { label: '设计', value: '11' },
              { label: '开发', value: '11' },
              { label: '电子', value: '11' },
              { label: '服装', value: '11' },
              { label: '美食', value: '11' },
            ]
          },
          { id: 101,
            name: '所在地区',
            selectedIndex: -1,
            list: [
              { label: '北京', value: '11' },
              { label: '上海', value: '11' },
              { label: '华北', value: '11' },
              { label: '华东', value: '11' },
              { label: '华西', value: '11' },
              { label: '西南', value: '11' },
            ]
          },
          { id: 102,
            name: '发布时间',
            selectedIndex: -1,
            list: [
              { label: '一周以内', value: '11' },
              { label: '一月以内', value: '11' },
              { label: '三月以内', value: '11' },
              { label: '半年以内', value: '11' },
              { label: '一年以内', value: '11' },
              { label: '一年以上', value: '11' },
            ]
          },
          { id: 103,
            name: '征集价格',
            selectedIndex: -1,
            list: [
              { label: '免费', value: '11' },
              { label: '0-50元', value: '11' },
              { label: '50-100元', value: '11' },
              { label: '100-500元', value: '11' },
              { label: '500-1000元', value: '11' },
              { label: '1000以上', value: '11' },
            ]
          },
          { id: 104,
            name: '其他指标',
            selectedIndex: -1,
            list: [
              { label: '指标一', value: '11' },
              { label: '指标二', value: '11' },
              { label: '指标三', value: '11' },
              { label: '指标四', value: '11' },
              { label: '指标五', value: '11' },
              { label: '指标六', value: '11' },
            ]
          },
        ],
        multiItem:
          { id: 105,
            name: '综合排序',
            selectedIndex: -1,
            list: [
              { label: '最新', value: '11' },
              { label: '热搜度', value: '11' },
              { label: '价格', value: '11' },
            ]
          },
      }
    },
    methods: {
      /**
       * 选中事件
       * @param {Object} e 当前的事件对象
       * @param {number} index 操作的是哪一行数据
       */
      changeSelect(e, index) {
         this.menuList[index].selectedIndex= this.selectedLine(e)
      },
      /**
       * 选中事件
       * @param {Object} e 当前的事件对象
       */
      changeMultSelect(e) {
        this.multiItem.selectedIndex= this.selectedLine(e)
      },
      /**
       * 选中的是第几行
       * @param {Object} e 当前的事件对象
       * @return {number} 第几行
       */
      selectedLine(e) {
        const parent = e.currentTarget.childNodes
        const selectedChild = e.target
        let selectedIndex // 选中的index
        for (let i = 0; i < parent.length; i++) {
          if (parent[i] === selectedChild) {
            selectedIndex = i
            break
          }
        }
        return selectedIndex
      },
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .search-menu {
    width 800px
    border 1px solid #ccc
    border-bottom-width 0
  }
  .item-menu {
    width 100%
    display flex
    align-items center
    cursor pointer
    border-bottom 1px solid #ccc
    .name {
      width 90px
      padding 10px
      border-right 1px solid #ccc
    }
    .list {
      flex 1
      li {
        width 80px
        padding 10px
        display inline-block
        &.selected {
          color #ff6e1e
          font-weight 500
        }
      }
    }
  }
  .multi-search {
    border none
    color #ff6e1e
    .name {
      border 1px solid #ccc
      border-top none
    }
    .list {
      li {
        border-right 1px solid #ccc
        border-bottom 1px solid #ccc
        text-align center
        &.selected {
          color #fff
          background #ff6e1e
        }
      }
    }
  }
</style>
