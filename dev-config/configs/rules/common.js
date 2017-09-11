const helpers = require('../constants')
module.exports = [{
        test: /\.ts$/,
        use: [{
                loader: 'ng-router-loader',
                options: {
                    loader: 'async-import',
                    genDir: 'compiled',
                    aot: helpers.AOT
                }
            },
            {
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: 'tsconfig.webpack.json',
                    useCache: helpers.__DEV__
                }
            },
            {
                loader: 'ngc-webpack',
                options: {
                    disable: !helpers.AOT,
                }
            },
            {
                loader: 'angular2-template-loader'
            }
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
    },
    {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
        exclude: [helpers.root('src', 'styles')]
    },
    {
        test: /\.(less|styl)$/,
        use: ['to-string-loader', 'css-loader', 'less-loader','stylus-loader'],
        exclude: [helpers.root('src', 'styles')]
    },
    {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
    },
    {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
    },
    {
        test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
        use: 'file-loader'
    }
]
