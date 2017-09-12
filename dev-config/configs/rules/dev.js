const constants = require('../constants')
module.exports = [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [constants.root('src', 'styles')]
    },
    {
        test: /\.(less|styl)$/,
        use: ['style-loader', 'css-loader', 'less-loader', 'stylus-loader'],
        include: [constants.root('src', 'styles')]
    }
]
