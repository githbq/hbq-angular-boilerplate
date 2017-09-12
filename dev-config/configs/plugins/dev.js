const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const { METADATA } = require('../constants')
module.exports = [

    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global constants.
     *
     * Environment constants
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     *
     * NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
     */
    new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env.ENV': JSON.stringify(METADATA.ENV),
        'process.env.NODE_ENV': JSON.stringify(METADATA.ENV),
        'process.env.HMR': METADATA.HMR
    }),

    // new DllBundlesPlugin({
    //   bundles: {
    //     polyfills: [
    //       'core-js',
    //       {
    //         name: 'zone.js',
    //         path: 'zone.js/dist/zone.js'
    //       },
    //       {
    //         name: 'zone.js',
    //         path: 'zone.js/dist/long-stack-trace-zone.js'
    //       },
    //     ],
    //     vendor: [
    //       '@angular/platform-browser',
    //       '@angular/platform-browser-dynamic',
    //       '@angular/core',
    //       '@angular/common',
    //       '@angular/forms',
    //       '@angular/http',
    //       '@angular/router',
    //       '@angularclass/hmr',
    //       'rxjs',
    //     ]
    //   },
    //   dllDir: constants.root('dll'),
    //   webpackConfig: webpackMergeDll(commonConfig({env: ENV}), {
    //     devtool: 'cheap-module-source-map',
    //     plugins: []
    //   })
    // }),

    /**
     * Plugin: AddAssetHtmlPlugin
     * Description: Adds the given JS or CSS file to the files
     * Webpack knows about, and put it into the list of assets
     * html-webpack-plugin injects into the generated html.
     *
     * See: https://github.com/SimenB/add-asset-html-webpack-plugin
     */
    // new AddAssetHtmlPlugin([
    //   { filepath: constants.root(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`) },
    //   { filepath: constants.root(`dll/${DllBundlesPlugin.resolveFile('vendor')}`) }
    // ]),

    /**
     * Plugin: NamedModulesPlugin (experimental)
     * Description: Uses file names as module name.
     *
     * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
     */
    // new NamedModulesPlugin(),

    /**
     * Plugin LoaderOptionsPlugin (experimental)
     *
     * See: https://gist.github.com/sokra/27b24881210b56bbaff7
     */
    new LoaderOptionsPlugin({
        debug: true,
        options: {

        }
    }),

    new HotModuleReplacementPlugin()

]
