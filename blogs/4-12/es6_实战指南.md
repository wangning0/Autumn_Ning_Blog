# ES6 实战指南

## 什么是ES2015
说到 ES2015，有了解过的同学一定会马上想到各种新语法，如箭头函数（=>）、class、模板字符串等。是的，ECMA 委员会吸取了许多来自全球众多 JavaScript 开发者的意见和来自其他优秀编程语言的经验，致力于制定出一个更适合现代 JavaScript 开发的标准，以达到“和谐”(Harmony)。一言蔽之：**ES2015 标准提供了许多新的语法和编程特性以提高 JavaScript 的开发效率和体验** 

从 ES6 的别名被定为 Harmony 开始，就注定了这个新的语言标准将以一种更优雅的姿态展现出来，以适应日趋复杂的应用开发需求。

## ES2015 能为 JavaScript 的开发带来什么

* 语法糖

如果您有其他语言（如 Ruby、Scala）或是某些 JavaScript 的衍生语言（如 CoffeeScript、TypeScript）的开发经验，就一定会了解一些很有意思的语法糖，如 Ruby 中的 Range -> 1..10，Scala 和 CoffeeScript 中的箭头函数 (a, b) => a + b。ECMA 委员会借鉴了许多其他编程语言的标准，给 ECMAScript 家族带来了许多可用性非常高的语法糖，下文将会一一讲解。

* 工程优势

ES2015 除了提供了许多语法糖以外，还由官方解决了多年来困扰众多 JavaScript 开发者的问题：JavaScript 的模块化构建。从许多年前开始，各大公司、团队、大牛都相继给出了他们对于这个问题的不同解决方案，以至于定下了如 CommonJS、AMD、CMD 或是 UMD 等 JavaScript 模块化标准，RequireJS、SeaJS、FIS、Browserify、webpack 等模块加载库都以各自不同的优势占领著一方土地。

然而正正是因为这春秋战国般的现状，广大的前端搬砖工们表示很纳闷。

对此，ECMA 委员会终于是坐不住了，站了起来表示不服，并制订了 ES2015 的原生模块加载器标准。

`import fs from 'fs'`
`import path from 'path'`

可惜的是，目前暂时还没有任何浏览器厂商或是 JavaScript 引擎支持这种模块化语法。所以我们需要用 babel 进行转换为 CommonJS、AMD 或是 UMD 等模块化标准的语法。

## ES2015 新语法详解

经过以上的介(xun)绍(tao)，相信你对 ES2015 也有了一定的了解和期待。接下来我将带大家慢慢看看 ECMA 委员会含辛茹苦制定的新语言特性吧。

* `let` `const` 和块级作用域

在 ES2015 的新语法中，影响速度最为直接，范围最大的，恐怕得数 let 和 const 了，它们是继 var 之后，新的变量定义方法。与 let 相比，const 更容易被理解：const 也就是 `constant` 的缩写，跟 C/C++ 等经典语言一样，用于定义常量，即不可变量。

    const name = "ning";
    name = "hello" //syntaxError: "name" is readonly
    
**块级作用域**

在 ES6 诞生之前，我们在给 JavaScript 新手解答困惑时，经常会提到一个观点：**JavaScript 没有块级作用域** 在 ES6 诞生之前的时代中，JavaScript 确实是没有块级作用域的。这个问题之所以为人所熟知，是因为它引发了诸如历遍监听事件需要使用闭包解决等问题。

    <button>一</button>
    <button>二</button>
    <button>三</button>
    <button>四</button>
    
    <div id="output"></div>
    
    <script>
      var buttons = document.querySelectorAll('button')
      var output = document.querySelector('#output')
    
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
          output.innerText = buttons[i].innerText
        })
      }
    </script>
    
前端新手非常容易写出类似的代码，因为从直观的角度看这段代码并没有语义上的错误，但是当我们点击任意一个按钮时，就会报出这样的错误信息：
   `Uncaught TypeError: Cannot read property 'innerText' of undefined`
   
   出现这个错误的原因是因为 buttons[i] 不存在，即为 undefined。

为什么会出现按钮不存在结果呢？通过排查，我们可以发现，每次我们点击按钮时，事件监听回调函数中得到的变量 i 都会等于 buttons.length，也就是这里的 4。而 buttons[4] 恰恰不存在，所以导致了错误的发生。

再而导致 i 得到的值都是 buttons.length 的原因就是因为 JavaScript 中没有块级作用域，而使对 i 的变量引用(Reference)一直保持在上一层作用域（循环语句所在层）上，而当循环结束时 i 则正好是 buttons.length。

而在 ES6 中，我们只需做出一个小小的改动，便可以解决该问题（假设所使用的浏览器已经支持所需要的特性）：

    for (/* var */ let i = 0; i < buttons.length; i++) {
      // ...
    }
    
通过把 for 语句中对计数器 i 的定义语句从 var 换成 let，即可。因为 let 语句会使该变量处于一个块级作用域中，从而让事件监听回调函数中的变量引用得到保持。

## 箭头函数(Arrow Function)

继 let 和 const 之后，箭头函数就是使用率最高的新特性了。当然了，如果你了解过 Scala 或者曾经如日中天的 JavaScript 衍生语言 CoffeeScript，就会知道箭头函数并非 ES6 独创。

