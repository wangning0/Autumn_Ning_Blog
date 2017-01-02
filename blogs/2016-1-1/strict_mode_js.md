# JS的严格模式

## 优点
* 消除JS语法的一些不合理、不严谨之处、减少一些怪异的行为
* 消除代码运行的一些不安全之处，保证代码运行的安全
* 提高编译器效率，增加运行效率
* 为未来新版本的JS做好铺垫

##详细

* 全局变量必须显示声明

    ```
    "use strict";
    v = 1; // 报错，v未声明
    ``` 

* 静态绑定，属性和方法到底归属哪个对象，在编译阶段就确定。提高了编译器的效率

    ```
    //禁止使用with语句 因为无法在编译时确定属性归属的对象
    "use strict";
　　var v = 1;
　　with (o){ // 语法错误 
　　　　v = 2;
　　}
　　// 创建了eval作用域正常模式下，eval语句的作用域，取决于它处于全局作用域，还是处于函数作用域。严格模式下，eval语句本身就是一个作用域，不再能够生成全局变量了，它所生成的变量只能用于eval内部。
　　"use strict";
　　var x = 2;
　　console.info(eval("var x = 5; x")); // 5
　　console.info(x); // 2
    ```
* 增强的安全措施
     * 禁止this关键字指向全局对象

        ```
        // 使用构造函数时 如果忘了加new，this不再指向全局对象，而是报错
        function f() {
            "ues strict";
            this.a = 1;
        };
        f(); // 报错，this未定义
        ```
    * 禁止在函数内部遍历调用栈

        ```
        function f1() {
            "use strict";
            f1.caller; // error
            f1.arguments; // error
            
        }
        ```
    * 禁止删除变量
        
        ```
        // 严格模式下无法删除变量。只用configurable设置为true的对象属性，才能被删除
        "use strict";
        var x;
        detele x; //error
        
        var r = Object.create(null, {'x': {
            value: 1,
            configureable: true
        }})
        
        delete o.x; // delete success
        ```
    * 显示报错

        ```
        // 正常模式下。对一个对象的只读属性进行赋值，不会报错，会默默的失败，严格模式下，会报错
        "use strict";
    
        var o = {};
        
        Object.defineProperty(o, "v", {
            value: 1,
            writable: false
        });
        
        o.v = 2; // error
        
        // 严格模式下，对一个使用getter方法读取的属性进行赋值，会报错
        
        "use strict";
        
        var o = {
            get v() {return 1;}
        }
        
        o.v = 2; // error
        
        //严格模式下，对禁止扩展的对象添加新属性，会报错。
        "use strict";
        var o = {};　
        Object.preventExtensions(o);
        o.v = 1; // error
　　
    　　//严格模式下，删除一个不可删除的属性，会报错
    　　
    　　"use strict";
    　　delete Object.prototype; // error
        ```
    * 重名错误，对象不能有重名的参数，对象不能有重名的属性
    * 禁止八进制表示法
    * arguments对象的限制
    
        ```
        // 不允许对arguments赋值
        // arguments不再追踪参数的变化
        function f(a) {
            a = 2;
            return [a, arguments[0]];
        } 
        f(1) // 正常模式 [2, 2]
        function f(a) {
            "use strict";
            a = 2;
            return [a, arguments[0]];
        } 
        f(1) // 严格模式下 [2, 1]
        
        // 禁止使用arguments.callee
        ```
    * 函数必须声明在顶层

        ```
        // 严格模式只允许在全局作用域或函数作用域的顶层声明函数，也就是说，不允许在非函数的代码块内声明函数
        
        "use strict";
        if(true) {
            function f() { // ...} // error
        }
        
        for(...) {
            function f() { // ... } // error
        }
        ```
    
    * 保留字，使用保留字会报错
        

