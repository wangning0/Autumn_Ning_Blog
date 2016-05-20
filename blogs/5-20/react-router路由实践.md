# React-router路由实践

首先，在该项目开始之前，还请大家能够先下载一个[项目脚手架](https://github.com/wangning0/other/tree/master/react-gulp-hanging)。本教程基于该脚手架进行开发

## Router,hashHistory,Route
首先下载react-router

`npm install react-router --save`

需要注意的是，react-router更新很快，API也在持续升级，也许你看到市面很多教程，但可能那还是1.x甚至是0.x版本的。

我们首先在App.jsx写一个简单示例，让你快速的对react-router有印象。

代码清单：`app/container/App/App.jsx`

    import React, { Component } from 'react';
    import { Router, Route, hashHistory } from 'react-router';
    
    const Home = () => <div><h1>Home</h1></div>;
    const About = () => <div><h1>About</h1></div>;
    const Contact = () => <div><h1>Contact</h1></div>;
    
    class App extends Component {
      render() {
        return (
          <Router history={hashHistory}>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Router>
        );
      }
    }
    
    export default App;
    
## Link
Link是react-router提供的导航组件，可以直接使用进行路由切换

代码清单：`app/container/App/App.jsx`

    import React, { Component } from 'react';
    import { Router, Route, hashHistory, Link } from 'react-router';
    
    const Home = () => <div><h1>Home</h1><Links /></div>;
    const About = () => <div><h1>About</h1><Links /></div>;
    const Contact = () => <div><h1>Contact</h1><Links /></div>;
    
    const Links = () =>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    
    class App extends Component {
      render() {
        return (
          <Router history={hashHistory}>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Router>
        );
      }
    }
    
    export default App;
    
## browserHistory
browserHistory和hashHistory不一样，使用browserHistory的时候，浏览器中导航栏的URL就不会出现_k的hash键值对。实际项目中也一般用browserHistory.
    
    import React, { Component } from 'react';
    import { Router, Route, browserHistory, Link } from 'react-router';
    
    const Home = () => <div><h1>Home</h1><Links /></div>;
    const About = () => <div><h1>About</h1><Links /></div>;
    const Contact = () => <div><h1>Contact</h1><Links /></div>;
    
    const Links = () =>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    
    class App extends Component {
      render() {
        return (
          <Router history={browserHistory}>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Router>
        );
      }
    }
    
    export default App;
    
这样正常点击路由切换没有问题，但是重新刷新URL就会报找不到路由，这个时候我们在webpack-dev-server启动的时候需要加上参数`--history-api-fallback`。

## activeStyle,activeClassName
当前路由被点击处于触发显示状态的时候，我们可以使用activeStyle来给路由设置一些颜色

    import React, { Component } from 'react';
    import { Router, Route, browserHistory, Link } from 'react-router';
    
    const Home = () => <div><h1>Home</h1><Links /></div>;
    const About = () => <div><h1>About</h1><Links /></div>;
    const Contact = () => <div><h1>Contact</h1><Links /></div>;
    
    const Links = () =>
      <nav>
        <Link activeStyle={{color: 'red'}} to="/">Home</Link>
        <Link activeStyle={{color: 'red'}} to="/about">About</Link>
        <Link activeStyle={{color: 'red'}} to="/contact">Contact</Link>
      </nav>
    
    class App extends Component {
      render() {
        return (
          <Router history={browserHistory}>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Router>
        );
      }
    }
    
    export default App;
 
同理，我们还可以使用activeClassName来将路由激活状态的样式抽取出来。

我们在App.css写一个样式，代码清单：`app/containers/App/App.jsx`

    .active {
      color: red;
    }
    
然后修改App.jsx

    import React, { Component } from 'react';
    import { Router, Route, browserHistory, Link } from 'react-router';
    
    import './App.css';
    
    const Home = () => <div><h1>Home</h1><Links /></div>;
    const About = () => <div><h1>About</h1><Links /></div>;
    const Contact = () => <div><h1>Contact</h1><Links /></div>;
    
    const Links = () =>
      <nav>
        <Link activeClassName="active" to="/">Home</Link>
        <Link activeClassName="active" to="/about">About</Link>
        <Link activeClassName="active" to="/contact">Contact</Link>
      </nav>
    
    class App extends Component {
      render() {
        return (
          <Router history={browserHistory}>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Router>
        );
      }
    }
    
    export default App;

## 路由嵌套

刚才讲的是简单路由的切换，但实际应用中，路由是分多个层级的。幸运的是，我们可以使用react-router的路由嵌套来清晰的管理路由和组件之间的切换展示。

    import React, { Component } from 'react';
    import { Router, Route, browserHistory, Link } from 'react-router';
    
    import './App.css';
    
    const Home = (props) =>
      <div>
        <h1>Home</h1>
        <Links />
        {props.children}
      </div>
    
    const About = (props) =>
      <div>
        <h1>About</h1>
        {props.children}
      </div>
    
    const Contact = () =>
      <div>
        <h1>Contact</h1>
      </div>
    
    const Links = () =>
      <nav>
        <Link activeClassName="active" to="/">Home</Link>
        <Link activeClassName="active" to="/about">About</Link>
        <Link activeClassName="active" to="/about/contact">Contact</Link>
      </nav>
    
    class App extends Component {
      render() {
        return (
          <Router history={browserHistory}>
            <Route path="/" component={Home}>
              <Route path="about" component={About}>
                <Route path="contact" component={Contact} />
              </Route>
            </Route>
          </Router>
        );
      }
    }
    
    export default App;
    
## IndexRoute

IndexRoute即处理页面初始进入时候的组件展示，等路由切换的时候，再根据其他路由规则进行组件的切换展示。

    import React, { Component } from 'react';
    import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router';
    
    import './App.css';
    
    const Home = (props) =>
      <div>
        <h1>Home</h1>
        <Links />
        {props.children}
      </div>
    
    const About = () =>
      <div>
        <h1>About</h1>
      </div>
    
    const Contact = () =>
      <div>
        <h1>Contact</h1>
      </div>
    
    const Links = () =>
      <nav>
        <Link activeClassName="active" to="/">Home</Link>
        <Link activeClassName="active" to="/contact">Contact</Link>
      </nav>
    
    class App extends Component {
      render() {
        return (
          <Router history={browserHistory}>
            <Route path="/" component={Home}>
              <IndexRoute component={About} />
              <Route path="contact" component={Contact} />
            </Route>
          </Router>
        );
      }
    }
    
    export default App;

##路由变量
刚才展示的是常规的路由，路由中的规则是给定的，现在我们尝试使用路由变量，在组件中获取这个路由的变量，并做相应的组件展示。

    import React, { Component } from 'react';
    import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';
    
    import './App.css';
    
    const Message = (props) =>
      <div>
        <h1>{props.params.message || 'Hello'}</h1>
        <Links />
      </div>
    
    const Links = () =>
      <nav>
        <Link to="/">Hello</Link>
        <Link to="/yong">Yong</Link>
        <Link to="/feng">Feng</Link>
      </nav>
    
    class App extends Component {
      render() {
        return (
          <Router history={hashHistory}>
            <Route path="/(:message)" component={Message} />
          </Router>
        );
      }
    }
    
    export default App;
    
##Route中components参数的高级用法

Route中components中接收的参数不仅仅只是实际的组件，还可以是对象，通过这样的用法，我们可以更灵活的控制组件的展示。

    import React, { Component } from 'react';
    import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';
    
    import './App.css';
    
    const HomeHeader = () => <h1>HomeHeader</h1>
    const HomeBody = () => <h1>HomeBody</h1>
    const AboutHeader = () => <h1>AboutHeader</h1>
    const AboutBody = () => <h1>AboutBody</h1>
    
    const Container = (props) =>
      <div>
        {props.header}
        {props.body}
        <Links />
      </div>
    
    const Links = () =>
      <nav>
        <Link to="/">Hello</Link>
        <Link to="/about">About</Link>
      </nav>
    
    class App extends Component {
      render() {
        return (
          <Router history={hashHistory}>
            <Route path="/" component={Container}>
              <IndexRoute components={{ header:HomeHeader, body:HomeBody }} />
              <Route path="about" components={{ header:AboutHeader, body:AboutBody }} />
            </Route>
          </Router>
        );
      }
    }
    
    export default App;
    
## 使用query获取URL中的参数

我们可以将URL中访问的参数获取，并且应用到组件中。

    import React, { Component } from 'react';
    import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';
    
    import './App.css';
    
    const Page = (props) =>
      <div>
        <h1>{props.location.query.message || 'Hello'}</h1>
      </div>
    
    class App extends Component {
      render() {
        return (
          <Router history={hashHistory}>
            <Route path="/" component={Page} />
          </Router>
        );
      }
    }
    
    export default App;
    
然后在url中输入`http://localhost:8080/#/?message=wn`，页面中就会显示wn。

另外，我们还可以在Link组件中设置pathname和query变量

    import React, { Component } from 'react';
    import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';
    
    import './App.css';
    
    const Page = (props) =>
      <div>
        <h1>{props.location.query.message || 'Hello'}</h1>
      </div>
    
    const Links = () =>
      <nav>
        <Link to={{ pathname: "/", query: {message: "guoyongfeng"} }} />
      </nav>
    
    class App extends Component {
      render() {
        return (
          <Router history={hashHistory}>
            <Route path="/" component={Page} />
          </Router>
        );
      }
    }
    
    export default App;
    
##  Redirect重定向

    import React, { Component } from 'react';
    import { Router, Route, hashHistory, Link, Redirect } from 'react-router';
    
    const Home = () => <div><h1>Home</h1><Links /></div>;
    const About = () => <div><h1>About</h1><Links /></div>;
    const Contact = () => <div><h1>Contact</h1><Links /></div>;
    
    const Links = () =>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/contact-us">Contact US</Link>
      </nav>
    
    class App extends Component {
      render() {
        return (
          <Router history={hashHistory}>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact-us" component={Contact} />
            <Redirect from="/contact" to="/contact-us" />
          </Router>
        );
      }
    }
    
    export default App;
 
## setRouteLeaveHook路由钩子函数：处理路由切换时的操作

    import React, { Component, PropTypes } from 'react';
    import { Router, Route, hashHistory, Link } from 'react-router';
    
    class Home extends Component {
      componentWillMount(){
        this.context.router.setRouteLeaveHook(
          this.props.route,
          this.routerWillLeave
        )
      }
      routerWillLeave( nextLocation ){
        return `页面即将从Home切换到${nextLocation.pathname}`
      }
      render(){
        return <div>
          <h1>Home</h1>
          <Links />
        </div>
      }
    }
    
    Home.contextTypes = {
      router: PropTypes.object.isRequired
    };
    
    const Contact = () => <div><h1>Contact</h1><Links /></div>;
    
    const Links = () =>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    
    class App extends Component {
      render() {
        return (
          <Router history={hashHistory}>
            <Route path="/" component={Home} />
            <Route path="/contact" component={Contact} />
          </Router>
        );
      }
    }
        
    export default App;
    
    
##最后
总的来说，react-router的学习难度不高，但是会有不同版本间API升级的坑，后续大家持续关注，或是使用某一个自己熟悉的react-router版本。

**最后，希望这篇博客对大家有所帮助（如果是，请尽情star哦，😄），欢迎提出您的宝贵建议～**