const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    //定义入口
    entry: {
        popup: path.join(__dirname, "../src/popup/index.js"),
        background: path.join(__dirname, "../src/background/index.js"),
        options: path.join(__dirname, "../src/options/index.js"),
        content_scripts: path.join(__dirname, "../src/content_scripts/index.js"),
        injected_scripts: path.join(__dirname, "../src/injected_scripts/index.js"),
    },
    //定义输出
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "js/[name].js"
    },
    plugins: [
        //清理插件配置
        new CleanWebpackPlugin({
            path: path.join(__dirname, "../dist")
        }),
        //popup页面输出配置
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../public/popup.html"),
            filename: "html/popup.html",
            chunks: ["popup", "commons"]
        }),
        //options页面输出配置
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../public/options.html"),
            filename: "html/options.html",
            chunks: ["options", "commons"]
        }),
        //抽取css作为单独的文件
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        //拷贝静态资源
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
    //抽取公共的js引用
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
    //babel和sass配置
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    "sass-loader"
                ]
            }
        ]
    }
}