# net-collect-web

> relearninglearning

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

npm start直接启动项目

####项目目录
1、src/views 下的文件夹为业务文件夹
 src/assets 为存放公共文件的文件夹，其中js里的文件为公共js文件库；
 lib为引入公共element库,引入全局css文件，并注册公共组件nc-header和nc-footer
2、工程中引入了stylus预处理器，使用stylus语法写css

####访问地址
 这是一个多页面的工程
1、登录页地址：http://localhost:8080/login
2、主页首页地址： http://localhost:8080/home
3、npm start 启动服务，自动打开浏览器
4、更改文件内容会自动热更新

###打包
执行 npm run build
启动服务 npm run startservice 直接查看启动的服务

#### package.json
vue-area-linkage 城市选择器
area-data 中国省市区街道来源数据
