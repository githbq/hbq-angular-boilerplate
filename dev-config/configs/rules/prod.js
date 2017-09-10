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
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!sass-loader'
        }),
        include: [helpers.root('src', 'styles')]
    }
]
