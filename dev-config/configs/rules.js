const helpers = require('./constants');
const rules = [

    /**
     * Typescript loader support for .ts
     *
     * Component Template/Style integration using `angular2-template-loader`
     * Angular 2 lazy loading (async routes) via `ng-router-loader`
     *
     * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
     * order of the loader matter.
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader
     * See: https://github.com/TheLarkInn/angular2-template-loader
     * See: https://github.com/shlomiassaf/ng-router-loader
     */
    {
        test: /\.ts$/,
        use: [{
                /**
                 *  MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
                 */
                loader: 'ng-router-loader',
                options: {
                    loader: 'async-import',
                    genDir: 'compiled',
                    aot: AOT
                }
            },
            {
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: 'tsconfig.webpack.json',
                    useCache: !isProd
                }
            },
            {
                loader: 'ngc-webpack',
                options: {
                    disable: !AOT,
                }
            },
            {
                loader: 'angular2-template-loader'
            }
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
    },

    /**
     * To string and css loader support for *.css files (from Angular components)
     * Returns file content as string
     *
     */
    {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
        exclude: [helpers.root('src', 'styles')]
    },

    /**
     * To string and sass loader support for *.scss files (from Angular components)
     * Returns compiled css content as string
     *
     */
    {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
        exclude: [helpers.root('src', 'styles')]
    },

    /**
     * Raw loader support for *.html
     * Returns file content as string
     *
     * See: https://github.com/webpack/raw-loader
     */
    {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
    },

    /**
     * File loader for supporting images, for example, in CSS files.
     */
    {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
    },

    /* File loader for supporting fonts, for example, in CSS files.
     */
    {
        test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
        use: 'file-loader'
    }

]
module.exports = rules
