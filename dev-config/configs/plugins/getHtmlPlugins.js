const pathTool = require('path')
const pug = require('../../templateCompilers/pug')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { TEMPLATE_PATH, METADATA, TEMPLATE_PATH_PUG, root } = require('../constants')
//模板的后缀
const { templateSuffix, regTemplate, ...entry } = require('../entry')
//所有entry 包含模板
const entries = entry.get().all
//chunks
const chunks = ['inline', 'polyfills', 'sw-register', 'styles', 'vendor']
//factory
function createHtmlPlugin(name, isDev, templateUrl = null) {
  templateUrl = templateUrl || TEMPLATE_PATH_PUG
  const data = {
    ...METADATA
  }
  let templateContent = undefined
  if (templateUrl && /.pug$/.test(templateUrl)) {
    templateUrl = pathTool.isAbsolute(templateUrl) ? templateUrl : root(templateUrl)
    const filePath = templateUrl
    templateContent = function (templateParams, compilation, callback) {
      const result = pug.compile(filePath, { ...templateParams, data })
      return result
    }
    //如果有templateContent 则不能有templateUrl 会有冲突
    templateUrl = null
  }
  // 生成html文件
  return new HtmlWebpackPlugin({
    ...(!isDev ? {
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      hash: true, // 引入js/css的时候加个hash, 防止cdn的缓存问题
    } : {}),
    filename: `${name}.html`,
    ...(templateUrl ?
      {
        template: templateUrl
      }
      : {}
    ),
    templateContent,

    inject: 'body',
    chunks: chunks.concat(name), //选定需要插入的chunk名,
    chunksSortMode: 'dependency',
    data
  })
}
module.exports = {
  //通过entries上设计的入口配置，生成html插件数组
  getHtmlPlugins(isDev = false) {
    //entries.all 同时包含 entries 以及 template
    return Object.keys(entries)
      //排除掉模板
      .filter(key => !regTemplate.test(key) && chunks.indexOf(key) < 0)
      .map(key => {
        return createHtmlPlugin(key, isDev, entries[`${key}${templateSuffix}`])
      })
  }
}
