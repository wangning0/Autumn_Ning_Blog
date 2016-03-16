##React_Learn

本文章是自己在学习`react`过程中的一些基础要点，希望可以给大家带来帮助，在后期会继续给出一个`React`和`webpack`联合使用的小例子。

* 所有组件类都必须有自己的`render`方法
* 组件类的第一个字母必须**大写**
* 组件类只能包含**一个**顶层标签,否则报错
* 组件的属性可以在组件类的`this.props`对象上获取
* 在添加组件属性,`class`属性写成`className`,`for`属性写成`htmlFor`

		var HelloMessage = React.createClass({
        render:function(){
          return <h1 className={this.props.class}>Hello {this.props.name}</h1>;
        }
      	});
* `this.props`对象的属性与组件的属性一一对应，但是`this.props.children`属性。表示组件的所有子节点
* `this,props.children`，如果当前组件没有子节点的时候，他就是`underfined`;如果有一个子节点,数据类型为`object`,若是多个子节点,则数据类型为`array`.
* `React`提供`React.Children`来处理`this.props.children`,可以用`React.Children.map`来便利子节点
* 组件类的`proptypes`属性,[官方文档](http://facebook.github.io/react/docs/reusable-components.html)，用来验证组件实例的属性是否符合要求

		var data = 123;

	    var MyTitle = React.createClass({
	      propTypes:{
	        title:React.PropTypes.string.isRequired //必须是字符串
	      },
	      render:function(){
	        return <h1>hello,{this.props.title}</h1>
	      }
	    });
	
	    ReactDOM.render(
	      <MyTitle title={data}></MyTitle>,
	      document.getElementById('example')
	      )
	 
* 组件(组件类的实例),组件并不是真实的DOM,而是存在于内存之中的数据结构,称为虚拟DOM(Virtual DOM),只有在插入文档之后，才会变成真实的DOM,而且都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上.
* **获取真实的DOM**需要用到`ref`属性,使用该属性的前提是要等到虚拟的DOM插入到文档后



			var MyComponent = React.createClass({
	        handleClick:function(){
	          console.log(this.refs);
	          this.refs.textInput.focus()
	        },
	        render:function(){
	          return (
	            <div>
	            <input ref="textInput" type="text"/>
	            <input type="button" onClick={this.handleClick} value="click me" />
	            </div>
	            )
	        },
	      });
	
	      ReactDOM.render(
	        <MyComponent></MyComponent>,
	        document.getElementById('example')
	        )
	      
* **`this.state`**

	* getInitialState 用于初始化状态,也是一个对象, 对象可以通过`this.state`来调用
	* `this.setState`用于修改状态值,并且在每次修改后会自动调用`this.render`方法,再次渲染页面
	
* `this.state`和`this.props`的**区别**
	
   前者会随用户互动而改变的特性,后者是表示那些一旦定义就不再改变的特性,`props`是从父组件传递过来的,属于父组件


* 事件里面都会有一个`event`对象
* **`组件的生命周期`**

	* 三个状态
	
		* 挂载Mounting 已插入真实的DOM
			
			`getInitialState()` 初始化state数据
			
			
			`componentWillMount()` 在挂载发生之前立即调用
			
			
			`componentDidMount()` 在挂载结束之后马上调用.**需要DOM节点的初始化数据应该放在这里**
			
		* 更新Updating 正在被重新渲染 
		
			`componentWillReceiveProps(object nextProps)` 当一个挂载的组件接收到新的props的时候被调用，并且可以通过this.props和nextProps来比较前后变化，然后使用this.setState()来改变state
			`shouldComponentUpdate(object nextProps,object nextState):boolean` 是在更新前根据该函数的返回值决定是否进行这次更新,详细说明：
			
			当父组件有自组件A和B，当父组件调用`this.setState`来改变A的`state`时,`render`会被再次调用，此时A组件和B组件会同时被更新,但是真正改变的只有A组件，所以这个时候可以使用`shouldComponentUpdate`了，来比较`state`和`props`的更新.
			
			`componentWillUpdate(object nextProps,object nextState)`更新前调用,可以使用`this.setState`
			`componentDidUpdate(object prevProps,object nextState)`更新后调用
			
		* 移除Unmounting 已移出真实DOM
		
			`componentWillUnmount()`在组件移除和销毁之前调用。清理工作可以放在这
	* 组件的`style`属性的设置方式，要写成`style={{opacity:this.state.opacity}}`

* `React.initializeTouchEvents(true)` 启用触摸事件处理
* 组件`常用的模式`是创建多个只负责渲染数据的`无状态`的组件,在它们的上层创建一个`有状态`的组件，并且通过`props`传给子级，有状态的组件封装所有的用户逻辑，而无状态的组件负责声明渲染数据。
* **应该为state**的数据为可能被组件的事件处理器改变并触发用户界面更新的数据,而在render()里面根据state来计算其他的需要数据。
* **不应该为state**的数据为

	* 计算所得数据
	* React组件
	* 基于props的重复数据
* Prop验证

	React.PropTypes提供很多验证器来验证传入数据的有效性。当向props传入无效的数据时候，控制台会报错
	
* 默认的Prop值`getDefaultProps`

		var ComponentWithDefaultProps = React.createClass({
		getDefaultProps:function(){
			return {
				value:'default'
			}
			}
		})
* `React.PropTypes.element`可以限定只有一个子级传入

		var MyComponent = React.createClass({
			propTypes:function(){
				children:React.PropTypes.element.isRequired
			},
			render:function(){
				return 
					<div>
						{this.props.children}	//只允许一个元素，否则会报错
					</div>
			}
		})

* **`Mixins`**

	组件是React里复用代码最佳方式，有时一些组件间需要共用一些功能,`Minins`来解决这些问题
	
	在Mixins中，编写的代码就想下面所示:
	
		var LogMixin = {
	    componentWillMount: function () {
	        console.log('Component will mount');
	    },
	    componentDidMount: function () {
	        console.log('Component did mount');
	    }
		};
		
		var AComponent = React.createClass({
		    mixins: [LogMixin],
		    render: function () {
		        return (
		            <div>AComponent</div>
		        )
		    }
		});
		
		var BComponent = React.createClass({
		    mixins: [LogMixin],
		    render: function () {
		        return (
		            <div>BComponent</div>
		        )
		    }
		});

	 * `生命周期法` Mixins里面的方法并不会覆盖组件的生命周期方法，会在先于组件生命周期方法执行
	 
	 
		 		var Mixin = {
				    componentWillMount: function () {
				        console.log('Mixin Will Mount');
				    }
				};
				
				var Component = React.createClass({
				    mixins: [Mixin],
				    componentWillMount: function () {
				        console.log('Component Will Mount');
				    },
				    render: function () {
				        return (
				            <div>Component</div>
				        )
				    }
				});
	
	输出结果为：
	
		$ Mixin Will Mount
		$ Component Will Mount

	使用多个Mixin：
	
		var AMixin = {
		    componentWillMount: function () {
		        console.log('AMixin Will Mount');
		    }
		};
		
		var BMixin = {
		    componentWillMount: function () {
		        console.log('BMixin Will Mount');
		    }
		};
		
		var Component = React.createClass({
		    mixins: [AMixin,BMixin],
		    componentWillMount: function () {
		        console.log('Component Will Mount');
		    },
		    render: function () {
		        return (
		            <div>Component</div>
		        )
		    }
		});

	输出结果为：
	
		$ AMixin Will Mount
		$ BMixin Will Mount
		$ Component Will Mount
		
	输出结果的顺序与数组引入的顺序相同
	
	**不允许重复**  除了生命周期方法可以重复之外，其他的方法都不可以重复,否则会报错
	
* `表单组件`

	* value 用于`<input>` `<textarea>`组件(不同于普通的`html`标签)
	* checked 用于类型为`checkbox` 和  `radio`组件
	* selected 用于`<option>`组件
	
   可以通过`onChange`来进行回调监听组件的变化
   
* **受限组件**

	设置了`value`的`<input>`是一个受限组件,用户在渲染出来的元素里面输入任何值都不起作用,因为`React`已经赋值了，想要更新用户的值,就的使用`onChange`事件:
	
		var Input = React.createClass({
			getInitialState:function(){
				return {value:'hello!'};
			},
			handleChange:function(e){
				this.setState({value:e.target.value});
			},
			render:function(){
				var value = this.state.value;
				return <input type="text" value={value} onChange={this.handleChange}/>;
			}
		})
		ReactDOM.render(
		<Input/>,
		document.getElementById('example')
		)

* 不受限组件想要有初始值的属性

	* defaultValue
	* defaultChecked
	
* `<select>`使用value属性

		<select value="B">
			<option value="A">Apple</option>
			<option value="B">Banna</option>
			<option value="C">Cranberry</option>
		</select>
	
	如果给`value`属性传一个数组,可以选中多个选项 `<select value={['B','C']}>..</select>`;

* 浏览器中的工作原理

	它提供了强大的抽象，它让你在大多是应用场景中不再直接的操作DOM,~~但有时候也需要简单的调用底层的API，或者借助第三方库~~
	
	它在内存中维护一个快速响应的DOM描述，render()方法返回这个DOM描述，并且它能够快速的找到虚拟DOM和真实DOM之间的差异,并且更新浏览器中的DOM.
	
* `React.addons` **React插件** 当通过`npm`使用的时候，可以简单的使用`require('react/addons')`来替换`require('react')`来得到所有插件的`React`.


* `React`支持的事件

	* 剪贴板事件`onCopy` `onCut` `onPaste`
	* 键盘事件  `onKeyDown` `onKeyPress` `onKeyUp`
	* 焦点事件  `onFocus` `onBlur`
	* 表单事件 `onChange` `onInput` `onSubmit`
	* 鼠标事件  `onClick` `onDoubleClick` `onDrag` `onDragEnd` `onDragEnter` `onDragExit` `onDragLeave`
`onDragOver` `onDragStart` `onDrop` `onMouseDown` `onMouseEnter` `onMouseLeave`
`onMouseMove` `onMouseOut` `onMouseOver` `onMouseUp`
	* 触摸事件  为了使触摸事件生效，在渲染所有事件之前调用`React.initializeTouchEvents(true)`事件名 `onTouchCancel` `onTouchEnd` `onTouchMove` `onTouchStart`
	* UI事件 `onScroll`
	* 鼠标滚轮滚动事件 `onWheel`
	
* **`Reactde五个核心类型`**

	* ReactElement/ReactElement工厂
		
		`ReactElement`有四个属性:`type` `props` `key` `ref`
	* ReactNode
	* ReactComponent/ReactComponent类
	

* 组件的DOM事件监听

			
				var Box = React.createClass({
					getInitialState: function() {
					return {windowWidth: window.innerWidth};
				},
				
				handleResize: function(e) {
					this.setState({windowWidth: window.innerWidth});
				},
				
				componentDidMount: function() {
					window.addEventListener('resize', this.handleResize);
				},
				
				componentWillUnmount: function() {
					window.removeEventListener('resize', this.handleResize);
				},
				
				render: function() {
					return <div>Current window width: {this.state.windowWidth}</div>;	
					}
				});
				
				React.render(<Box />, mountNode);
				

* 在执行同步请求的响应时，在更新`state`前,一定要先通过`this.isMounted()`来检测组件的状态是否还是Mounted.

		var UserGist = React.createClass({
		  getInitialState: function() {
		    return {
		      username: '',
		      lastGistUrl: ''
		    };
		  },
		
		  componentDidMount: function() {
		    $.get(this.props.source, function(result) {
		      var lastGist = result[0];
		      if (this.isMounted()) {
		        this.setState({
		          username: lastGist.owner.login,
		          lastGistUrl: lastGist.html_url
		        });
		      }
		    }.bind(this));
		  },
		
		  render: function() {
		    return (
		      <div>
		        {this.state.username}'s last gist is
		        <a href={this.state.lastGistUrl}>here</a>.
		      </div>
		    );
		  }
		});
		
		React.render(
		  <UserGist source="https://api.github.com/users/octocat/gists" />,
		  mountNode
		); 

* `React`是一个非常安全的框架，为了防范`xss`攻击，做了许多措施，`dangerouslySetInnerHTML`可以解决一些未净化过的html，因为在`{_hyml:string}`，`html`里面的东西变成了对象的存在

		var converter = new Showdown.converter();
	
		var MarkdownEditor = React.createClass({
		  getInitialState: function() {
		    return {value: 'Type some *markdown* here!'};
		  },
		  handleChange: function() {
		    this.setState({value: this.refs.textarea.getDOMNode().value});
		  },
		  render: function() {
		    return (
		      <div className="MarkdownEditor">
		        <h3>Input</h3>
		        <textarea
		          onChange={this.handleChange}
		          ref="textarea"
		          defaultValue={this.state.value} />
		        <h3>Output</h3>
		        <div
		          className="content"
		          dangerouslySetInnerHTML={{
		            __html: converter.makeHtml(this.state.value)
		          }}
		        />
		      </div>
		    );
		  }
		});
		
		React.render(<MarkdownEditor />, mountNode);
		
如果给你带来了帮助，请给我一个`star`吧～也希望大家能给出一些建议，谢谢！












