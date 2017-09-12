const ExtractTextPlugin = require('extract-text-webpack-plugin')
const constants = require('../constants')
module.exports = [{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
        }),
        include: [constants.root('src', 'styles')]
    },
    {
        test: /\.(less|styl)$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!less-loader!stylus-loader'
        }),
        include: [constants.root('src', 'styles')]
    }
]
