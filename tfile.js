/**
 * Created by Administrator on 2017/9/1.
 */
var fs = require('fs')
fs.readdir(process.cwd(), function (err, files) {
  console.log('哈哈');
  if(!files.length) {
    return console.log('      \033[31m No files to show!\033[39\n')
  }
  console.log('Select which files or directory you want to see\n');
  function file (i) {
    var filename = files[i]
    fs.stat(__dirname + '/' + filename, function (err, stat) {
      if (stat.isDirectory()) {
        console.log(''+i+' \033[36m' + filename + '/\033[39m');
      } else  {
        console.log(''+i+' \033[36m' + filename + '/\033[39m');
      }
      i++;
      if (i == files.length) {
        console.log('')
        process.stdout.write('\033[33mEnter you choice: \033[39m')
        process.stdin.resume()
        process.stdin.setEncoding('utf8')
      } else {
        file(i)
      }
    })
  }
  file(0)
})
