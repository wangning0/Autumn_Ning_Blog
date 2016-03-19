#SuperAgent

最近在写爬虫，看了下`node`里面有啥关于`ajax`的模块,发现`superagent`这个模块灰常的好用。好东西要和大家分享，话不多说，开始吧～

## 什么是SuperAgent

`superagent`它是一个强大并且可读性很好的轻量级`ajax`API，是一个关于`HTTP`方面的一个库，而且它可以将**链式写法**玩的出神入化。

		var superagent = require('superagent');

		superagent
			.post('/api')
			.send({
				'key': 'value'
			})
			.set('header_key', 'header_value')
			.end(function(err, res) {
				if (err) {
					//do something
				} else {
					//do something
				}
			})

## 安装SuperAgent 

相信大家看到这篇博客的时候肯定对`Node`和`npm`有一定的了解了，所以直接使用`npm`安装`SuperAgent`到项目的包依赖中就好了。

	$ npm install superagent --save
	
## 开始学习SuperAgent吧！

一般来说,我们常有的`HTTP`请求包括`GET` `POST` `DELETE` `HEAD` `PUT` 这些。 在不同的应用场景,在发送请求的时候,会选择一个正确的请求方式,然后通过`.end()`函数来得到请求后的返回结果。

		superagent
			.get('/api') //这里的URL也可以是绝对路径
			.end(function(req,res){
				//do something
			})
	 	// 等价于==>
	 	superagent('GET','/api')//这里的URL也可以是绝对路径
	 		.end(function(req,res){
	 			//do something
	 		})
