<template>
  <div>
    <div id="editorElem" style="text-align:left"></div>
    <button v-on:click="getContent">查看内容</button>
  </div>
</template>

<script>
  import E from 'wangeditor'

  export default {
    name: 'editor',
    data () {
      return {
        editorContent: ''
      }
    },
    methods: {
      getContent: function () {
        alert(this.editorContent)
      },
      /**
       * 图片上传
       */
      imageUpload() {
        const btnId = editor.imgMenuId;
        const containerId = editor.toolbarElemId;
        const textElemId = editor.textElemId;
        console.log(btnId, containerId, textElemId)
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
            let imgSrc
            client.multipartUpload(storeAs, file).then((results) => {
              if(results.url) { // 如果图片太大，分很多链接上传会出现这url不存在
                imgSrc = results.url
                resultUpload.push(results.url)
              } else {
                if(results.name === file.name){
                  imgSrc = this.bucketUrl+ file.name
                  resultUpload.push(this.imgSrc);
                }
              }
              console.log(imgSrc)
              this.uploading = false
            }).catch((err) => {
              this.$message.error(err.description || '上传失败')
              this.uploading = false
            })
          }
          _this.url = resultUpload
        }
      },
    },
    mounted() {
      var editor = new E('#editorElem')
      editor.customConfig.uploadImgServer = '/upload'
      editor.customConfig.uploadImgMaxLength = 5
      editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.create()
    },
  }
</script>
