const validateName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
    callback(new Error('请输入英文，数字'))
  } else {
    callback()
  }
}
const validatePwd = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
    callback(new Error('请输入英文，数字'))
  } else if (value.length < 6) {
    callback(new Error('密码至少6个字符'))
  } else {
    callback()
  }
}
const validatePhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号码'))
  } else if (!/^1(3|4|5|7|8)[0-9]\d{8}$/.test(value)) {
    callback(new Error('请输入正确的手机号码格式'))
  } else {
    callback()
  }
}
const validateIdLegalNum = (rule, value, callback) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (value === '') {
    callback(new Error('请输入身份证号码'))
  } else if (!reg.test(value)) {
    callback(new Error('请输入正确的身份证号格式'))
  } else {
    callback()
  }
}
const validateImg = (rule, value, callback) => {
  debugger
  if (value === '') {
    callback(new Error('请上传图片'))
  } else {
    callback()
  }
}
export default {
  validateName, validatePwd, validatePhone, validateIdLegalNum, validateImg
}
