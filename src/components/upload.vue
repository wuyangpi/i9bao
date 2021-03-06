/**
* 图片上传组件，可以上传回显
* 存储在阿里云，使用new Oss构造对象，上传到阿里云
* 上传的格式为字符串，栗子：相对地址 'data/customer/${userId}/cert'
* 如果页面上有很多上传组件，可以通过upload.js获取公共store对象
**／
<template>
  <div class="nc-image-upload">
    <div class="oss_file" v-show="isUpload && !onlyShow">
      <input type="file" ref="uploadImage" @change.prevent.stop="doUpload"
             :disabled="disabled" :accept="accept" :multiple="multiple">
      <el-button v-if="isButton" @click.stop="selectFile"><i class="el-icon-plus"></i><span>{{title}}</span></el-button>
    </div>
    <!-- 单文件上传-->
    <div v-if="!multiple">
      <div class="preview"
           v-if="imgSrc !== '' || !isUpload"
           :class="{ 'upload-preview': !isUpload&&!onlyShow  }"
           @mouseover="headImgTip"
           @mouseout="headImgTip"
           @click.stop="selectFile">
        <div class="shade" v-show="headImgShow && !isUpload"><span v-if="imgSrc">修改</span><span v-else>上传</span>头像</div>
        <img :src="imgSrc" :style="onlyShow ? styleObject : ''" alt="">
      </div>
      <div class="upload-operate" v-show="!uploading&&imgSrc&&!onlyShow">
        <!--<a v-if="isEdit" href="javascript:void(0)" @click.stop="selectFile">修改</a>-->
        <a v-if="isDelete" href="javascript:void(0)" @click.stop="clearValue">删除</a>
      </div>
    </div>
    <div v-else>
      <ul>
        <li v-for="(data, index) in multiArray" :key="index" class="multi-list">{{data.name}}
          <span v-if="multiContent.length" @click="getDown(data.value)">下载查看</span>
          <span @click="deleteMulti(index)">删除</span>
        </li>
      </ul>
    </div>
    <span class="uploading" v-show="uploading && !onlyShow">正在上传...</span>
    <!-- 提示字段 -->
    <div class="upload-prop" v-if="prompt && !onlyShow">
      <span>{{prompt}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'uploadfile',
    props: {
      // 仅仅显示
      onlyShow: {
        type: Boolean,
        defalut: false
      },
      // 多文件上传能上传的件数
      numbers: String,
      /**
       * 图片上传目录
       */
      aliCatalog: String,
      /**
       *  权限的设置，默认是private，使用putACL操作权限
       *  private/public-read/public-read-write)
       */
      controlRight: {
        type: String,
        default: '',
      },
      /**
       * oss实例，一个页面的上传按钮上传目录相同则将它传进来，减小请求
       */
      ossClient: [Object],
      /**
       * 是否是多图片上传
       */
      multiple:{
        type: Boolean,
        default: false,
        twoWay: false
      },
      // 编辑回来的图片
      multiContent: {
        type: Array,
        default: () => {
          return []
        }
      },
      /**
       * 图片地址
       */
      value: String,
      /**
       * 限定能够通过文件上传进行提交的文件类型
       */
      accept: {
        type: String,
        default: 'image/png,image/jpeg',
      },
      /**
       * 图片最大限制，单位M
       */
      maxSize: {
        type: String,
        default: '1'
      },
      /**
       * 加号下标题
       */
      title: {
        type: String,
        default: '上传图片',
      },
      /**
       * 限制文案提示
       */
      prompt: String,
      /**
       * 自定义文件后缀正则验证规则
       */
      typePattern: {
        type: String,
        default: '^png$|jpg$|jpeg$|gif$',
      },
      /**
      * 是否使用button上传
      */
      isButton: {
        type: Boolean,
        default: true,
      },
      /**
       * 是否需要上传
       */
      isUpload: {
        type: Boolean,
        default: true,
      },
      /**
       * 开启/关闭修改按钮
       */
      isEdit: {
        type: Boolean,
        default: true,
      },
      /**
       * 开启/关闭删除按钮
       */
      isDelete: {
        type: Boolean,
        default: true,
      },
      /**
       * 点击上传图片时触发事件
       */
      onSelect: {
        type: Function,
        default: () => {
        },
      },
      /**
       * 上传图片成功调方法
       */
      onSuccess: {
        type: Function,
        default: () => {
        },
      },
      /**
       * 上传图片错误方法回调
       */
      onError: {
        type: Function,
      },
    },
    data(){
      return{
        multiArray: [], // 多文件上传数组
        client: null, // 阿里云Oss对象
        resDatas: null, // 返回的data值
        imgSrc: '',   // 图片存储位置
        disabled: false,
        uploading: false,
        headImgShow: false,
        styleObject: {
          width: '100%',
          height: '100%'
        },
      }
    },
    watch: {
      /**
       * 监听值变化
       * @param {String} val 值
       */
      value(val) {
        if (val) {
         this.getEditData()
        }
      },
      /**
       * 监听多个上传值
       * @param {String} val 值
       */
      multiContent: {
        handler(val) {
          val.forEach(l => {
            const name = l.substring(l.lastIndexOf('/') + 1)
            this.multiArray.push({ name, value: l })
          })
        },
        deep: true
      },
    },
    mounted() {
      this.getEditData()
      this.$parent.$on('submit', () => {
        this.onSuccess(this.multiArray)
      })
    },
    methods: {
      async getEditData() {
        if (!this.resDatas) {
          if (typeof this.ossClient === 'undefined') {
            await this.getossObject()
          } else {
            this.client = new OSS.Wrapper(this.ossClient)
            this.resDatas = this.ossClient
          }
        }
        // 将请求地址存储在localstorage中
        const bucketUrl = `http://${this.resDatas.bucket}.${this.resDatas.region}.aliyuncs.com`
        window.localStorage.setItem('bucketUrl', bucketUrl)
        // 编辑时候的图像
        if (this.value && this.client) {
          const imgst = this.client.signatureUrl(this.value, { expires: 600, 'process': 'image/resize,w_30' })
          this.setCurrentValue(this.value, imgst)
        }
      },
      async getossObject() {
        await this.http.post('/rest/oss/sts', {resources: JSON.stringify([this.aliCatalog])}).then(res => {
          if (res.result === 1) {
            this.resDatas = res.data
            this.client = new OSS.Wrapper({
              region: this.resDatas.region,
              accessKeyId: this.resDatas.accessKeyId,
              accessKeySecret: this.resDatas.accessKeySecret,
              stsToken: this.resDatas.stsToken,
              bucket: this.resDatas.bucket,
            })
          }
        }).catch(err => { this.$message.error({ message: err }) })
      },
      /**
       * 阴影遮罩层
       */
      headImgTip() {
        if (!this.onlyShow) {
          this.headImgShow = !this.headImgShow
        }
      },
      /**
       * 修改图片事件
       */
      selectFile() {
        if (!this.disabled && !this.onlyShow) {
          this.onSelect()
          this.$refs.uploadImage.click()
        }
      },
      /**
       * 删除图片
       */
      clearValue() {
        this.$refs.uploadImage.value = ''
        this.setCurrentValue('', '')
      },
      /**
       * 多文件删除时，删除不想要的文件
       * @param {number} index 操作第几个文件
      */
      deleteMulti(index) {
        this.multiArray.splice(index, 1)
      },
      /**
       * 上传图片
       */
      doUpload() {
        if (this.numbers && this.multiArray.length - this.numbers >= 0) {
          this.$message.error({ message: `最多只能上传${this.numbers}件` })
          return
        }
        const _this = this;
        // 存储地址
        const bucketUrl = `http://${this.resDatas.bucket}.${this.resDatas.region}.aliyuncs.com`
        const files = _this.$refs.uploadImage
        if (files.files) {
          const fileLen = _this.$refs.uploadImage.files
          const resultUpload = []
          for (let i = 0; i < fileLen.length; i++) {
            const file = fileLen[i]
            if (file.size > (this.maxSize * 1024 * 1024)) {
              this.$message.warning(`${this.multiple ? '文件' : '图片'}大小不能超过${this.maxSize}M`)
              return
            }
            this.uploading = true
            const storeAs = `${this.aliCatalog}/${file.name}`
            let imgSrc
            // 先将图片上传,图片上传的时候由前端来控制是权限，是私有还是公共需要查找API
            this.client.multipartUpload(storeAs, file).then((results) => {
              if (results.url) { // 如果图片太大，分很多链接上传会出现这url不存在
                imgSrc = results.url
                resultUpload.push(results.url)
              } else {
                if (results.name === file.name) {
                  imgSrc = bucketUrl + file.name
                  resultUpload.push(this.imgSrc);
                }
              }
              this.multiArray.push({name: file.name, value: storeAs,})
              this.geturl(storeAs, imgSrc)
              this.uploading = false
            }).catch((err) => {
              this.$message.error({ message: err.message || '上传失败' })
              this.uploading = false
            })
          }
        }
      },
      // 图片的回显
      geturl(val, imgsrc) {
        // 将图片设置权限 controlRight不是默认值private设置权限
        if (this.controlRight) {
          this.client.putACL(val, this.controlRight).then(res => {
            this.setCurrentValue(val, imgsrc)
          })
        } else {
          const imgSrc = this.client.signatureUrl(val, { expires: 600, 'process': 'image/resize,w_100' })
          this.setCurrentValue(val, imgSrc)
        }
      },
      /**
       * 下载文件
       */
      getDown(item) {
        const index = item.lastIndexOf('/')
        const filename = item.substring(index + 1)
        const url = this.client.signatureUrl(item, { response: {
          'content-disposition': 'attachment; filename="' + filename + '"'
        }
        })
        window.location = url
      },
      /**
       *  双向绑定改变值
       * @param {String}  value 值
       */
      setCurrentValue(value, imgsrc) {
        this.$emit('input', value)
        this.imgSrc = imgsrc
        this.$emit('change', value)
      },
    },
  }
