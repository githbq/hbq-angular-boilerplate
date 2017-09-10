/**
 * Webpack Plugins
 *
 * problem with copy-webpack-plugin
 */
const AssetsPlugin = require('assets-webpack-plugin')
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
const HtmlElementsPlugin = require('../../html-elements-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ngcWebpack = require('ngc-webpack')
const CompressionPlugin = require('compression-webpack-plugin')
    //const PreloadWebpackPlugin = require('preload-webpack-plugin')

const helpers = require('../constants')
const createHtmlPlugin = require('./createHtmlPlugin')
const plugins = [
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0,
    }),
    // Use for DLLs
    // new AssetsPlugin({
    //   path: helpers.root('dist'),
    //   filename: 'webpack-assets.json',
    //   prettyPrint: true
    // }),

    /**
     * Plugin: ForkCheckerPlugin
     * Description: Do type checking in a separate process, so webpack doesn't need to wait.
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
     */
    new CheckerPlugin(),
    /**
     * Plugin: CommonsChunkPlugin
     * Description: Shares common code between the pages.
     * It identifies common modules and put them into a commons chunk.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
     * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
     */
    new CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
    }),
    /**
     * This enables tree shaking of the vendor modules
     */
    // new CommonsChunkPlugin({
    //   name: 'vendor',
    //   chunks: ['main'],
    //   minChunks: module => /node_modules/.test(module.resource)
    // }),
    /**
     * Specify the correct order the scripts will be injected in
     */
    // new CommonsChunkPlugin({
    //   name: ['polyfills', 'vendor'].reverse()
    // }),
    // new CommonsChunkPlugin({
    //   name: ['manifest'],
    //   minChunks: Infinity,
    // }),

    /**
     * Plugin: ContextReplacementPlugin
     * Description: Provides context to Angular's use of System.import
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
     * See: https://github.com/angular/angular/issues/11580
     */
    new ContextReplacementPlugin(
        /**
         * The (\\|\/) piece accounts for path separators in *nix and Windows
         */
        /(.+)?angular(\\|\/)core(.+)?/,
        helpers.root('src'), // location of your src
        {
            /**
             * Your Angular Async Route paths relative to this root directory
             */
        }
    ),

    /**
     * Plugin: CopyWebpackPlugin
     * Description: Copy files and directories in webpack.
     *
     * Copies project static assets.
     *
     * See: https://www.npmjs.com/package/copy-webpack-plugin
     */
    new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets' },
        { from: 'src/meta' }
    ], !helpers.__DEV__ ? { ignore: ['mock-data/**/*'] } : undefined),

    /*
     * Plugin: PreloadWebpackPlugin
     * Description: Preload is a web standard aimed at improving
     * performance and granular loading of resources.
     *
     * See: https://github.com/GoogleChrome/preload-webpack-plugin
     */
    //new PreloadWebpackPlugin({
    //  rel: 'preload',
    //  as: 'script',
    //  include: ['polyfills', 'vendor', 'main'].reverse(),
    //  fileBlacklist: ['.css', '.map']
    //}),
    //new PreloadWebpackPlugin({
    //  rel: 'prefetch',
    //  as: 'script',
    //  include: 'asyncChunks'
    //}),

    /*
     * Plugin: HtmlWebpackPlugin
     * Description: Simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    // new HtmlWebpackPlugin({
    //     template: 'src/index.html',
    //     title: helpers.METADATA.title,
    //     chunksSortMode: function(a, b) {
    //         const entryPoints = ["inline", "polyfills", "sw-register", "styles", "vendor", "main"]
    //         return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0])
    //     },
    //     metadata: helpers.METADATA,
    //     inject: 'body'
    // }),
    createHtmlPlugin('index'),
    /**
     * Plugin: ScriptExtHtmlWebpackPlugin
     * Description: Enhances html-webpack-plugin functionality
     * with different deployment options for your scripts including:
     *
     * See: https://github.com/numical/script-ext-html-webpack-plugin
     */
    new ScriptExtHtmlWebpackPlugin({
        sync: /polyfills|vendor/,
        defaultAttribute: 'async',
        preload: [/polyfills|vendor|main/],
        prefetch: [/chunk/]
    }),

    /**
     * Plugin: HtmlElementsPlugin
     * Description: Generate html tags based on javascript maps.
     *
     * If a publicPath is set in the webpack output configuration, it will be automatically added to
     * href attributes, you can disable that by adding a "=href": false property.
     * You can also enable it to other attribute by settings "=attName": true.
     *
     * The configuration supplied is map between a location (key) and an element definition object (value)
     * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
     *
     * Example:
     *  Adding this plugin configuration
     *  new HtmlElementsPlugin({
     *    headTags: { ... }
     *  })
     *
     *  Means we can use it in the template like this:
     *  <%= webpackConfig.htmlElements.headTags %>
     *
     * Dependencies: HtmlWebpackPlugin
     */
    new HtmlElementsPlugin({
        headTags: require('../head-config.common')
    }),

    /**
     * Plugin LoaderOptionsPlugin (experimental)
     *
     * See: https://gist.github.com/sokra/27b24881210b56bbaff7
     */
    new LoaderOptionsPlugin({}),

    new ngcWebpack.NgcWebpackPlugin({
        /**
         * If false the plugin is a ghost, it will not perform any action.
         * This property can be used to trigger AOT on/off depending on your build target (prod, staging etc...)
         *
         * The state can not change after initializing the plugin.
         * @default true
         */
        disabled: !helpers.AOT,
        tsConfig: helpers.root('tsconfig.webpack.json'),
    }),

    /**
     * Plugin: InlineManifestWebpackPlugin
     * Inline Webpack's manifest.js in index.html
     *
     * https://github.com/szrenwei/inline-manifest-webpack-plugin
     */
    new InlineManifestWebpackPlugin(),
]
module.exports = plugins
