/**
 * 全局配置
 */
const pathTool = require('path')
// const { templateObject } = require('./entry')
const { __DEV__, NODE_ENV, APPS_PATH } = require('./constants')
// const srcRelative = pathTool.relative.bind(pathTool, APPS_PATH)
function isWebpackDevServer() {
  return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]))
}
// const htmlPaths = Object.keys(templateObject) .map(n =>
//   srcRelative(templateObject[n]).replace('.pug', '.html')
// )
module.exports = {
  // htmlPaths: htmlPaths.filter(n => !/index\.(pug|html)/.test(n)),
  baseUrl: '/',
  title: 'ts-ng-boilerplate',
  apiUrl: `http://localhost:3604`, //如果配了这个  就会走后端的反向代理
  favicon: 'assets/favicon.ico', //不需要物理文件路径
  isWebpackDevServer: isWebpackDevServer(),
  __DEV__,
  NODE_ENV
}
