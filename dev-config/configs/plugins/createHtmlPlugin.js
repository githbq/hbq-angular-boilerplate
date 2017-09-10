const pathTool = require('path')
const pug = require('../../compiler/pug')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { TEMPLATE_PATH, METADATA, TEMPLATE_PATH_PUG, root } = require('../constants')
module.exports = function createHtmlPlugin(name, templateUrl = null) {
    const chunks = ['inline', 'polyfills', 'sw-register', 'styles', 'vendor', 'main']
    templateUrl = templateUrl || TEMPLATE_PATH_PUG
    const data = {
        title: METADATA.title,
        __DEV__: METADATA.__DEV__,
        favIcon: METADATA.favicon,
    }
    let templateContent = undefined
    if (templateUrl && /.pug$/.test(templateUrl)) {
        templateUrl = pathTool.isAbsolute(templateUrl) ? templateUrl : root(templateUrl)
        templateContent = pug.compile(templateUrl, data)
            //如果有templateContent 则不能有templateUrl 会有冲突
        templateUrl = null
    }
    // 生成html文件
    return new HtmlWebpackPlugin({
        ...(!METADATA.__DEV__ ? {
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            hash: true, // 引入js/css的时候加个hash, 防止cdn的缓存问题
        } : {}),
        filename: `${name}.html`,
        // template: templateUrl,
        templateContent,
        templateUrl,
        inject: 'body',
        chunks: chunks.concat(name), //选定需要插入的chunk名,
        chunksSortMode: 'dependency',
        data
    })
}
