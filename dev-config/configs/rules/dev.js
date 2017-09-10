const helpers = require('../constants')
module.exports = [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [helpers.root('src', 'styles')]
    },
    {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: [helpers.root('src', 'styles')]
    }
]
