# 详解JS跨域问题

## 什么是跨域

概念：只要协议、域名、端口有任何一个的不同，都被当作是不同的跨域。

```
一级域名：由两个或两个以上的词构成，中间由点号分隔开，整个域名只有一个点号。xxx.com
二级域名：二级域名是一级域名的下一级，二级域名中整个内容有2个点号1.xxx.com
```

对于端口和协议的不同，只能通过后台来解决。

## 跨域资源共享(CORS)
CORS(cross-origin Resource Sharing)跨域资源共享，定义了必须在访问跨域资源时，浏览器与服务器应该如何沟通。CORS背后的基本思想就是使用自定义的HTTP头部让浏览器与服务器进行沟通。从而决定请求是成功还是失败。


```
<script>
    var xhr = new XMLHttpRequest();
    xhr.open('GET','/hello',true);
    xhr.send(null);
</script>
```

以上的hello是相对路径，如果我们要使用CORS，相关Ajax代码可能如下所示:


```
<script>
    var xhr = new XMLHttpRequest();
    xhr.open('GET','http://a.com/hello',true);
    xhr.send(null);
</script>
```
代码与之前的区别在于相对路径换成了其他域的绝对路径，也就是你要跨域访问的接口地址。

服务器对于CORS的支持，主要是通过Access-Control-Allow-Origin来进行的。如果浏览器检测到相应的设置，就可以允许Ajax进行跨域的访问。

要解决跨域的问题，我们可以试用一下几种方法。

### 通过JSONP来进行跨域
JSONP是数据格式类型JSON的一种“使用模式”，可以让网页从别的网域中要资料。

JSONP也叫填充式JSON，是应用JSON的一种新方法，只不过是被包含在函数调用的JSON。例如：
`callback("name","hello")`;

在JS总，我们直接使用XMLHttpRequest请求不同域上的数据时，是不可以的。但是在页面上引入不同域上的js脚本文件却是可以的，jsonp通过这个来实现。


```
<script>
    function dosomething(jsondata) {
    //deal with jsondata
</script>
<script src="http://example.com/data.php?callback=dosomething"></script>
```

js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入。所以jsonp是需要服务器端的页面进行相应的配合的。


```
var cb = req.query.callback;
var data= [1,2,3];
res.send(cb(data))
```

最终，输出结果为：`dosomething([1,2,3])`;

JSONP的有优点是：它不像XMLHttpRequest对象实现的Ajax请求那样受到同源策略的限制；它的兼容性更好，在更古老的浏览器下是可以运行；并且在请求完毕之后可以通过调用callback的方式回传结果

JSONP的缺点是：它只支持GET请求，而不支持POST等其他类型的HTTP请求

### CORS和JSONP对比
CORS与JSONP相比，更加的先进，方便和可靠


```
1.JSONP只能实现GET请求，而CORS支持所有类型的HTTP请求
2.使用CORS，开发者可以使用普通的XMLHttpRequest发起请求和获得数据，比起JSONP有更好的错误处理。
3. JSONP主要被老的浏览器支持，它们往往不支持CORS，而绝大多数现代浏览器都已经支持了CORS）
```