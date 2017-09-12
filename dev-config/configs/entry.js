const constants = require('./constants')
const entry = {
    'polyfills': './src/polyfills.browser.ts',
    'main': constants.AOT ? './src/main.browser.aot.ts' : './src/main.browser.ts'
}
module.exports.get = ({ AOT, isDev, isCommon = true, isProd }) => {
    const common = entry
    const dev = {}
    const prod = {}
    let result = common
    if (isDev) {
        result = {...common, ...dev }
    } else if (isProd) {
        result = {...common, ...prod }
    }
    return result
}
