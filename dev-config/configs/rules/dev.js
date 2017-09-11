const helpers = require('../constants')
module.exports = [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [helpers.root('src', 'styles')]
    },
    {
        test: /\.(less|styl)$/,
        use: ['style-loader', 'css-loader', 'less-loader', 'stylus-loader'],
        include: [helpers.root('src', 'styles')]
    }
]