接下来，让我们逐一的对`SuperAgent`的一些特性进行分析吧～🚀
 
 * 设置请求头
 	
 	这一点在写爬虫的时候十分的有用,因为有些网站可能设置了一些限制条件,比如它会去匹配你的请求头里面的一些字段, 像`User-Agent` `Referer`等,如果你没有设置这些请求头的话，可能就抓取不到数据咯～
 	
 	`SuperAgent`里面设置请求头很简单,通过使用`set()`方法就可以设置了，有两种方式
 	
 	* 单个单个的设置
 	
	 		superagent
	 			.get('/api')
	 			.set('Referer','https://www.google.com')
	 			.set('Accept','image/webp,image/*,*/*;q=0.8')
	 			.end(function(req,res){
	 				//do something
	 			})
	
	* 放在一起设置
	
			superagent
	 			.get('/api')
	 			.set({
	 				'Referer','https://www.google.com',
	 				'Accept','image/webp,image/*,*/*;q=0.8'
	 			})
	 		 	.end(function(req,res){
	 				//do something
	 			})
 * `GET`请求方式
 
 	我相信大家都一定见过这样类型的URL:`http://localhost:8080/api`和`http://localhost:8080/api?id=1&price=10`,就是`GET`方式可以带上参数,也可以不带上参数。不带参数的就不说了,相信大家都会,在`superagent`中我们可以通过`query()`方法给`URL`后面带上参数,有4种写法
 	
 		//接下来所形成的URL为/api?name=An&age=20&sex=male
 		//第一种
 		superagent
 			.get(/api)
 			.query({name:'An'})
 			.query({age:20})
 			.query({sex:'male'})
 			.end(cb)
 		//第二种
 		superagent
 			.get(/api)
 			.query({name:'An',age:20,sex:'male'})
 			.end(cb)
 		//第三种 
 		superagent
 			.get(/api)
 			.query('name=An&age=20&sex=male')
 			.end(cb)
 		//第四种
 			superagent
 				.get(/api)
 				.query('name=An')
 				.query('age=20')
 				.query('sex=male')
 				.end(cb)
 	
 * `head`请求
 
 	 `head`请求也可以通过`query()`的方式进行传递参数,大家可以参考👆的`GET`请求
 	 
 * `POST/PUT`请求
 
 	这两种请求，一般是要给服务端发送数据，现在文本数据的方式一般都以`json`的方式传递。我们可以在请求头里设置`Accept=application/json`，从而服务器可以根据请求头来生成`json`数据(在java开发后台时可以这样)
 	
 	在`superagent`里面，默认的数据传递格式是`json`，所以下面几种种方式是相同的。
 	
 		superagent
 			.post('/api')
 			.set('Accept','application/json')
 			.send('{"name":"An","age":20,"sex":"male"}')
 			.end(cb)
 		//等价于 ==>
 		superagent
 			.post('/api')
 			.send({name:"An",age:20,sex:"male"})
 			.end(cb)
 		//等价于 ==>
 		superagent
 			.post('/api')
 			.send({name:"An"})
 			.send({age:20})
 			.sex({sex:'male'})
 			.end(cb)
 	
 	当然，除了`json`的形式去传递，我们还有一种很常见的表单提交，在`superagent`里，也实现了模拟表单的提交数据类型`application/x-www-form-urlencoded`， 我们可以通过`type('form')`方法进行转换
 	
 		superagent
 			.post('/api')
 			.type('form')
 			.send({name:'An',age:20}) // name=An&age=20
 			.end(cb)
 	
 	有时候，我们也会在`POST`请求时，将一些参数放在`URL`上面，那这个时候还是可以用`query()`方法
 			
 * 设置`Content-Type`的两种快速方式
 
 	* `type()`方法
 	* `accept()`方法
 	
 	这两种方法都可以接受规范的[MIME格式](http://tool.oschina.net/commons),以及图片和`xml`等这些格式的数据。
 	
 		superagent
 			.post('/api')
 			.type('application/json')
 			.type('png')
 		// 等价于==>
 		superagent
 			.post('/api')
 			.accept('application/json')
 			.accept('png')
 			
 * 分析处理`response body`
 
 	`superagent`可以帮你解析返回的数据,当前支持三种类型的数据`application/x-www-form-urlencoded` `application/json` 和`multipart/form-data`
 	
 	* `JSON/Urlencoded` 		
 		解析后的数据会以对象的形式存在,可以通过`res.body`来得到。
 		
 			'{"name":"An"}' //JSON String
 			//解析 ==>
 			{
 				name:"An"	//JSON Object
 			}
 	* `Multipart`
 		这种格式的数据的处理，`superagent`是通过[Formidable](https://github.com/felixge/node-formidable)模块，它是主要处理文件上传的模块，大家可以去了解下，也是`Node`里面十分常用的模块，也很简单易上手。上传的文件的信息可以在`res.files`去查看，当然，我觉得这个属性用的比较少，这只是个人观点了～
 	
 * `Response`的属性
 	
	* `res.text`包含为被解析的响应数据
	
	* `res.body`上文提到了，包含解析的数据，但是目前只支持三种格式 
	* `res.header`响应头,是一个`Object`
	
	* `res.type & res.charset` 类型和编码格式
	
	* `res.status`状态码
 
 * 终止请求 `req.abort()` 暂停请求 `req.timeout(ms)` `ms`表示毫秒为单位的时间
 
 * `Basic Access Authentication`
 	
 	首先先简单的介绍下`Basic Access Authenication`，它是在`web`应用中，通过直接提供用户名、密码来进行验证身份的一种优化的解决方案。
 	
 	原理是将用户名和密码通过`:`连接,形成`username:password`然后再进行`base64`加密，发送到服务器后再进行解密得到用户名和密码,进行进一步的匹配验证。参考文章:[HTTP Basic Authentication认证](http://smalltalllong.iteye.com/blog/912046)。
 	
 	在`superagent`里，有两种方式进行验证
 	
 		superagent
 			.get('http://username:password@localhost')
 			.end(cb)
 		//等价于 ==>
 		superagent
 			.get('http://localhost')
 			.auth('username','password')
 			.end(cb)

 * 可以通过`pipe`管道流入流出数据
 
 	我想大家应该知道`node`里面有个核心特性就是`stream`，如果不知道的，可以参考:[nodejs中流(stream)的理解](https://segmentfault.com/a/1190000000519006),举两个栗子：
 	
 		//第一个例子
 		var fs = require('fs');
 		var request = require('superagent');
 		var postJson = fs.createReadStream('./postDataJson');
 		var req= request.post('/api');
 		req.accept('json');
 		stream.pipe(req);
 		
 		//第二个例子
 		var fs = require('fs');
 		var request = require('superagent');
 		var getData = fs.createWriteStream('./getData');
 		var res= request.get('/api');
 		res.pipe(getData); 	
 	
 * 添加多个附件
 
 	`superagent`也提供了一些高级的`API`，如果你想添加多个附件可以使用`attach(name,[path],[filename])`,其中你可以通过`filename`来自定义上传后文件的文件名
 	
 		request
 			.post('/upload')
 			.attach('avator','/path/a.png','An.png')
 			.attach('photo','/path/b.png')
 			.end(cb)
 *  复合请求
 
 	`superagent`也支持复合请求,比如你想上传一个带有你的姓名和邮箱的图片，那可以通过`field(name,value)`方法
 		
 			request
	 			.post('/upload')
	 			.field('name','An')
	 			.field('age':20)
	 			.attach('avator','/path/a.png','An.png')
	 			.end(cb)
 * 错误处理
 
 	有时候我们可能会因为不同的原因得到`4XX`或者`5XX`的错误，这个时候我们确实是可以从`end(function(err,res){...})`里的`err`得到错误信息,比如`er.status`错误的状态码啥的，但是有些时候我们想去处理这些错误，重新发送一个别的请求啥的，那么这个时候我们可以通过`on('error',handleFn)`去处理了
 	
 		request
 			.post('/api')
 			.send(data)
 			.on('error',handleFn)
 			.end(cb);
 		

##最后

我相信看到这里，大家对于`superagent`这个模块应该不陌生了吧，那大家还在等什么,快去用它做一个小爬虫吧，检验下你学习的成果！ 当然，如果你在写爬虫之前去学习一些[cheerio](http://cheeriojs.github.io/cheerio/),就可以少写点恶心的正则表达式了。

**如果这篇文章对你有所帮助，希望你能给我一个star,如果你有啥建议，欢迎和我交流哦。😄⛽️😄**	
 	
 	