var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var htmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'


//遍历web下的所有目录，并组合成入口文件对象
var entry = {}
var dirpath = path.join(__dirname, 'web');
var dirs = fs.readdirSync(dirpath);
dirs.forEach(function(file) {
    if (fs.lstatSync(dirpath + '/' + file).isDirectory()) {
        entry[file] = [hotMiddlewareScript, './web/' + file + '/index.js']
    }
})

var config = {
    //设置默认解析的文件后缀
    resolve: {
        extensions: ['', '.js', '.vue', '.json', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'c': path.resolve(__dirname, "components/basic"),
            'b': path.resolve(__dirname, "components/business"),
            'p': path.resolve(__dirname, "public"),
        }
    },

    //遍历的入口文件
    entry: entry,

    //打包后的文件生成地址
    output: {
        path: path.join(__dirname, 'views'),
        filename: '[name]/js/[name]_[hash:7].js',
        chunkFilename:'chunk/[name]/[id]_[chunkhash:7].js',
        publicPath: '/'
    },

    //模块解析器
    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') },
            //{test:/\.css$/,loader:'style!css!autoprefixer'},
            //{test:/\.less$/,loader:'style!css!autoprefixer!less'},
            { test: /\.(png|gif|jpg)$/, loader: 'url?limit=11111=&name=public/images/[name]_[hash:7].[ext]' },
            { test: /\.(svg|ttf|eot|woff|woff2)/, loader: 'url?limit=100000&name=public/fonts/[name].[ext]' },
        ]
    },

    //vue的模块解析器
    vue: {
        loaders: {
            //css:'style!css!autoprefixer!less'
            less: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!less-loader')
        }
    },

    //其它插件
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        //压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        //提取样式为单独的文件
        new ExtractTextPlugin('[name]/css/[name]_[hash:7].css'),
    ]

}

//根据web下的项目，遍历其中的index.html模板，生成引入相应js模块的html文件
dirs.forEach(function(file) {
    if (fs.lstatSync(dirpath + '/' + file).isDirectory()) {
        //chunks设置为对象
        var c = [];
        c.push(file);
        config.plugins.push(
            new htmlWebpackPlugin({
                filename: file + '/index.html',
                template: path.join(__dirname, 'web/' + file + '/index.html'),
                inject: true,
                chunks: c
            })
        )
    }
})

module.exports = config
