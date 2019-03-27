// 由于 weback 是基于Node 进行构建的，所以 webpack 的配置文件中，任何合法的 Node 代码都是支持的
const path = require('path');
// 启用热更新的第二步
const webpack = require('webpack');

const {VueLoaderPlugin}  = require('vue-loader')

// 只要是插件 ，都一定要 放到 plugins 节点中去
// 在内存中，根据指定的模板页面，生成 一份内存中的首页，同时自动把打包好的bundle 注入到页面的底部
const htmlWebpackPlugin = require('html-webpack-plugin');

// 这个配置文件，其实就是一个 js 文件，通过 Node 中的模块操作，向外暴露了一个 配置对象
// 当以命令行形式运行 webpack 或者 webpack-dev-server的时候，工具会发现，我们并没有提供要打包的文件的入口 和出口 文件
// 此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个配置对象，然后根据这个对象，进行打包构建
module.exports = {
// 
    entry: path.join(__dirname,'./src/main.js'),// 入口文件，表示要使用webpack 打包哪个文件
    output:{ // 输出文件相关的配置
        path: path.join(__dirname,'./dist'),//指定打包好的文件，输出到哪个目录中去
        filename: 'bundle.js' // 这是指定输出的文件的名称
    },
    mode: 'development',
    devServer:{ // 这是配置dev-server 命令参数的第二种形式，相对来说，这种方式麻烦一些
        //--open --port 3000 --contentBase src --hot
        open:true,// 自动打开浏览器
        port:3000,// 设置启动时候的运行端口
        contentBase: 'src', // 指定托管的根目录
        hot:true // 启用热更新的第一步
    },
    plugins:[ // 配置插件的节点
        new webpack.HotModuleReplacementPlugin(), // new 一个热更新的模块对象，这是启用热更新的第三步

        // 这个插件的两个作用：
        // 1. 自动在内存中指定页面生成一个内存的页面
        // 2. 自动，把打包好的 bundle.js 追加到页面中去
        new htmlWebpackPlugin({ // 创建一个 在内存中 生成HTML 页面的插件
            template:path.join(__dirname,'./src/index.html'), //指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename:'index.html' // 指定生成的页面的名称
        }), 
        new VueLoaderPlugin(),
    ],
    module:{ // 这个节点，用于配置 所有第三方模块 加载器
        rules:[ // 所有第三方模块的 匹配规则
            { test: /\.css$/, use: ['style-loader','css-loader'] }, // 配置处理.css文件的第三loader规则
            { test: /\.less$/,use: ['style-loader','css-loader','less-loader']},// 配置处理.less文件的第三方loader规则
            { test: /\.scss$/,use: ['style-loader','css-loader','sass-loader']},// 配置处理.scss文件的第三方loader规则
            // limit 给定的值，是图片的大小，单位是byte，如果我们引用的图片 大于或等于 给定的limit值，则不会被转为 base64的字符串
            // 如果图片小于给定的limit 值，则会被转为base64的字符串
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use:'url-loader?limit=30000&name=[hash:8]-[name].[ext]'}, // 配置处理图片文件的第三方loader规则
            { test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'}, //处理字体文件的loader
            { test:/\.js$/, use:'babel-loader',exclude: /node_modules/}, // 配置babel 来转换 高级的ES语法
            { test:/\.vue$/,use:'vue-loader'}, // 处理 .vue 文件的loader
        ]
    },
    resolve:{
        alias:{ // 修改 Vue 被导入时候的包的路径
            // "vue$":"vue/dist/vue.js"
        }
    }

}


// 当我们在控制台，直接输入webpack 命令执行的时候，webpack做了以下几步：
// 1. 首先，webpack 发现，我们并没有通过命令的形式，给它指定入口和出口
// 2. webpack 就会去项目的 根目录中，查找一个叫做 'webpack.config.js'的配置文件
// 3. 当找到配置文件后，webpack会去解析执行这个配置文件，当解析执行完配置文件后，就得到了配置文件中导出的配置对象
// 4. 当webpack拿到配置对象后，就拿到了配置对象中，指定的入口和出口，然后进行打包构建；




// 使用 webpack-dev-server  这个工具，来实现自动打包编译的功能
//  1. 运行 npm i webpack-dev-server -D 把这个工具安装到项目的本地开发依赖
//  2. 安装完毕后，这个工具的用法，和 webapck 命令的用法，完全一样
//  3. 由于，我们是在项目中，本地安装的webpack-dev-server，所以，无法把它当作哦们的脚本命令，在cmd终端中直接运行（之后哪些安装到全局 -g的工具，才能在终端中正常执行）
//  4. 注意： webpack-dev-server 这个工具，如果想要正常运行，要求，在本地项目中，必须安装webpack
//  5. webpack-dev-server 帮我们打包生成的 bundle.js文件，并没有存放到 实际的 物理磁盘上;而是直接托管到了电脑的内存中，所以，我们在项目根目录中，根本找不到这个打包好的 bundle.js
//  6. 我们可以认为，webpack-dev-server 把打包好的文件，以一种虚拟的形式，托管到了 咱们项目的 根目录 中，虽然我们看不到它，但是，可以认为 和 dist src node_modules 平级，有一个看不见的文件，叫做 bundle.js


// package.json scripts dev2 中webpack-dev-server的参数 --open --port 3000 --contentBase src --hot 
 // --open 打开浏览器
 // --port 3000 指定打开的端口
 // --contentBase src 指定打开的默认首页
 // --hot 热加载，变更的文件以增量的方式更新


 // webpack-dev-server的参数的第二种方式在webpack.config.js中配置，这种方式不推荐
//  // 启用热更新的第二步
// const webpack = require('webpack');

//  devServer:{ // 这是配置dev-server 命令参数的第二种形式，相对来说，这种方式麻烦一些
//     //--open --port 3000 --contentBase src --hot
//     open:true,// 自动打开浏览器
//     port:3000,// 设置启动时候的运行端口
//     contentBase: 'src', // 指定托管的根目录
//     hot:true // 启用热更新的第一步
// },
// plugins:[ // 配置插件的节点
//     new webpack.HotModuleReplacementPlugin() // new 一个热更新的模块对象，这是启用热更新的第三步
// ]


