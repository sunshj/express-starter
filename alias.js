const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

/**
 * 用于webstorm辅助识别module-alias里面的别名,没有实际作用。
 * 需要手动指定:语言框架->Javascript->Webpack->手动到当前js文件
 */
module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('')
        }
    }
}