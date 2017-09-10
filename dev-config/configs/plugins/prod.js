const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin')
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const helpers = require('../constants')
const { METADATA } = helpers
module.exports = [

    new ModuleConcatenationPlugin(),

    /**
     * Webpack plugin to optimize a JavaScript file for faster initial load
     * by wrapping eagerly-invoked functions.
     *
     * See: https://github.com/vigneshshanmugam/optimize-js-plugin
     */
    new OptimizeJsPlugin({
        sourceMap: false
    }),

    /**
     * Plugin: ExtractTextPlugin
     * Description: Extracts imported CSS files into external stylesheet
     *
     * See: https://github.com/webpack/extract-text-webpack-plugin
     */
    new ExtractTextPlugin('[name].[contenthash].css'),

    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global helpers.
     *
     * Environment helpers
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
    new DefinePlugin({
        'NODE_ENV': JSON.stringify(METADATA.NODE_ENV),
        'HMR': METADATA.HMR,
        'AOT': METADATA.AOT,
        'process.env.NODE_ENV': JSON.stringify(METADATA.NODE_ENV),
        'process.env.HMR': METADATA.HMR
    }),

    /**
     * Plugin: UglifyJsPlugin
     * Description: Minimize all JavaScript output of chunks.
     * Loaders are switched into minimizing mode.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     *
     * NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
     */
    new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
            ie8: false,
            ecma: 6,
            warnings: true,
            mangle: true, // debug false
            output: {
                comments: false,
                beautify: false, // debug true
            }
        },
        warnings: true,
    }),

    /**
     * Plugin: NormalModuleReplacementPlugin
     * Description: Replace resources that matches resourceRegExp with newResource
     *
     * See: http://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
     */
    new NormalModuleReplacementPlugin(
        /(angular2|@angularclass)((\\|\/)|-)hmr/,
        helpers.root('config/empty.js')
    ),

    new NormalModuleReplacementPlugin(
        /zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
        helpers.root('config/empty.js')
    ),

    new HashedModuleIdsPlugin(),

    /**
     * AoT
     * Manually remove compiler just to make sure it's gone
     */
    (METADATA.AOT ? (
        new NormalModuleReplacementPlugin(
            /@angular(\\|\/)compiler/,
            helpers.root('config/empty.js')
        )
    ) : (new LoaderOptionsPlugin({}))),

    /**
     * Plugin: CompressionPlugin
     * Description: Prepares compressed versions of assets to serve
     * them with Content-Encoding
     *
     * See: https://github.com/webpack/compression-webpack-plugin
     */
    //  install compression-webpack-plugin
    // new CompressionPlugin({
    //   regExp: /\.css$|\.html$|\.js$|\.map$/,
    //   threshold: 2 * 1024
    // })

    /**
     * Plugin LoaderOptionsPlugin (experimental)
     *
     * See: https://gist.github.com/sokra/27b24881210b56bbaff7
     */
    new LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {

            /**
             * Html loader advanced options
             *
             * See: https://github.com/webpack/html-loader#advanced-options
             */
            // TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
            htmlLoader: {
                minimize: true,
                removeAttributeQuotes: false,
                caseSensitive: true,
                customAttrSurround: [
                    [/#/, /(?:)/],
                    [/\*/, /(?:)/],
                    [/\[?\(?/, /(?:)/]
                ],
                customAttrAssign: [/\)?\]?=/]
            },

        }
    }),

    /**
     * Plugin: BundleAnalyzerPlugin
     * Description: Webpack plugin and CLI utility that represents
     * bundle content as convenient interactive zoomable treemap
     *
     * `npm run build:prod -- --env.analyze` to use
     *
     * See: https://github.com/th0r/webpack-bundle-analyzer
     */

]
