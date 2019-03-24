const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const enabledSourceMap = (process.env.NODE_ENV === 'development');
module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        simple_responsible_slider: './src/index.js',
        style: './src/simple-slider.scss',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        "@babel/preset-env",
                                        {
                                            "useBuiltIns": "usage",
                                            "targets": "> 0.25%, not dead"
                                        }
                                    ]
                                ]
                            }
                        },
                ]
            },
            {
                test: /\.scss/, // 対象となるファイルの拡張子
                use: ExtractTextPlugin.extract({
                  use:
                    [
                    // CSSをバンドルするための機能
                    {
                      loader: 'css-loader',
                      options: {
                        // オプションでCSS内のurl()メソッドの取り込みを禁止する
                        url: false,
                        // ソースマップの利用有無
                        sourceMap: enabledSourceMap,

                        // 0 => no loaders (default);
                        // 1 => postcss-loader;
                        // 2 => postcss-loader, sass-loader
                        importLoaders: 2
                      },
                    },
                    {
                      loader: 'sass-loader',
                      options: {
                        // ソースマップの利用有無
                        sourceMap: enabledSourceMap,
                      }
                    }
                  ]
                }),
              },
        ]
    },
    plugins: [
        new ExtractTextPlugin('simple-slider.css'),
        new BundleAnalyzerPlugin(),
        new StatsPlugin('stats.json', {
          chunkModules: true,
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        openPage: "index.html",
        contentBase: path.join(__dirname, "public"),
        watchContentBase: true,
        port: 8080,
    },
    output: {
        publicPath: "/",
        path: path.join(__dirname, "dist"),
        filename: '[name].js',
        library: ["lib"],
        libraryTarget: 'umd'
    }
};
