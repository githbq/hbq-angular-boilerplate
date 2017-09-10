/**
 * 全局配置
 */
const pathTool = require('path')
module.exports = {
    title: 'react-boilerplate',
    apiUrl: `http://localhost:3604`, //如果配了这个  就会走后端的反向代理
    favicon: pathTool.join(__dirname, '../src/assets/favicon.ico')
}
