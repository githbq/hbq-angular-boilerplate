/**
 * 全局配置
 */
const pathTool = require('path')

function isWebpackDevServer() {
    return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]))
}
module.exports = {
    baseUrl: '/',
    title: 'react-boilerplate',
    apiUrl: `http://localhost:3604`, //如果配了这个  就会走后端的反向代理
    favicon: 'assets/favicon.ico', //不需要物理文件路径
    isWebpackDevServer: isWebpackDevServer()
}
