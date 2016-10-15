#从输入URL到页面显示的过程
## 1. 发送URL，请求IP地址
当发送一个URL请求时，不管这个URL是web页面的url还是web页面上每个资源的url，浏览器都会开启一个线程来处理这个请求，同时在远程DNS服务器上启动一个DNS查询，让浏览器获得请求对应的IP地址。

## 2. TCP三次握手

浏览器与远程WEB服务器通过TCP三次握手来协商建立一个TCP/IP连接。该握手包括一个同步报文，一个同步-应答报文，一个应答报文。这三个报文在浏览器和服务器之间传递。该握手首先由客户端尝试建立通信，然后服务端响应回答并接受客户端的请求，最后由客户端发出该请求已经被接受的报文。
    ![](https://github.com/wangning0/Autumn_Ning_Blog/blob/master/blogs/10-15/screenshot/5.png)

        
        ``
        ACK :ACK=1表示该报文段中有确认号需要处理
        SYN:SYN=1 ACK=0表明是建立连接请求报文段，SYN=1ACK=1表明建立连接报文
        FIN:FIN=1表示对端的数据已经发送完毕，要求释放连接
        ``
        **第一次握手:建立连接**
        客户端发送链接请求报文段，将SYN值设为1，Sequence Number设为x(客户端初始化序列号)。客户端进入SYN_SEND状态，等待服务器的确认。
        **第二次握手：服务器收到SYN报文段**
        服务器受到客户端SYN报文段，需要对这个SYN报文段进行确认，设置Acknowledgemnt Number为x+1(Sequence Number+1,可以理解为告诉客户端下一次发送报文的序列号从x+1开始)。同时，自己还要发送SYN请求信息，将SYN值设为1，Sequence Number设为y(服务端的初始化序列号)。服务器端将上述所有信息放到一个报文段(即SYN+ACK报文段)中，一并发送到客户端，服务器进入SYN_RECV状态。
        **第三次握手:客户端收到SYN+ACK报文段**
        客户端收到服务器的SYN+ACK报文段后将Acknowledgment Number设置为y+1，向服务器发送ACK报文段，这个报文段发送完毕之后，客户端和服务器都进入ESTABLISGED状态，完成TCP三次握手。
        
        
        ``
        SYN-ACK重传次数：服务器发送完SYN-ACK包，如果未收到客户确认包，服务器进行首次重传，等待一段时间仍未收到客户确认包，进行第二次重传，如果重传粗疏超过系统规定的最大重传粗疏，系统将连接信息丛半连接队列中删除。注意，每次重传等待的时间不一定相同。
        
        半连接存活时间：是指半连接队列的条目存活的最长时间，也即服务从收到SYN包到确认这个报文无效的最长时间。改时间是所有重传请求包的最长等待时间总和。有时我们也称半连接存活时间为Timeout时间、SYN_RECV存活时间。
        ``
        
        [为什么是3次握手？](https://www.zhihu.com/question/24853633)
        
## 3.服务器响应200
        TCP/IP连接建立后，浏览器向通过该连接向远程服务器发送HTTP的GET请求，远程服务器找到资源并使用HTTP响应返回该资源，值为200的HTTP响应状态表示一个正确的响应
## 4.生成Render Tree
        客户端下载完资源后，便进入了我们关注的前端模块了。浏览器会解析HTML成树形的数据结构DOM，生成DOM Tree，浏览器将css代码解析成树形的数据结构CSSOM，生成CSS Rule Tree。
        
        DOM和CSSOM都是以Bytes->charcters->tokens->nodes->object model这样的方式生成最终的数据。DOM树的生成过程是一个深度遍历过程：当前节点的所有节点都构建好之后才回去构建当前节点的下一个兄弟节点。
        
        ![](https://github.com/wangning0/Autumn_Ning_Blog/blob/master/blogs/10-15/screenshot/2.png)
        
        DOM Tree和CSS Rule Tree结合生成Render Tree
        
        ![](https://github.com/wangning0/Autumn_Ning_Blog/blob/master/blogs/10-15/screenshot/1.png)
        
        
        ``
            display:none的节点不会被加入Render Tree 而 visibilit:hidden则会
                display:隐藏对应的元素但不会挤占元素原来的空间
                    visibility:隐藏对应的元素并且挤占元素原来的空间
                        所以，如果某个节点最开始是不显示的，设为 display:none是最好的
                        ``
                        
## 5.渲染页面
                        **布局**
                        有了Render Tree，浏览器知道网页中有哪些节点、各个节点的css定义以及他们的从属关系。接着就开始布局，计算出每个节点在屏幕中的位置
                        **渲染**
                        浏览器在知道了哪些节点要展示，并且每个节点的css属性是什么、每个节点在屏幕中的位置在哪里的时候，就会进入了最后一步，按照算出来的规则，通过显卡，把内容画到屏幕上。
                        
                        **但是**javascript可以根据DOM API操作DOM。比如JS修改了DOM或者CSS属性，也会重新的触发布局和渲染的执行过程。
                        
## 补充：TCP四处挥手
                        ![](https://github.com/wangning0/Autumn_Ning_Blog/blob/master/blogs/10-15/screenshot/6.png)
                        **第一次挥手：客户端想分手**
                        假设客户端想关闭连接，客户端会发送一个FIN标志位置为1的包(FIN=1,clientseq=x)，表示自己已经没有数据可以发送了，但是可以接受数据，进入FIN_WAIT_1状态
                        **第二次挥手：服务器也想分手**
                        服务器端确认客户端的FIN包，发送一个确认包(ACK=1,ACknum=clientseq+1),表示自己已经接收到了客户端关闭连接的请求名单上还没有准备好关闭连接。发送包后，服务器进入CLOSE_WAIT状态，客户端收到确认包后，进入FIN_WAIT_2状态，等待服务器关闭连接
                        **第三次挥手：服务器准备好分手**
                        服务器准备好关闭连接后，像客户端发送结束请求，FIN置为1，（FIN=1，serverseq=y）,发送完毕后进入LAST_ACK状态，等待客户端的最后一个ACK
                        **第四次挥手：分手**
                        客户端接受来自服务器端的请求后，发送一个确认包（ACK=1，ACKnum=serverseq+1）进入TIME_WAIT状态，等待可能出现的要求重传的ACK包。 
                        服务器端接受到这个确认包之后，关闭连接，进入CLOSED状态。
                        客户端等待2MSL之后，没有收到回复，确保服务器端确实为关闭了，客户端也关闭连接，进入CLOSED状态。

