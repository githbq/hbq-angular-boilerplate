module.exports.get = ({ isDev, isCommon = true, isProd }) => {
    const common = require('./common')
    const dev = require('./dev')
    const prod = require('./prod')
    let result = common
    if (isDev) {
        result = [...common, ...dev]
    } else if (isProd) {
        result = [...common, ...prod]
    }
    return result
}
