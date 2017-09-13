const constants = require('../constants')
module.exports = [
  {
    test: /\.ts$/,
    enforce: 'pre',
    loader: 'tslint-loader',
    options: {
      emitErrors: true,
      failOnHint: true,
      typeCheck: false
    }
  },
  {
    test: /\.ts$/,
    use: [{
      loader: 'ng-router-loader',
      options: {
        loader: 'async-import',
        genDir: 'compiled',
        aot: constants.AOT
      }
    },
    {
      loader: 'awesome-typescript-loader',
      options: {
        configFileName: 'tsconfig.webpack.json',
        useCache: constants.__DEV__
      }
    },
    {
      loader: 'ngc-webpack',
      options: {
        disable: !constants.AOT,
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
    exclude: [constants.root('src', 'styles')]
  },
  {
    test: /\.(less|styl)$/,
    use: ['to-string-loader', 'css-loader', 'less-loader', 'stylus-loader'],
    exclude: [constants.root('src', 'styles')]
  },
  {
    test: /\.html$/,
    use: 'raw-loader',
    exclude: [constants.root('src/index.html')]
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
