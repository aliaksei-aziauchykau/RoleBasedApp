const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

// Apps.
const buildAppsConfig = (isEnvDev) => {
    const getServerPath = (folder) => `../server/public/build/${folder}`;
    const siteAppConfig = {
        entry: {
            polyfills: ["babel-polyfill", "./apps/site-app/polyfills.ts"],
            app: ["./apps/site-app/index.ts"],
            vendors: [
                "./apps/site-app/vendor.ts"
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./apps/site-app/index.html",
                filename: "index.html"
            })
        ],
        output: { 
            path: path.resolve(__dirname, getServerPath("site-app")),
            publicPath: "/build/site-app/",
        }
    }

    return {
        site: siteAppConfig
    }
}


module.exports = buildAppsConfig