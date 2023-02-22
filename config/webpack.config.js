const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        popup: path.join(__dirname, "../src/popup/index.js"),
        background: path.join(__dirname, "../src/background/index.js"),
        options: path.join(__dirname, "../src/options/index.js"),
        content_scripts: path.join(__dirname, "../src/content_scripts/index.js"),
        injected_scripts: path.join(__dirname, "../src/injected_scripts/index.js"),
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js"
    },
    plugins: [
        new CleanWebpackPlugin({
            path: path.join(__dirname, "../dist")
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../public/popup.html"),
            filename: "popup.html",
            chunks: ["popup", "commons"]
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../public/options.html"),
            filename: "options.html",
            chunks: ["options", "commons"]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public/images'),
                    to: path.resolve(__dirname, '../dist/images')
                },
                {
                    from: path.resolve(__dirname, '../public/_locales'),
                    to: path.resolve(__dirname, '../dist/_locales')
                },
                {
                    from: path.resolve(__dirname, '../public/manifest.json'),
                    to: path.resolve(__dirname, '../dist/manifest.json')
                }
            ]
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    minSize: 0,
                    name: "commons"
                }
            }
        },
        minimize: true,
        minimizer: [new TerserWebpackPlugin({extractComments: false})]
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "src": path.resolve(__dirname, "../src"),
            "public": path.resolve(__dirname, "../public"),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
}