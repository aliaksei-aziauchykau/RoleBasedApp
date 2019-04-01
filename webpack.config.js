const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const { resolve } = require("path");
const dotEnv = require("dotenv");

// Plugins
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const scssRules = require("./configs/webpack.styles.config")();
const WatchTimePlugin = require("webpack-watch-time-plugin");
// //

const ROOT = resolve(__dirname);
const SRC = resolve(ROOT, "./src");

const getVariable = (map, defaultVal = null) => {
    const booleanValueTrue = "true";
    const booleanValueFalse = "false";
    const variable = map(process.env);
    let result = process.env && variable && variable.replace(/('|\s)/g, "") || defaultVal;
    result = result === booleanValueTrue ? true : result;
    result = result === booleanValueFalse ? false : result;
    return result;
};

const CONFIG_PATH = getVariable(env => env.CONFIG_PATH, "env/.env");
const pathToEnv = path.resolve(process.cwd(), CONFIG_PATH);
dotEnv.config({ path: pathToEnv });

const NODE_ENV = getVariable(env => env.NODE_ENV);
const APP_TYPE = getVariable(env => env.APP_TYPE);
const USE_DEVSERVER = getVariable(env => env.USE_DEVSERVER, false);
const STRIPE_PB_KEY = getVariable(env => env.STRIPE_PB_KEY);
const STRIPE_APP_KEY = getVariable(env => env.STRIPE_APP_KEY);
const UI_API_IS_TEST = getVariable(env => env.UI_API_IS_TEST, false);
const HOT_MODULE_REPLACEMENT = getVariable(env => env.HOT_MODULE_REPLACEMENT, false);
const API_SERVER = getVariable(env => env.API_SERVER, null);
const IS_HEROKU_DEPLOY = getVariable(env => env.IS_HEROKU_DEPLOY, false);

console.log("ENV:", HOT_MODULE_REPLACEMENT, NODE_ENV, APP_TYPE, USE_DEVSERVER);

const clientSettings = {
    NODE_ENV,
    STRIPE_PB_KEY,
    STRIPE_APP_KEY,
    API_SERVER,
    IS_HEROKU_DEPLOY,
    // Test
    IS_TEST: UI_API_IS_TEST
}

const isApp = (entryModule, apps) => apps.find(app => APP_TYPE === app) ? entryModule : null;
const isEnv = env => (then, otherwise = null) => NODE_ENV === env ? then : otherwise;
const isDevServer = USE_DEVSERVER;
const isEnvDev = isEnv("development");
const isEnvProd = isEnv("production");
const getPlugin = (flag, plugin) => flag ? plugin : null;

const scssRule = isApp(true, ["react", "angular", "native", "market"])
    ? scssRules.extractScssAllRule
    : scssRules.nonextractScssAllRule

console.log(NODE_ENV, APP_TYPE, USE_DEVSERVER);

const commonConfig = {
    mode: NODE_ENV,
    watchOptions: {
        aggregateTimeout: 1000,
        poll: 2000,
        ignored: ["server", "db", "node_modules"]
    },
    context: SRC,
    resolve: {
        extensions: [".ts", ".js", ".jsx"],
        alias: {
            "root_module": path.resolve(__dirname, "src")
        },
    },
    plugins: [
        new CompressionPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            jQuery: "jquery",
            Popper: ["popper.js", "default"],
            popper: ["popper.js", "default"],
            Rx: "rxjs/Rx",
            _: "lodash"
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "chunkcss[id].css"
        }),
        new WatchTimePlugin({
            noChanges: {
              detect: true,
              report: true
            },
            logLevel: "warn"
          })
        // isApp(new ExtractTextPlugin("styles.bundle.css"), ["react, angular, native, market, site"])
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loaders: [
                    "ts-loader",
                    "angular2-template-loader"
                ]
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["env"],
                    plugins: [
                        "dynamic-import-webpack",
                        "transform-decorators-legacy",
                        "transform-class-properties",
                        "transform-object-rest-spread",
                    ]
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.css$/,
                use: [
                    "css-hot-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            ...scssRule,
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "[name].[ext]"
                    }
                }]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: "image-webpack-loader",
                enforce: "pre"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]"
                    }
                }]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: "~",
            name: true,
            cacheGroups: {
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -10,
                    chunks: "all"
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
}

const devConfig = {
    output: {
        filename: "[name].bundle.js",
        sourceMapFilename: "[file].map",
        chunkFilename: "[name].chunk.js"
    },
    plugins: [
        // new BundleAnalyzerPlugin({analyzerPort: 3010}),
        new webpack.DefinePlugin({
            isDevelopment: true,
            clientSettings: JSON.stringify(clientSettings)
        }),
        getPlugin(HOT_MODULE_REPLACEMENT, new webpack.HotModuleReplacementPlugin())
    ],
    devtool: "source-map"
}
const devServerConfig = {
    output: {
        filename: "[name].bundle.js",
        sourceMapFilename: "[file].map",
        chunkFilename: "[name].chunk.js"
    },
    plugins: [
        // new BundleAnalyzerPlugin({analyzerPort: 3011}),
        new webpack.DefinePlugin({
            isDevelopment: true,
            clientSettings: JSON.stringify(clientSettings)
        }),
        getPlugin(HOT_MODULE_REPLACEMENT, new webpack.HotModuleReplacementPlugin()),

    ].filter(Boolean),
    devServer: {
        hot: true,
        contentBase: "./dist/dev",
        port: 3000,
        publicPath: "/",
        historyApiFallback: true
    },
    devtool: "source-map"
}
const prodConfig = {
    output: {
        filename: "[name].bundle.js",
        sourceMapFilename: "[file].map",
        chunkFilename: "[name].chunk.js"
    },
    plugins: [
        // new BundleAnalyzerPlugin({analyzerPort: 3012}),
        new webpack.DefinePlugin({
            isDevelopment: false,
            clientSettings: JSON.stringify(clientSettings)
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    devtool: "source-map"
};

const getConfig = (additionalConfig) => {
    let baseConfig = isEnvDev(devConfig, prodConfig);
    baseConfig = isDevServer ? devServerConfig : baseConfig;
    const config = merge(commonConfig, baseConfig, additionalConfig);
    return config;
}

const configs = require("./configs/webpack.apps.config")(isEnvDev);
module.exports = [
    isApp(getConfig(configs.site), ["site", "any"])
].filter(Boolean)