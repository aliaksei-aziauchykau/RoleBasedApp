const precss = require("precss");
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const getStyleRules = () => {
    const nonAngularRule = [{
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["css-hot-loader"].concat(ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
                {
                    loader: "css-loader"
                },
                {
                    loader: "postcss-loader",
                    options: {
                        plugins: () => [
                            precss,
                            autoprefixer
                        ]
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        outputStyle: "compressed"
                    }
                }
            ]
        }))
    }]

    const angularRule = [{
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            //"css-hot-loader",
            {
                loader: "css-to-string-loader"
            },
            // {
            //     loader: "style-loader"
            // },
            {
                loader: "css-loader"
            },
            {
                loader: "sass-loader",
                options: {
                    outputStyle: "compressed"
                }
            }
        ]
    }];

    return {
        extractScssAllRule: nonAngularRule,
        nonextractScssAllRule: angularRule
    }
}

module.exports = getStyleRules