# DOM 理解
[DOM](http://blog.jobbole.com/52430/)

> DOM(文档对象模型)是针对HTML，XML文档的一个API，DOM描绘了一个层次化的节点树

## DOM
```
Node---|--Document-------HTMLDocument
       |
       |--characterData---|----Text
       |                  |----Comment
       |--Element------HTMLElement---|--HTMLHeadElement
       |                             |--...
       |                             |--HTMLButtonElement
       |--Attr
```
### Node类型
Javascript的所有节点类型都是继承来自Node类型，因此所有的节点类型都共享着相同的基本属性和方法

* nodeType 属性，表明节点的类型

    *  Node.ELEMENT_NODE(1)
    *  Node.ATTRIBUTE_NODE(2)
    *  Node.TEXT_NODE(3)
    *  Node.DOCUMENT_NODE(9)
* nodeName 如果该Node类型是元素，则为标签名
* nodeValue nodeType==1 则null
* childNodes 保存着一个NodeList对象，类数组对象，用于保存一组有序的节点
* parentNode 指向文档树中的父节点
* previousSibling 上一个兄弟节点 不存在为null
* nextSibling 下一个兄弟节点 不存在为 null
* firstChild 第一个子元素
* lastChild 最后一个子元素
* hasChildNodes() 方法 
* appendChild(node) 末尾添加一个节点
* insertBefore(node，targetNode) 插入节点
* replaceChild(newNode, targetNode) 替换节点

### Document 类型
Javascript 通过Document类型表示文档，在浏览器中document对象是HTMLDocument（继承自Document类型）的实例。

* domain 获取域名，本身或者上一级域名
* referrer 来源页面的URL
* getElementById(idName) 取得元素
* getElementsByTagName(tagName) 返回一个HTMLCollection对象，该对象和NodeList很相似
 
    * namedItem(name)可以返回HTMLCollection对象中name属性的元素
    
* anchors 返回所有带name特性的a元素
* forms 所有的form元素
* images 所有img元素
* links 所有带href的a元素
* write()
* createElement() 创建元素节点
* createTextNode 创建文本节点
* createAttribute() 创建属性节点
* createComment() 创建注释节点

### Element 类型
特征：

* nodeType == 1
* nodeName 值为元素的标签名
* nodeValue null
* parentNode 可能是Document 或 Element

属性和方法：

* tagName 标签名（大写） 
* HTML元素
    所有的HTML元素都是由HTMLElement类型表示，不是直接通过这个类型，也是通过它的子类型来表示。HTMLElement类型直接继承自Element并添加了一些属性
    * id 元素在文档中的唯一标识图
    * title
    * lang
    * className
    * dir 语言的方向
* 取得特性
    * getAttribute()
    * setAttribute()
    * removeAttribute()

### Text类型 
文本节点又Text类型表示，包含的是可以照字面解释的纯文本内容，纯文本中可以包含转义后的HTML字符，但不能包含HTML代码。

特征：
    
* nodeType的值为3
* nodeName的值为“#text”
* nodeValue 节点所包含的文本
* parentNode 是一个Element
* 没有子节点

### Comment 类型
注释在DOM中是通过Comment类型来表示的

* nodeType 的值为8
* nodeName "#comment"
* nodeValue 注释的内容
* parentNode Document 或者是 Element
* 没有子节点

### Attr属性
元素的特性在DOM中以Attr类型来表示

* nodeType == 2
* nodeName 特性的名称
* nodeValue 特性的值
* parentNode null
* HTML 中 无子节点

## 度量

[DOM度量](http://varnull.cn/domzhi-du-liang/)

clientWidth/clientHeight: 带padding不带滚动条的内容区域

css的width包括了滚动条

scrollWidth/scrollHeight: 和clientWidth一样，但是包含了整个可以滚动的区域 

scrollTop/scrollLeft 溢出部分的距离 

offsetWidth/offsetHeight 包含border不包含margin的长度

clientTop/clientLeft top/left的border的长度

offsetParent/offsetLeft/offsetTop: offsetLeft和offsetTop反映了元素相对于它的offsetParent的偏移量。offsetParent是在布局上的父元素。

## 事件处理(IE 与 W3C的标准不同)

* IE5-IE8不支持addEventListener() removeEventListener() 类似的方法为attachEvent() detachEvent()
* DOM 事件的三级模型
    * 0级模型，直接通过onclick写在HTML里面的事件
    * DOM2是通过addEventListener绑定的事件，还有IE下的DOM2事件通过attachEvent()绑定
    * DOM3是一些新的事件(UI事件，焦点，鼠标，滚轮，文本，键盘合成)
* DOM事件模型
    * a) IE所使用的冒泡型事件
    * b）DOM标准定义的冒泡型与捕获型事件
    
    > 冒泡：自下往上
    > 捕获：自上往下
* 标准DOM事件处理模型
    当一个DOM事件被触发的时候，事件已开始从文档的根节点流向目标对象(捕获阶段)，然后在目标对象上被触发(目标阶段)，之后再回溯到文档的根节点（冒泡阶段）
* IE的取消冒泡为cancelBubble,其他的为stopPropagation
* IE的事件对象为window.event,其他的event

## 事件代理
常用的场景
> 事件代理可以让你使用一个事件监听器去监听大量的DOM节点的事件。

## Event对象
type (String) — 事件的名称

target (node) — 事件起源的DOM节点

currentTarget?(node) — 当前回调函数被触发的DOM节点

bubbles (boolean) — 指明这个事件是否是一个冒泡事件（接下来会做解释）

preventDefault(function) — 这个方法将阻止浏览器中用户代理对当前事件的相关默认行为被触发。比如阻止a元素的click事件加载一个新的页面

stopPropagation (function) — 这个方法将阻止当前事件链上后面的元素的回调函数被触发，当前节点上针对此事件的其他回调函数依然会被触发。（我们稍后会详细介绍。）

stopImmediatePropagation (function) — 这个方法将阻止当前事件链上所有的回调函数被触发，也包括当前节点上针对此事件已绑定的其他回调函数。

cancelable (boolean) — 这个变量指明这个事件的默认行为是否可以通过调用event.preventDefault来阻止。也就是说，只有cancelable为true的时候，调用event.preventDefault才能生效。

defaultPrevented (boolean) — 这个状态变量表明当前事件对象的preventDefault方法是否被调用过

isTrusted (boolean) — 如果一个事件是由设备本身（如浏览器）触发的，而不是通过JavaScript模拟合成的，那个这个事件被称为可信任的(trusted)

eventPhase (number) — 这个数字变量表示当前这个事件所处的阶段(phase):none(0), 

timestamp (number) — 事件发生的时间