箭头函数，顾名思义便是使用箭头(=>)进行定义的函数，属于匿名函数（Lambda）一类。当然了，也可以作为定义式函数使用，但我们并不推荐这样做，随后会详细解释。

* 使用

箭头函数有好几种使用语法：

    /* 1.*/ foo => foo + ' world' // means return `foo + ' world'`
    /* 2.*/ (foo, bar) => foo + bar
    /* 3.*/ foo => {
      return foo + ' world'
    }
    /* 4.*/ (foo, bar) => {
      return foo + bar
    }

以上都是被支持的箭头函数表达方式，其最大的好处便是简洁明了，省略了 function 关键字，而使用 => 代替。

箭头函数语言简洁的特点使其特别适合用於单行回调函数的定义：

    let names = [ 'Will', 'Jack', 'Peter', 'Steve', 'John', 'Hugo', 'Mike' ]

    let newSet = names
      .map((name, index) => {
        return {
          id: index,
          name: name
        }
      })
      .filter(man => man.id % 2 == 0)
      .map(man => [man.name])
      .reduce((a, b) => a.concat(b))
    
    console.log(newSet) //=> [ 'Will', 'Peter', 'John', 'Mike' ]
  
* 箭头函数与上下文绑定

事实上，箭头函数在 ES2015 标准中，并不只是作为一种新的语法出现。就如同它在 CoffeeScript 中的定义一般，是用于对函数内部的上下文 （this）绑定为定义函数所在的作用域的上下文。

    let obj = {
      hello: 'world',
      foo() {
        let bar = () => {
          return this.hello
        }
        return bar
      }
    }
    
    window.hello = 'ES6'
    window.bar = obj.foo()
    window.bar() //=> 'world'
    
* 注意事项

另外，要注意的是，箭头函数对上下文的绑定是强制性的，无法通过 apply 或 call 方法改变其上下文。

    let a = {
      init() {
        this.bar = () => this.dam
      },
      dam: 'hei',
      foo() {
        return this.dam
      }
    }
    
    let b = {
      dam: 'ha'
    }
    
    a.init()
    
    console.log(a.foo()) //=> hei
    console.log(a.foo.bind(b).call(a)) //=> ha
    console.log(a.bar.call(b)) //=> hei
    
另外，因为箭头函数会绑定上下文的特性，故不能随意在顶层作用域使用箭头函数，以防出错：
    
    // 假设当前运行环境为浏览器，故顶层作上下文为 `window`
    let obj = {
      msg: 'pong',
    
      ping: () => {
        return this.msg // Warning!
      }
    }
    
    obj.ping() //=> undefined
    let msg = 'bang!'
    obj.ping() //=> bang!
    
为什么上面这段代码会如此让人费解呢？

我们来看看它的等价代码吧。

    let obj = {
      // ...
      ping: (function() {
        return this.msg // Warning!
      }).bind(this)
    }
    
    // 同样等价于
    let obj = { /* ... */ }
    obj.ping = (function() {
      return this.msg
    }).bind(this /* this -> window */)

## 模板字符串

模板字符串模板出现简直对 Node.js 应用的开发和 Node.js 自身的发展起到了相当大的推动作用！我的意思并不是说这个原生的模板字符串能代替现有的模板引擎，而是说它的出现可以让非常多的字符串使用变得尤为轻松。

模板字符串要求使用 ` 代替原本的单/双引号来包裹字符串内容。它有两大特点：

1. 支持变量注入
2. 支持换行

* 支持变量注入

模板字符串之所以称之为“模板”，就是因为它允许我们在字符串中引用外部变量，而不需要像以往需要不断地相加、相加、相加……

    let name = 'Will Wen Gunn'
    let title = 'Founder'
    let company = 'LikMoon Creation'
    
    let greet = `Hi, I'm ${name}, I am the ${title} at ${company}`
    console.log(greet) //=> Hi, I'm Will Wen Gunn, I am the Founder at LikMoon Creation

* 支持换行

在 Node.js 中，如果我们没有支持换行的模板字符串，若需要拼接一条SQL，则很有可能是这样的：

    var sql =
      "SELECT * FROM Users " +
      "WHERE FirstName='Mike' " +
      "LIMIT 5;"
    //or
    var sql = [
      "SELECT * FROM Users",
      "WHERE FirstName='Mike'",
      "LIMIT 5;"
    ].join(' ')

无论是上面的哪一种，都会让我们感到很不爽。但若使用模板字符串，仿佛打开了新世界的大门~

    let sql = `
    SELECT * FROM Users
    WHERE FirstName='Mike'
    LIMIT 5;
    `
    
Sweet! 在 Node.js 应用的实际开发中，除了 SQL 的编写，还有如 Lua 等嵌入语言的出现（如 Redis 中的 SCRIPT 命令），或是手工的 XML 拼接。模板字符串的出现使这些需求的解决变得不再纠结了~

## 对象字面量扩展语法

看到这个标题的时候，相信有很多同学会感到奇怪，对象字面量还有什么可以扩展的？

确实，对象字面量的语法在 ES2015 之前早已挺完善的了。不过，对于聪明的工程师们来说，细微的改变，也能带来不少的价值。    