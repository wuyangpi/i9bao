const validateEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
    callback(new Error('请输入正确的邮箱格式'))
  } else {
    callback()
  }
}
const validateArea = (rule, value, callback) => {
  const len = value.length
  if (len === 0) {
    callback(new Error('请选择地区'))
  }
  callback()
}
const validateCate = (rule, value, callback) => {
  const len = value.length
  if (len === 0) {
    callback(new Error('请选择分类'))
  }
  callback()
}
const validateDate = (rule, value, callback) => {
  if (value === '' || (Array.isArray(value) && !value[0])) {
    callback(new Error('请选择时间'))
  }
  callback()
}
const validateNum = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入库存'))
  } else if (!/^\d+$/.test(value)) {
    callback(new Error('库存只能输入数字'))
  } else {
    callback()
  }
}
const validatefee = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入费用'))
  } else if (!/^\d+$/.test(value)) {
    callback(new Error('费用只能输入数字'))
  } else {
    callback()
  }
}
function basicValid (msg) {
  const obj = { required: true, message: msg, trigger: 'blur' }
  const arr = [].push(obj)
  return arr
}
export default {
  validateEmail, validateArea, validateDate, validateCate, validateNum, basicValid, validatefee
}
