const fs = require('fs')
const pug = require('pug')
const pathTool = require('path')
module.exports = {
    compile(filePath, data, options, showLog = true) {
        filePath = pathTool.join.apply(pathTool, [].concat(filePath))
        const pugStr = fs.readFileSync(filePath, 'utf-8')
        showLog && console.log(`pug:${pugStr}++++++++++++++++++++++++`, pugStr)
        const fn = pug.compile(pugStr, { pretty: true, ...options })
        const html = fn({ hello: 'hello world', ...data })
        showLog && console.log(`pug:${filePath}++++++++++++++++++++++++`, html)
        return html
    }
}
