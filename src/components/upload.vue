<template>
  <div class="nc-image-upload">
    <div class="oss_file" v-show="isUpload">
      <input type="file" ref="uploadImage" @change="doUpload"
             :disabled="disabled" :accept="accept">
      <el-button v-if="isButton" @click="selectFile"><i class="el-icon-plus"></i><span>{{title}}</span></el-button>
    </div>
    <div class="preview"
         v-if="imgSrc !== '' || !isUpload"
         :class="{ 'upload-preview': !isUpload }"
         @mouseover="headImgTip"
         @mouseout="headImgTip"
         @click="selectFile">
      <div class="shade" v-show="headImgShow"><span v-if="imgSrc">修改</span><span v-else>上传</span>头像</div>
      <img :src="imgSrc" alt="">
    </div>
    <div class="upload-operate" v-show="!uploading&&imgSrc">
      <!--<a v-if="isEdit" href="javascript:void(0)" @click="selectFile">修改</a>-->
      <a v-if="isDelete" href="javascript:void(0)" @click="clearValue">删除</a>
    </div>
    <span class="uploading" v-show="uploading">正在上传...</span>
    <!-- 提示字段 -->
    <div class="xel-upload-prop" v-if="prompt">
      <span>{{prompt}}</span>
    </div>
  </div>
</template>
<script>
  export default{
    props: {
      /**
       * 是否是多图片上传
       */
      multiple:{
        type: Boolean,
        twoWay: false
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
      maxSize: [Number, String],
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
       * 是否使用预览上传
       */
      isCircle: {
        type: Boolean,
        default: true,
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
        default: false,
      },
      /**
       * 开启/关闭图片预览
       */
      isPreview: {
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
        id: '#id33',
        imgSrc: '',
        disabled: false,
        uploading: false,
        headImgShow: false,
        bucketUrl: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/',
      }
    },
    watch: {
      /**
       * 监听值变化
       * @param {String} val 值
       */
      value(val) {
        this.setCurrentValue(val)
      },
    },
    methods: {
      /**
       * 阴影遮罩层
       */
      headImgTip() {
        this.headImgShow = !this.headImgShow
      },
      /**
       * 修改图片事件
       */
      selectFile() {
        if (!this.disabled) {
          this.onSelect()
          this.$refs.uploadImage.click()
        }
      },
      /**
       * 删除图片
       */
      clearValue() {
        this.$refs.uploadImage.value = ''
        this.setCurrentValue('')
      },
      /**
       * 上传图片
       */
      doUpload() {
        const _this = this;
        const client = new OSS.Wrapper({
          region: 'oss-cn-hangzhou',
          accessKeyId: 'LTAIatvU7GI3hYDI',
          accessKeySecret: 'BTt60weaJLDOIYV5bS5JOuain9PQQN',
          // stsToken: creds.SecurityToken,
          bucket: 'sh-images'
        })
        const files = _this.$refs.uploadImage
        if(files.files){
          const fileLen = _this.$refs.uploadImage.files
          const resultUpload = []
          for (let i = 0; i < fileLen.length; i++) {
            this.uploading = true
            const file = fileLen[i]
            const storeAs = file.name
//            const result = client.put(storeAs, file)
//            console.log(result)
            client.multipartUpload(storeAs, file).then((results) => {
              if(results.url) { // 如果图片太大，分很多链接上传会出现这url不存在
                this.imgSrc = results.url
                resultUpload.push(results.url)
              } else {
                if(results.name === file.name){
                  this.imgSrc = this.bucketUrl+ file.name
                  resultUpload.push(this.imgSrc);
                }
              }
              this.uploading = false
            }).catch((err) => {
              this.$message.error(err.description || '上传失败')
              this.uploading = false
            })
          }
          _this.url = resultUpload
        }
      },
      /**
       *  双向绑定改变值
       * @param {String}  value 值
       */
      setCurrentValue(value) {
        if (value === this.imgSrc) return
        this.$emit('input', value)
        this.imgSrc = value
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
        position absolute
        top 0px
        left 0
        display block
        width 100%
        height 100%
        border-radius 50%
        text-align center
        padding-top 40%
        background rgba(0, 0, 0, 0.5)
        cursor: pointer;
      }
      img {
        border-radius 50%
      }
    }
    .preview {
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
  }

</style>
