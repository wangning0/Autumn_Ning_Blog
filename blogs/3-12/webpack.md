# webpack学习之路

当自己在学习webpack的时候，在网上发现中文的很详细的教程很少，于是便想将自己学习webpack的笔记记录整理下来，便有了这篇文章，希望对大家有所帮助，如果有错误，欢迎大家指出。

###在我们开始之前

* webpack有多种加载器(**Loader**,后面会介绍),可以处理各种需要被处理的静态文件
* webpack支持**CommonJs** **AMD** **CMD**规范
* 在使用webpack的项目中，默认配置文件为`webpack.config.js`, 模块文件，和Node写法一样，对外暴露接口,主要属性有:

	* plugins插件项
	* entry入口文件配置项
	* output对应输出项配置
	* module.loaders 最关键的配置，告知webpack不同的文件需要什么加载器进行处理
		    
* 模块系统的几种类型

	* `<script>`标签类型
	
		* 缺点
			* 全局作用域下造成变量的冲
			* 文件加载顺序很重要
			* 模块与模块之间的依赖要解决
			* 在大型项目中难以维护和管理
	* **CommonJs**
	
		* 优点
			
			* 服务端模块能够重复利用
			* 有优秀的包管理工具npm
			* 简单，上手容易
		* 缺点
		
			* 不适合浏览器端的使用
			* 不能做到并行加载模块
	* **AMD**
	
		* 优点
		
			* 适合浏览器的异步加载机制
			* 并行加载模块
		* 缺点
			* 代码难以经营和维护
	* **ES6**
	
		* 优点
			
			* 未来的ES规范
		* 缺点
		
			* 浏览器对ES6的支持还需要一段时间 
			* 能够依赖的现有的模块少
			
### ' 转换 ' 的思想
 模块要能够在客户端中去执行，则必须将它们从 server => browser
 
* 极端的想法:

	* 一个请求一个模块 只有需要的模块会被转换，但是耗费资源，时间长
	* 所有请求都在一个模块 不需要的模块也会被转换 时间短，耗费资源少

* 分块转换的想法:

	* 将众多的模块切成许多片，在初始化时的请求不会包括完整的代码，并且在初始化时不需要的模块切片会在后续加载过程中按需加载。并且将模块化的切片方式是可以有开发人员自己定义的。

### wepback它的目标是是什么？

webpack它能将依赖的模块转化成可以代表这些包的静态文件

它的目标有

* 将依赖的模块分片化，并且按需加载
* 解决大型项目初始化加载慢的问题
* 每一个静态文件都可以看成一个模块
* 可以整合第三方库
* 能够在大型项目中运用
* 可以自定义切割模块的方式

### webpack较之其他类似工具有什么不同？

* 有同步和异步两种不同的加载方式
* Loader,加载器可以将其他资源整合到JS文件中，通过这种方式，可以讲所有的源文件形成一个模块
* 优秀的语法分析能力，支持 CommonJs AMD 规范
* 有丰富的开源插件库，可以根据自己的需求自定义webpack的配置

### webpack为什么要将所有资源放在一个文件里面？

我们知道，对于浏览器来说，加载的资源越少，响应的速度也就越快，所以有时候我们为了优化浏览器的性能，会尽可能的将资源合并到一个主文件`app.js`里面。但是这导致的很大的缺点：

* 当你的项目十分庞大的时候，不同的页面不能做到按需加载，而是将所有的资源一并加载，耗费时间长，性能降低。
* 会导致依赖库之间关系的混乱，特别是大型项目时，会变得难以维护和跟踪。比如:哪些文件是需要A模块加载完后才能执行的？哪些页面会受到多个样式表同时影响的？ 等许多问题。

而**webpack**可以很好的解决以上缺点,因为它是一个十分聪明的模块打包系统，当你正确配置后，它会比你想象中的更强大，更优秀。

##开启wbpack之旅
-------

###安装webpack

* 我们可以直接使用npm进行全局安装

	`npm install webpack -g`
* 在常规项目中把webpack依赖加入到package.json

	`npm init`  `npm install webpack --save`