</script>
<style type="text/css" lang="stylus" scoped>
  .nc-image-upload {
    min-height 30px
    position relative
    box-sizing: border-box;
    .oss_file {
      .el-button {
        border 1px solid #e6eaee
        outline: none;
        background-color: transparent;
        background-color: #f2f4f7;
        border-radius: 4px;
        padding: 6px 14px;
        min-width: 100px;
        font-size: 14px;
        height: 36px;
        color: #333;
        cursor: pointer;
      }
      input {
        display none
      }
    }
    .upload-preview {
      display inline-block
      position relative
      width 100px
      height 100px
      border 1px solid #cfcfcf
      color #fff
      border-radius 50%
      background url('../assets/images/home/add_upload.png') no-repeat 0 0/ cover
      .shade {
        border-radius 50%
      }
      img {
        border-radius 50%
      }
    }
    .shade {
      position absolute
      top 0
      left 0
      bottom 0
      right 0
      text-align center
      padding-top 40%
      background rgba(0, 0, 0, 0.5)
      cursor: pointer;
    }
    .preview {
      display: inline-block
      margin-top 10px
      img {
        width: 100px;
        height: 100px;
        display: inline-block;
        cursor: pointer;
        vertical-align: middle;
      }
    }
    .upload-operate {
      display inline-block
      vertical-align bottom
      a {
        color #1c94f9
      }
    }
    .uploading {
      color: #ccc
      vertical-align bottom
    }
    .upload-prop {
      color #cccccc
      font-size 12px
    }
    .multi-list {
      padding 5px
      margin: 10px 0
      list-style decimal
      position relative
      span {
        font-size 12px
        color #ff6e1b
        cursor pointer
      }
    }
  }
</style>
