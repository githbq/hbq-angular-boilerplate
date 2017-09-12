const constants = require('./constants')
const entry = {
  'polyfills': './src/polyfills.browser.ts',
  'index': constants.AOT ? './src/main.browser.aot.ts' : './src/main.browser.ts'
}

const pathTool = require('path')
const color = require('cli-color')
const globby = require('globby')

const { ROOT_PATH, APP_PATH } = require('./constants')

const appPath = './src/apps'
const basePath = `${appPath}/**`
const apps = globby.sync(
  [
    `${basePath}/*.ts`,
    `${basePath}/*.html`,
    `${basePath}/*.pug`,
    `!${appPath}/index.ts`,
    `!${basePath}/_*/**/*`,
    `!${basePath}/_*.*`,
    `!${basePath}/*.test.*`,
    `!${basePath}/components/**/*`,
    `!${basePath}/routes/**/*`,
    `!${basePath}/common/**/*`,
    `!${basePath}/assets/**/*`,
    `!${basePath}/data/**/*`
  ], { cwd: ROOT_PATH }
)

const entryObject = {}
const templateObject = {}

const regExt = /\.\w*$/
//模板的正则
const regTemplate = /-template$/
//模板的后缀
const templateSuffix = '-template'
apps.forEach(n => {
  let key = pathTool.relative(`${APP_PATH}/apps`, n)
  key = '/' + key
  key = key.replace(/^(\.|\\|\/)*/, '').replace(regExt, '')
  if (/\.(html|pug)$/.test(n)) {
    //如果是html文件 则以-template结尾
    key += templateSuffix
    templateObject[key] = n
    return
  }
  entryObject[key] = n.replace(regExt, '')
})
console.log('entryObject', color.green(JSON.stringify(entryObject)))
module.exports = {
  regTemplate,
  templateSuffix,
  get: ({ isDev, isCommon = true, isProd } = {}) => {
    return {
      //只包含入口tsx
      apps: {
        ...entry,
        ...entryObject
      },
      //包含入口tsx  以及 template
      all: {
        index: './src/index',
        ...entryObject,
        ...templateObject
      }
    }
  }
}
