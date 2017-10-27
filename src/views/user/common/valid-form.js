const validateEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
    callback(new Error('请输入正确的邮箱格式'))
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
  validateEmail, basicValid
}
