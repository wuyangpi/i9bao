<template>
  <div>
    <div class="selected">
      <div class="card" v-for="(items, key) in selectedItems">
        {{key}}: {{items}}
        <i class="el-icon-circle-close-outline deleteIcon" @click="deleteSelected(key)"></i></h4>
      </div>
    </div>
    <div class="search-menu">
      <div class="item-menu" v-for="(data, pindex) in menuItemList" :key="data.id">
        <div class="name">{{data.name}}</div>
        <ul class="list" @click="changeSelect($event, pindex)">
          <li v-for="(item ,index) in data.list"
              :key="data.id"
              :data-id="item.id"
              :data-name="item.name"
              :class="{'selected': data.selectedIndex === index}">{{item.name}}</li>
        </ul>
        <!--<a href="javascript:;" class="more">更多</a>-->
      </div>
    </div>
    <div class="item-menu multi-search" v-if="!all">
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
      all: [Boolean],
      menuList: {
        type: Array,
        default: []
      }
    },
    watch: {
      menuList(val) {
        if (val.length > 0) {
          this.getList(val)
          this.menuItemList = [this.menu1, this.menu2, this.menu3]
        }
      },
    },
    data() {
      return {
        menu1: {},
        menu2: {},
        menu3: {},
        selectedItems: {},
        menuItemList: [],
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
    created() {
      if (this.menuList[0].name) {
        this.menuItemList = this.menuList
      }
    },
    methods: {
      /**
       * 删除选中项
       */
      deleteSelected(key) {
        this.$delete(this.selectedItems, key)
        const len = this.menuItemList.length
        for (let i = 0; i < len; i++) {
          const data = this.menuItemList[i]
          if (data.name === key) {
            data.selectedIndex = -1
            this.$emit('searchItem', data.key, '')
            break
          }
        }
      },
      getList(val) {
        for (let i = 0; i < val.length; i++) {
          const objItem = val[i]
          const objs = { id: objItem.id, name: objItem.name }
          if (!this[`menu${objItem.level+1}`]['name']) {
            this[`menu${objItem.level+1}`] = {
              id : objItem.level,
              selectedIndex: -1,
              name: `${(objItem.level+1).toLocaleString('zh-Hans-CN-u-nu-hanidec')}级分类`, // ${(val.level+1).toLocaleString('zh-Hans-CN-u-nu-hanidec')}
              list: [],
            }
          }
          this[`menu${objItem.level+1}`].list.push(objs)
          if (objItem.children && objItem.children.length > 0) {
            this.getList(objItem.children)
          }
        }
      },
      /**
       * 选中事件
       * @param {Object} e 当前的事件对象
       * @param {number} index 操作的是哪一行数据
       */
      changeSelect(e, index) {
        if (this.all) {
          window.localStorage.setItem('cateId', e.target.dataset.id)
          window.localStorage.setItem('cateName', e.target.dataset.name)
          if (this.$router) {
            this.$router.push({ path: '/single' })
          } else {
            window.location.href='/collect/single'
          }
        } else {
          this.menuList[index].selectedIndex= this.selectedLine(e)
          this.$emit('searchItem', this.menuList[index].key, e.target.dataset.name)
          this.selectedItems[this.menuList[index].name] = e.target.dataset.name
        }
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
    width 100%
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
    }
    .list {
      border-left 1px solid #ccc
      flex 1
      li {
        padding 10px
        display inline-block
        &.selected {
          color #ff6e1e
          font-weight 500
        }
      }
    }
  }
  .selected {
    .card {
      margin-right 6px
      margin-bottom 5px
      padding 5px 10px
      display inline-block
      border 1px dashed #cccccc
      position relative
      .deleteIcon {
        position absolute
        font-size 18px
        color #ff6e1e
        top -8px
        right -8px
        cursor pointer
      }
    }
  }
  .more {
    width 35px
    margin-right 10px
  }
  .multi-search {
    border none
    color #ff6e1e
    .name {
      border 1px solid #ccc
      border-top none
      border-right none
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
