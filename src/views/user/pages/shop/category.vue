<!-- 设置店铺分类 -->
<template>
  <div>
    <el-cascader
      placeholder="搜索分类"
      v-model="selectedCate"
      :clearable="true"
      :options="categoryList"
      filterable
      change-on-select
    ></el-cascader>
    <el-button type="primary" @click="addCate">添加</el-button>
    <div class="had-cate">
      <span>已添加分类</span>
      <div>
        <el-tree
          :data="categoryTree"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent">
        </el-tree>
      </div>
    </div>
    <div>
      <span>添加自定义分类</span>
      <div></div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.had-cate {
  margin 20px
}
</style>
<script>
  import categoryList from './category'

  export default {
    data() {
      return {
        selectedCate: [],
        categoryList: categoryList,
        categoryTree: [],
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
    methods: {
      // 应该向后端请求数据
      addCate() {
        console.log(this.selectedCate)
        const id = Math.random(0, 200)
        this.categoryTree.push({ id, label: this.selectedCate[0], children: []})
      },
      append(data) {
        this.$nextTick(() => {
          const newChild = { id: data.id++, label: 'testtest', children: [] };
          if (!data.children) {
            this.$set(data, 'children', []);
          }
          data.children.push(newChild);
        })
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      renderContent(h, { node, data, store }) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>修改</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
          </span>
        );
      }
    },
  }
</script>
npm install babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props babel-preset-env -D
