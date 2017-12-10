<!-- 设置店铺分类 -->
<template>
  <div>
    <div class="choose-category">
      <div class="choose">
        <span class="high">请选择添加您的分类</span>
        <el-tree
          :data="data4"
          :props="defaultProps"
          :highlight-current="true"
          show-checkbox
          node-key="id"
          default-expand-all
          @check-change="checkChange"
          :expand-on-click-node="false">
        </el-tree>
      </div>
      <div class="had-cate">
        <span class="high">您选中的分类</span>
        <el-tree
          :data="categoryTree"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent">
        </el-tree>
      </div>
    </div>
    <div class="choose-category">
      <div class="choose">
        <span class="high">请添加您的自定义分类</span>
        <div>
          <el-input class="cate-input" v-model="selfCategory"></el-input>
        </div>
        <el-button class="cate-btn" type="primary" @click="addCate">添加</el-button>
      </div>
      <div class="had-cate">
        <span class="high">您选中的自定义分类</span>
        <el-tree
          :data="selfCategoryList"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent">
        </el-tree>
      </div>
    </div>
  </div>
</template>
<style lang="stylus">
  .choose-category {
    .choose {
      .cate-btn {
        width 250px
      }
    }
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .choose-category {
    display flex
    flex-flow row nowrap
    justify-content flex-start
    >div {
      min-width 320px
      margin 10px
      padding 10px
      border 1px solid #ccc
      >span {
        margin-bottom 10px
      }
    }
    .cate-input {
      margin 10px
      width 250px
    }
    .choose {
      .cate-btn {
        margin 10px
      }
    }
  }
  .high {
    color:#ff6e1b
  }
.had-cate {
  margin 20px
}
</style>
<script>
  import categoryList from './category'

  export default {
    data() {
      return {
        // 自定义分类
        selfCategoryList: [],
        selfCategory: '',
        // 已有分类
        selectedCate: [],
        categoryList: categoryList,
        categoryTree: [],
        chooseTree: [],
        chooseTreeLen: 0, // 总数
        checklen: 0, // 实时变化的总数
        chooseId: [],
        deleteTree: [],
        data4: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    computed: {
      categoryId() {
        const arr = []
        for (let i = 0; i< this.categoryTree.length; i++) {
          arr.push(this.categoryTree[i].id)
        }
        return arr
      },
      hadcategoryId() {
        const arr = []
        for (let i = 0; i< this.data4.length; i++) {
          arr.push(this.data4[i].id)
        }
        return arr
      },
    },
    methods: {
      // 应该向后端请求数据
      addCate() {
        const id = Math.random(0, 200)
        this.selfCategoryList.push({ id, label: this.selfCategory, children: []})
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      checkChange(data, checked) {
        if (this.chooseTreeLen === 0) {
          const obj = JSON.parse(JSON.stringify(data))
          this.chooseTree.push(obj)
          this.chooseTreeLen = 1
          const childArr = data.children
          if (childArr) {
            this.chooseTreeLen += childArr.length
            for (let i = 0; i < childArr.length; i++) {
              if (childArr[i].children) {
                this.chooseTreeLen += childArr[i].children.length
              }
            }
          }
        }
        if (checked) {
          this.chooseId.push(data.id)
        }
        this.checklen++
        if ((this.chooseTreeLen === this.checklen)
        || (this.chooseTreeLen === this.checklen + 1)) {
          this.checklen = 0
          this.chooseTreeLen = 0
          const arr = this.getArray(this.chooseTree, this.chooseId)
          if (arr.length > 0) {
            const index = this.categoryId.indexOf(arr[0].id)
            const hadIndex = this.hadcategoryId.indexOf(arr[0].id)
            if (index > -1) {
              this.$set(this.categoryTree, index, arr[0])
            } else if (hadIndex > -1){
              this.categoryTree = this.categoryTree.concat(arr)
            }
          } else {
            const hindex = this.getIndex(this.categoryTree, data.id)
            this.$delete(this.categoryTree, hindex)
          }
          this.chooseTree.length = 0
          this.chooseId.length = 0
        }
      },
      getArray(arr, ids) {
        for (let i = 0; i < arr.length; i++) {
          if (ids.indexOf(arr[i].id) === -1) {
            if (arr[i].children) {
              this.getArray(arr[i].children, ids)
            } else {
              arr.splice(i, 1)
            }
          }
        }
        return arr
      },
      getIndex(arr, id) {
        let index = -1
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id !== id) {
            if (arr[i].children && this.getIndex(arr[i].children, id) === -1) {
              break
            }
          }
          index = i
        }
        return index
      },
      renderContent(h, { node, data, store }) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
          </span>
        );
      }
    },
  }
</script>
npm install babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props babel-preset-env -D
