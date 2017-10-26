/**
* 公司资料
*/
<template>
  <div>
    <div class="center-container">
      <div class="title">商户资料</div>
      <div class="img">
        <upload class="headImg" v-model="shopImg" :isDelete="false" :isUpload="false" :multiple="false"></upload>
        <div class="img-title">企业头像</div>
      </div>
      <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="ruleclass">
          <el-form-item label="商户编号">
            {{ruleForm.id}}
          </el-form-item>
          <el-form-item label="商户名">
            {{ruleForm.name}}
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="nickname" label="昵称" required>
                <el-input v-model="ruleForm.nickname" :maxlength="20" placeholder="请输入昵称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="address" label="地址">
                <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="category" label="商户类别">
                <el-cascader
                  expand-trigger="hover"
                  :options="options"
                  v-model="ruleForm.category"
                  @change="cateChange">
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="tel" label="商户电话">
                <el-input v-model="ruleForm.tel" :maxlength="20" placeholder="请输入昵称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="legalName" label="法人" required>
                <el-input v-model="ruleForm.legalName" :maxlength="20" placeholder="请输入昵称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期" prop="birthday">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="cert-img">
            <el-form-item label="企业营业执照：" prop="licence">
              <upload v-model="ruleForm.licence" :isDelete="false" prompt="请上传JPG,JPEG,PNG,PDF格式的图片"></upload>
            </el-form-item>
            <el-form-item label="企业商标文件：" prop="trademark">
              <upload v-model="ruleForm.trademark" :isDelete="false" prompt="请上传JPG,JPEG,PNG,PDF格式的图片"></upload>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="btn-set">
      <el-button type="primary" class="save-btn" @click="submitForm('ruleForm')">保存</el-button>
      <el-button type="primary" class="cancel-btn" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        headImgShow: false,
        shopImg: '', // 头像
        ruleForm: {
          id: 'zgwz201710222589',
          name: '哈哈哈哈哈',
          nickname: 'sweet甜心',
          category: [],
          tel: '13958655236',
          legalName: '', // 法人姓名
          licence: '', // 营业执照
          trademark: '', // 商标文件
          birthday: '', // yyyy-mm-dd
        },
        rules: {
          nickname : [
            { required: true, message: '请输入昵称', trigger: 'blur' },
          ],
          legalName : [
            { required: true, message: '请输入法人名称', trigger: 'blur' },
          ],
        },
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
      }
    },
    methods: {
      headImgTip() {
        this.headImgShow = !this.headImgShow
      },
      /**
       * 处理三级商户类别
       * @param {Array} value所选择的分类
       */
      cateChange(value) {
        this.ruleForm.shopCategory = value
      },
      submitForm(formName){
        console.log(this.ruleForm)
        console.log(this.shopImg)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancel() {
        history.back()
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .center-container {
    .el-form-item__content {
      width 300px
    }
    .cert-img {
      .el-form-item {
        .el-form-item__label {
          color #ccc
        }
      }
    }
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .center-container {
    width 900px
    border 1px solid #ccc
    margin 20px
    padding-bottom 20px
    .title {
     width 100%
     height 40px
     line-height 40px
     background #f9f9f9
     border-bottom: 1px solid #ccc
     padding-left 30px
    }
    .headImg {
      display: inline-block;
      margin 20px 20px 20px 50px
    }
    .img-title {
      display: inline-block;
      vertical-align: middle;
    }
    .content {
      padding-top: 20px;
      border-top 1px solid #ccc
    }
    .el-cascader {
      width 100%
    }
    .cert-img {
      border-top 1px solid #ccc
      margin-top 20px
      padding-top 20px
    }
  }
</style>
