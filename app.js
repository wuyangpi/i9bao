const express = require('express')
const path = require('path')
const utils = require('./build/utils')
var config = require('./config')
const app = express()

const history = require('connect-history-api-fallback');
const pages =  utils.getMultiEntry('./src/'+config.build.moduleName+'/**/index.html');
const rewrites = [];
for(let page in pages){
  // match: /page/*  or /page
  rewrites.push({from: new RegExp('\/'+page+'\/|^\/'+page+'$'), to: '/'+page+'/index.html'})
}
console.log(rewrites)
app.use(history({
  rewrites: rewrites
}));

app.use(express.static(path.join(__dirname, 'dist')))
app.listen(3000,() => {
  console.log('app listening on port 3000.')
})
