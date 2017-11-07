<template>
  <div class="quill-editor-example">
    <!-- quill-editor -->
    <quill-editor v-model="content"
                  class="quill-show"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)"
                  @ready="onEditorReady($event)">
      <div id="toolbar" slot="toolbar">
        <!-- Add a bold button -->
        <button class="ql-bold">Bold</button>
        <button class="ql-italic">Italic</button>
        <button class="ql-underline">underline</button>
        <button class="ql-strike">strike</button>
        <button class="ql-blockquote">blockquote</button>
        <button class="ql-code-block">code-block</button>
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>

        <!-- Add font size dropdown -->
        <select class="ql-header">
          <option v-for="level in [1,2,3,4,5,6,false]" :value="level"></option>
        </select>
        <select class="ql-color">
          <option v-for="color in colors" :value="color"></option>
        </select>
        <select class="ql-background">
          <option v-for="color in colors" :value="color"></option>
        </select>
        <!-- Add subscript and superscript buttons -->
        <select class="ql-font">
          <option :value="fontFamily[0].value">{{fontFamily[0].text}}</option>
          <option
            v-for="font, index in fontFamily"
            :key="index"
            v-if="index !== 0"
            :value="font.value"
          >{{font.text}}</option>
        </select>
        <select class="ql-align">
          <option selected></option>
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify"></option>
        </select>
        <button class="ql-clean"></button>
        <button type="button" class="ql-link"></button>
        <button type="button" class="ql-image"></button>
      </div>
    </quill-editor>
    <input type="file" accept="image/gif,image/png,image/jpeg" ref="file" @change="hanldFileUpload" style="display: none">
  </div>
</template>

<script>
//  import quillEditor from 'vue-quill-editor'
  export default {
    props: {
      /**
       * @member {Array} fontFamily 字体选项集合
       */
      fontFamily: {
        type: Array,
        default: () => [{
          text: '宋体',
          value: 'SimSun',
        }, {
          text: '黑体',
          value: 'SimHei',
        }, {
          text: '微软雅黑',
          value: 'Microsoft YaHei',
        }, {
          text: 'Arial',
          value: 'Arial',
        }],
      },
      /**
       * @member {string} size 大小类型
       */
      size: {
        type: String,
        default: 'small',
      },
      /**
       * @member {string} text 纯文本信息
       */
      text: String,
      html: String,
      /**
       * @member {Object} contents 上下文对象
       */
      contents: Object,
    },
    data() {
      return {
        colors: [
          '#000',
          '#e60000',
          '#ff9900',
          '#ffff00',
          '#008a00',
          '#0066cc',
          '#9933ff',
          '#fff',
          '#facccc',
          '#ffebcc',
          '#ffffcc',
          '#cce8cc',
          '#cce0f5',
          '#ebd6ff',
          '#bbbbbb',
          '#f06666',
          '#ffc266',
          '#ffff66',
          '#66b966',
          '#66a3e0',
          '#c285ff',
          '#888888',
          '#a10000',
          '#b26b00',
          '#b2b200',
          '#006100',
          '#0047b2',
          '#6b24b2',
          '#444444',
          '#5c0000',
          '#663d00',
          '#666600',
          '#003700',
          '#002966',
          '#3d1466',
        ],
        content: '',
        bucketUrl: 'http://sh-images.oss-cn-hangzhou.aliyuncs.com/', // 阿里云仓库
        editorOption: {
          modules: {
            toolbar: '#toolbar'
          }
        }
      }
    },
    components: {
//      quillEditor
    },
    methods: {
      /**
       * 失焦事件
       * @param {Object} editor 编辑器中的对象,包括html text
       */
      onEditorBlur(editor) {
        this.$emit('blur', editor)
      },
      /**
       * 聚焦事件
       * @param {Object} editor 编辑器中的对象,包括html text
       */
      onEditorFocus(editor) {
        this.$emit('focus', editor)
      },
      /**
       * 初始化好后出发的方法
       * @param {Object} editor 编辑器中的对象,包括html text
       */
      onEditorReady(editor) {
        // console.log('editor ready!', editor)
      },
      /**
       * change事件 text-change
       * @param {Object} editor 编辑器中的对象,包括html text
       */
      onEditorChange(editor) {
        this.$emit('change', editor)
      },
      /**
       * 点击图片按钮触发的事件
       * @param {Boolean} state 是否触发
       */
      imgHandler(state) {
        if (state) {
          let fileInput = this.$refs.file
          fileInput.click() // 加一个触发事件
        }
      },
      hanldFileUpload() {
        const client = new OSS.Wrapper({
          region: 'oss-cn-hangzhou',
          accessKeyId: 'LTAIatvU7GI3hYDI',
          accessKeySecret: 'BTt60weaJLDOIYV5bS5JOuain9PQQN',
          // stsToken: creds.SecurityToken,
          bucket: 'sh-images'
        })
        const quill = this.$refs.myQuillEditor.quill
        const range = quill.getSelection()
        const files = this.$refs.file
        if(files.files) {
          const fileLen = this.$refs.file.files
          const resultUpload = []
          for (let i = 0; i < fileLen.length; i++) {
            this.uploading = true
            const file = fileLen[i]
            const storeAs = file.name
            let imgSrc
            client.multipartUpload(storeAs, file).then((results) => {
              if (results.url) { // 如果图片太大，分很多链接上传会出现这url不存在
                imgSrc = results.url
                resultUpload.push(results.url)
              } else {
                if (results.name === file.name) {
                  imgSrc = this.bucketUrl + file.name
                  resultUpload.push(this.imgSrc);
                }
              }
              quill.insertEmbed(range.index, 'image', imgSrc)
              this.uploading = false
            }).catch((err) => {
              this.$message.error(err.description || '上传失败')
              this.uploading = false
            })
          }
        }
      },
    },
    mounted() {
      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
      const quill = window.Quill // vue-editor里面定义的
      var Font = quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
      Font.whitelist = this.fontFamily.map(l => l.value)
      quill.register(Font, true);
      // 这些处理是将样式放进style里
      const FontStyle = quill.import('attributors/style/font')
      FontStyle.whitelist = Font.whitelist
      const ColorStyle = quill.import('attributors/style/color')
      const SizeStyle = quill.import('attributors/style/size')
      const AlignStyle = quill.import('attributors/style/align')
      // 注册了之后覆盖原来的样式
      quill.register(FontStyle, true)
      quill.register(ColorStyle, true)
      quill.register(SizeStyle, true)
      quill.register(AlignStyle, true)
    },
  }
</script>
<style lang="stylus" scoped>
  .quill-show {
    padding 8px
    padding-bottom 0
  }
  .ql-snow .ql-color-picker, .ql-snow .ql-icon-picker {
    top: -5px;
  }
</style>
<style lang="stylus">
  .ql-snow .ql-picker-label::before {
    vertical-align: top
  }
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
  .html {
    height: 9em;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    resize: vertical;
  }
</style>
