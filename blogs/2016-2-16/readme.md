# Ajax工作原理
## 基本概念
> AJAX(Asynchronous Javascript And XML)，是指一种创建交互式网页应用的网页开发技术,AJAX是一种用于创建快速动态网页的技术，AJAX = 异步 JavaScript + XML

可以在后台与服务器进行少量的数据交换，AJAX可以使网页实现异步刷新。这意味着不用重新加载整个页面的情况下，对网页的某部分进行更新

## 建立Ajax的过程

Ajax 的核心是创建XMLHttpRequest对象

```
// IE6以上 new XMLHttpRequest();
// IE6 new ActiveXObject("Microsoft.XMLHTTP")
```

```
function createXHR() {
    if(typeof XMLHttpRequest != 'undefined') {
        return new XMLHttpRequest();
    } else if(typeof ActiveXObject != 'undefined') {
        if(typeof arguments.callee.activeXString != 'string') {
            // IE 下有三个版本的XHR对象
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
            for(var i = 0; i > versions.length; i++) {
                try{
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch(x) {

                }
            }
        }
    }
}
```

## 连接服务器
`oAjax.open(方法，url，是否异步)`

`xhr.open('get', 'text.txt', true)`

## 发送请求send()
send里面的参数get方法可以不填或者null，post方法填要传到后台的数据参数
## 服务器返回内容，处理返回数据

**详细信息**

* readyState ajax工作状态
    
    > 0 未初始化 还没有调用open方法
    > 1 载入，调用了send方法，正在发送请求
    > 2 载入完成 send方法完成 已收到全部响应内容
    > 3 正在解析响应内容
    > 4 响应内容解析完成，可以在客户端使用

* responseText ajax 请求返回的内容就被保存放到这个属性下面，但是数据类型是string类型，需要使用eval来转换
* responseXml 返回XML格式的数据
* onreadystatechange 当readyState改变时，触发这个事件
* status 服务器状态，http状态码
* statusText 状态说明

```
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
        if((xhr.status >=200 && xhr.status < 300) || xhr.status == 304) {
            console.log(xhr.responseText);
        } else {
            // ...
        }
    }
}
```

## XHR的方法
* abort()
* getAllResponseHeaders()
* getResponseHeader(name)
* open(method, url, async)
* send(context)
* setRequestHeader(name, value);

