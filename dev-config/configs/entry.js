module.exports.get = ({ AOT, isDev, isCommon = true, isProd }) => {
    const common = {
        'polyfills': './src/polyfills.browser.ts',
        'main': AOT ? './src/main.browser.aot.ts' : './src/main.browser.ts'
    }

    const dev = {}

    const prod = {}

    let result = common

    if (isDev) {
        result = {...common, ...dev }
    }
    if (isProd) {
        result = {...common, ...prod }
    }
    return result
}
