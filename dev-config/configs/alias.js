/**
 * 别名配置
 */
const { APP_PATH } = require('./constants')
module.exports.get = () => {
    return {
        '@': APP_PATH,
    }
}
