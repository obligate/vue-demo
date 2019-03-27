// 这是main.js 是我们项目的JS入口文件

// 1. 导入 Jquery
// import ** from *** 是ES6中导入模块的方式
// 由于 ES6 的代码，太高级了，浏览器解析不了，所以，这一行执行会报错
import $ from 'jquery';
// const $ = require('jquery')

// 使用import语法，导入css样式表
import './css/index.css';
import './css/index.less'; // npm i less less-loader -D
import './css/index.scss'; // npm i sass-loader -D / cnpm i node-sass -D
// 注意： 如果要通过路径的形式，去引入 node_modules 中相关的文件，可以直接省略 路径前面的node_modules 这一层目录，直接写 包的名称，然后后面跟上具体的文件路径
// 不写 node_modules 这一层目录，默认就会去 node_modules 中查找
import 'bootstrap/dist/css/bootstrap.css';

// 注意： webpack，默认只能打包处理 js 类型的问题，无法处理 其他的非 JS 类型的文件；
// 如果要处理 非JS 类型的文件，我们需要手工安装一些合适 第三方 loader 加载器；
// 1. 如果想要打包处理 CSS 文件，需要安装 npm i style-loader css-loader -D
// 2. 打开webpack.config.js 这个配置文件，在里面，新增一个配置节点，叫做 module , 它是一个对象； 
// 在这个 module 对象身上，有个 rules 属性是一个数组；在这个数组中，存放了所有第三方文件的匹配和处理规则；

// 注意： webpack 处理第三方文件类型的过程：
// 1. 发现这个要处理的文件不是js文件，然后就去 配置文件中，查找有没有对应的第三方loader 规则
// 2. 如果能找到对应的规则，就会调用对应的loader 处理这种文件类型；
// 3. 在调用loader 的时候，是从后往前调用的；
// 4. 当最后一个loader 调用完毕，会把处理的结果，直接交给 webpack 进行打包合并，最终输出到 bundle.js 中去

$(function(){
    $('li:odd').css('backgroundColor','yellow');
    $('li:even').css('backgroundColor',function(){
        return '#' + 'D97634';
    });
});

// 1. webpack 能够处理 JS 文件的互相依赖关系
// 2. webpack 能够处理 JS 的兼容问题，把高级的浏览不识别的语法，转为低级的，浏览器能正常识别的语法
// webpack 要打包的文件的路径  打包好的输出的文件路径
// webpack .\src\main.js .\dist\bundle.js --mode development


// class 关键字，是ES6中提供的新语法，是用来实现 Es6 中面向对象编程的方式
class Person{
    // 使用 static 关键字，可以定义静态属性
    // 所谓的静态属性，就是 可以直接 通过类名，直接访问的属性
    // 实例属性： 只能通过类的实例，来访问的的属性，叫做实例属性
    static info = {name:'zs', age:20};
}

// var p1 = new Person();
console.log(Person.info);
// 在 webpack 中，默认只能处理一部分ES6 的新语法，一些更高级的ES6 语法 或者ES7的语法，
// webpack 是处理不了的，这时候，就需要 借助于第三方的loader，来帮助webpack 处理这些高级的语法,
// 当第三方 loader 把高级语法转为 低级的语法之后，会把结果交给webpack 去打包到 bundle.js 中
// 通过 Babel， 可以帮我们将高级的语法 转为 低级的语法
// 1. 在webpack 中，可以运行如下两套 命令，安装两套包，去安装Babel，相关的loader功能：
// 1.1 第一套包： npm i babel-core babel-loader babel-plugin-transform-runtime -D
// 1.2 第二套包:  npm i babal-preset-env babel-preset-stage-0 -D
// 2. 打开 webpack 的配置文件， 在module 节点下的 rules 数组中，添加一个新的匹配规则：
// 2.1 {test:/\.js$/, use:'babel-loader',exclude:/node_modules/}
// 2.2 注意： 在配置babel 的loader 规则的时候，必须把 node_modules 目录，通过 exclude 选项排除掉，原因有俩：
// 2.2.1 如果不排除 node_modules ，则Babel 会吧node_modules 中所有的第三方 js 文件，都打包编译，这样会非常消耗CPU，同时，打包的速度非常慢；
// 2.2.2 哪怕，最终 Babel 把所有 node_modules 中JS 转换完毕了，但是，项目也无法正常运行
// 3. 在项目的根目录中，新建一个叫做  .babelrc 的Babel 配置文件，这个配置文件，属于JSON格式，所以，在写 .babelrc 配置的时候，必须符合 JSON 语法规范，不能写注释，字符串必须用双引号
// 3.1 在.babelrc 写如下的配置： 大家可以把 preset 翻译成语法的意思
        // {
        //     "presets":["env","stage-0"],
        //     "plugins":["tranform-runtime"]
        // }
// 4. 了解：目前，我们安装的 babel-preset-env 是比较新的 ES 语法，之前，我们安装的是babel-preset-es2015 ，现在出了一个更新的语法插件，叫做 babel-preset-env,它包含了所有的 和 es***相关的语法