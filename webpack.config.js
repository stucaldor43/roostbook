const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
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
                            presets: ["es2015", "react"]
                        }
                    }
                ],
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [ 
                    { 
                        loader: 'babel-loader',
                        options: {
                            presets: ["es2015", "react"]
                        }
                    }
                ],
            },
            // {
            //     test: /\.css$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: 'style-loader'
            //         },
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 modules: true
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /\.useable\.css$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: 'style-loader/useable'
            //         },
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 modules: true
            //             }
            //         }
            //     ]
            // }
        ]
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            title: "RoostBook",
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8080,
            files: ["dist/**/*.*", "stylesheets/**/*.*"],
            server: {
                baseDir: "./",
                index: "index.html"
            }
        })
    ]
}