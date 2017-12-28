/**
* 企业认证
*/
<template>
  <div>
    <div class="center-container">
      <div class="title">企业认证</div>
      <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="ruleclass">
          <el-row>
            <el-col :span="12">
              <el-form-item prop="name" label="商户名" required>
                <el-input v-model="ruleForm.name" :maxlength="20" placeholder="请输入商户名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="tel" label="商户电话" required>
                <el-input v-model="ruleForm.tel" :maxlength="20" placeholder="请输入电话号码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="legalName" label="法人姓名" required>
                <el-input v-model="ruleForm.legalName" :maxlength="20" placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人身份证号" prop="legalIdCard" required>
                <el-input placeholder="请输入身份证号" v-model="ruleForm.legalIdCard"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="cert-img">
            <el-row>
              <el-col :span="12">
                <el-form-item label="身份证（正面）" prop="legalIdPic1" required>
                  <upload v-model="ruleForm.legalIdPic1"
                          :aliCatalog="`data/customer/${userId}/cert`"
                          :ossClient="ossclient"
                          v-if="ossclient"
                          :isDelete="false"
                          maxSize="2"
                          prompt="请上传JPG,JPEG,PNG格式的图片，图片大小不超过2M"></upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证（反面）" prop="legalIdPic2" required>
                  <upload v-model="ruleForm.legalIdPic2"
                          :aliCatalog="`data/customer/${userId}/cert`"
                          :ossClient="ossclient"
                          v-if="ossclient"
                          :isDelete="false"
                          maxSize="2"
                          prompt="请上传JPG,JPEG,PNG格式的图片，图片大小不超过2M"></upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业营业执照：" prop="licence" required>
                  <upload v-model="ruleForm.licence"
                          :aliCatalog="`data/customer/${userId}/cert`"
                          :ossClient="ossclient"
                          v-if="ossclient"
                          :isDelete="false"
                          maxSize="2"
                          prompt="请上传JPG,JPEG,PNG格式的图片，图片大小不超过2M"></upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业商标文件：" prop="trademark" required>
                  <upload v-model="ruleForm.trademark"
                          :aliCatalog="`data/customer/${userId}/cert`"
                          :ossClient="ossclient"
                          v-if="ossclient"
                          :isDelete="false"
                          maxSize="2"
                          prompt="请上传JPG,JPEG,PNG格式的图片，图片大小不超过2M"></upload>
                </el-form-item>
              </el-col>
            </el-row>
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
  import upload from 'src/assets/js/upload'
  import validate from 'src/views/login/validate'

  export default{
    mixins: [upload],
    data() {
      return {
        userId: 0,
        ossclient: null,
        ruleForm: {
          name: '',
          tel: '',
          legalName: '', // 法人姓名
          legalIdCard: '', // 法人身份证
          licence: '', // 营业执照
          trademark: '', // 商标文件
          legalIdPic1: '', // 身份证正面
          legalIdPic2: '', // 身份证反面
        },
        rules: {
          name : [
            { required: true, message: '请输入商户名称', trigger: 'blur' },
          ],
          tel: [
            { validator: validate.validatePhone, trigger: 'blur' },
          ],
          legalIdCard: [
            { validator: validate.validateIdLegalNum, trigger: 'blur' },
          ],
          legalName : [
            { required: true, message: '请输入法人名称', trigger: 'blur' },
          ],
          licence: [
            { validator: validate.validateImg, trigger: 'change' },
          ],
          trademark: [
            { validator: validate.validateImg, trigger: 'change' },
          ],
          legalIdPic1: [
            { validator: validate.validateImg, trigger: 'change' },
          ],
          legalIdPic2: [
            { validator: validate.validateImg, trigger: 'change' },
          ],
        },
        options: [],
      }
    },
    created() {
      this.userId = window.localStorage.getItem('netId')
      this.requestQueue()
    },
    methods: {
      /**
       * 页面初始化所有的请求接口
       */
      async requestQueue() {
        await this.getEditData()
        await this.requestclient()
      },
      // 获取阿里云new oss接口
      async requestclient() {
        const param = `data/customer/${this.userId}/cert`
        await this.getClient(param, 'ossclient')
      },
      getEditData() {
        this.http.post('/rest/customer/info').then(
          (res) => {
            if (res.result === 1) {
              const data = res.data.customer.cert.extend
              if (data.legalName) {
                this.ruleForm = {
                  name: data.name,
                  tel: data.tel,
                  legalName: data.legalName,
                  legalIdCard: data.legalIdCard,
                  licence: data.licence,
                  trademark: data.trademark,
                  legalIdPic1: data.legalIdPic1,
                  legalIdPic2: data.legalIdPic2,
                }
              }
            }
          }).catch(err => {
          this.$message.error({ message: err || '出错了' })
        })
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.http.post('/rest/customer/cert/enterprise', this.ruleForm).then(
            (res) => {
              if (res.result === 1) {
                this.$message({
                  message: '提交成功',
                  type: 'success',
                })
              }
            }).catch(err => {
              this.$message.error({ message: err || '出错了' })
            })
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
     padding-left 30px
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