更详尽的安装方法个可以参考[webpack安装](https://webpack.github.io/docs/installation.html)

###webpak命令行常见使用的操作
 
 启动
 
 	webpack
 	
 如果你想当改变一个文件而让webpack实时编译
 
 	webpack --watch
 	
 如果你想把默认的配置文件`webpack.config.js`改成自定义文件
 
 	webpack --config customconfig.js
 

##webpack的用法
------

首先先贴上一个比较完整的`webpack.config.js`的代码，再详细介绍：

	// webpack.config.js
	var path = require('path')
	var webpack = require('webpack')

	module.exports = {
	  entry: ['./src/index'],
	  output: {
	    path: path.join(__dirname, 'dist'),
	    filename: 'bundle.js'
	  },
	  plugins: [
	    new webpack.optimize.UglifyJsPlugin({
	      compressor: {
	        warnings: false,
	      },
	    }),
	    new webpack.optimize.OccurenceOrderPlugin()
	  ],
	  module: {
	    loaders: [{
	      test: /\.css$/,
	      loaders: ['style', 'css']
	    }]
	  }
	}

就像我在前面提到的，`webpack.config.js`的写法和在Node里的写法相同，我们主要看的就是文件中的`module.exports`里面的内容

* entry	是指入口文件的配置项，它是一个数组的原因是webpack允许多个入口点。
* output是指输出文件的配置项

	* path － 表示输出文件的路径
	* filename - 表示输出文件的文件名
* plugins 顾名思义，使用插件可以给webpack添加更多的功能，使webpack更加的灵活和强大,webpack有两种类型的插件:

	* webpack内置的插件
	
			// 首先要先安装webpack模块
			var webpack = require("webpack");
			
			module.exports = {
			    new webpack.optimize.UglifyJsPlugin({
			      compressor: {
			        warnings: false,
			      },
	    		})
			};
	* webpack外置插件
	
		比如:
		
			//npm install component-webpack-plugin 先要在安装该模版
			var ComponentPlugin = require("component-webpack-plugin");
			module.exports = {
			    plugins: [
			        new ComponentPlugin()
			    ]
			}
					
		
	更多的插件以及插件的用法，大家可以到[webpack的插件](https://webpack.github.io/docs/list-of-plugins.html)上查看。

 *	module 配置处理文件的选项
 
 	* loaders 一个含有wepback中能处理不同文件的加载器的数组
 	
 		* test 用来匹配相对应文件的正则表达式
 		* loaders 告诉webpack要利用哪种加载器来处理test所匹配的文件
 	
 	* loaders 的安装方法
 		
 			$ npm install xxx-loader --save-dev
 	
讲到这里，我相信大家都会对wepback有了更深的认识，但是却十分的松散，不能把它们串起来，那接下来我就用几个小的demo来让大家梳理梳理起来

###举个例子

首先请大家建立一个和我一样文件结构的文件夹，在这里我也说明下这个demo大概要做的事情，就是将css文件都打包放到一个js文件，并且对图片解压，并且要对这个js文件进行自动压缩。

	DemoOne
	|- dist
	|- src
		|- index.js
		|- index.html
		|- style.css
		|- demo.png(随便找一张图片就可以)
	|- package.json
	|- webpack.config.js
	
 首先看`index.html`代码
 
	 	<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>demo1</title>
		</head>
		<body>
			<div>Hello,world</div>
			<img src="./demo.png" alt="">
			<script src="../dist/bundlle.js"></script>
		</body>
		</html>
		
再看`style.css`

	body{
		background:red;
	}

这个时候我们还没有写`webpack.config.js`,打开`index.html`,会看到![image](./image/demo1.png)

  打开控制台后，你会发现![image](./image/demo1_1.png)
  
  接下来，我们在`webpack.config.js`下加上如下代码
  
  	// webpack.config.js
	var path = require('path')
	var webpack = require('webpack');
	
	module.exports = {
	  entry: ['./src/index'],
	  output: {
	    path: path.join(__dirname, 'dist'),
	    filename: 'bundle.js'
	  },
	  plugins: [
	    new webpack.optimize.UglifyJsPlugin({
	      compressor: {
	        warnings: false,
	      },
	    })
	  ],
	  module: {
	    loaders: [{
	      test: /\.css$/,
	      loaders: ['style', 'css']
	    },
	    {
	        test: /\.(png|jpg)$/,
	        loaders: [
	            'file?hash=sha512&digest=hex&name=[hash].[ext]',
	            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
	        ]
	    }]
	  }
	}

  当然，在开始用webpack之前，要先安装相对应的模块，解析css文件 图片文件以及因为要对文件进行压缩，所以也要用到上文中所说的webpack自身内置的插件,所以也要导入webpack模块
  
  	$ npm install style-loader css-loader image-webpack-loader webpack --save-dev
  	
  安装好之后使用`webpack`命令后会有这样的提示![image](./image/demo1_2.png)

  但是这个时候你打开浏览器会发现，页面依旧没有什么效果，这是肯定的！我想大家肯定知道下一步该怎么做了，没错！在入口文件里面增加内容
  
  	require('./style.css');
	require('./demo.png');
	
再运行`webpack`,出现上图类似提示后，打开浏览器，你会发现变成了这个样子![image](./image/demo1_3.png)

并且在`dist`文件夹内，多出了两个文件，一个`f1341ce5ea165e06ec3358441b52d5ea.png`（随机产生的名字）如果你想获得这个名字，可以将`require('./demo.png')`输出查看，以及还有`bundle.js`,比较图片前后的大小，

![image](./image/demo1_4.png)![image](./image/demo1_5.png)

可以发现，文件大小发生了改变。打开`bundle.js`你会发现该文件也被压缩了。是不是感觉很神奇？！
还有一个比较好玩的插件[htmlwebpackplugin](https://webpack.github.io/docs/list-of-plugins.html#htmlwebpackplugin)可以点击这里看看，把上面的例子改变下哦。


##最后

我相信看到这里你对`webpack`一定有了一定的认识，其实，还`webpack`还有很多强大的功能，比如，`webpack-dev-server`可以自动生成一个小型的`NodeJs Express`服务器从而实现webpack十分实用的功能热替换(HMR) 和其它的工具`gulp` `grunt`等一起使用。。。最后值得一提的是`react `和`webpack`是一对绝佳cp啊，有木有！！

**最后，希望这篇博客对大家有所帮助（如果是，请尽情star哦，😄），欢迎提出您的宝贵建议～**
