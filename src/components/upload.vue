<template>
  <div>
    <div class="oss_file">
      <input type="file" ref="upload" :multiple="multiple" @change="doUpload"/>
    </div>
  </div>
</template>
<script>
  export default{
    props: {
      multiple:{
        type: Boolean,
        twoWay:false
      },
    },
    data(){
      return{
          id: '#id33'
      }
    },
    methods: {
      doUpload() {
        const _this = this;
        const client = new OSS.Wrapper({
          region: 'oss-cn-hangzhou',
          accessKeyId: 'LTAIatvU7GI3hYDI',
          accessKeySecret: 'BTt60weaJLDOIYV5bS5JOuain9PQQN',
          // stsToken: creds.SecurityToken,
          bucket: 'sh-images'
        })
        const files = _this.$refs.upload
        if(files.files){
          const fileLen = _this.$refs.upload.files
          const resultUpload = []
          for (let i = 0; i < fileLen.length; i++) {
            const file = fileLen[i]
            const storeAs = file.name
            const result = client.put(storeAs, file)
            console.log(result)
//            client.multipartUpload(storeAs, file, {
//
//            }).then((results) => {
//              if(results.url){
//                resultUpload.push(results.url);
//              }else{
//                if(results.name === file.name){
//                  const url = this.bucketUrl+ file.name
//                  resultUpload.push(url);
//                }
//              }
//            }).catch((err) => {
//              console.log(err)
//            })
          }
          _this.url = resultUpload
        }
      }
    },
  }
</script>
<style type="text/css" scoped>
  .oss_file {
    height: 100px;
    width: 100%;

  }
  .oss_file  input {
    /*right: 0;*/
    /*top: 0;*/
    /*opacity: 0;*/
    /*filter: alpha(opacity=0);*/
    /*cursor: pointer;*/
    width: 100%;
    height: 100%;
  }

</style>
