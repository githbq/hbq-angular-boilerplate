const ExtractTextPlugin = require('extract-text-webpack-plugin')
const helpers = require('../constants')
module.exports = [{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
        }),
        include: [helpers.root('src', 'styles')]
    },
    {
        test: /\.(less|styl)$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!less-loader!stylus-loader'
        }),
        include: [helpers.root('src', 'styles')]
    }
]
