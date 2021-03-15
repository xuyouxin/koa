### 属性

- middleware

- context

- request

- response

### 方法

- listen(args) : http.createServer(app.callback()).listen(...) 的 简写

- use(fn) : 使用给定的中间件fn，在该方法中会把fn加入到middleware 数组;
          fn 的参数是 (ctx, next)，且得是 async方法

- callback() :  返回一个请求处理器(handleRequest方法）

- handleRequest(ctx, fnMiddleware) : Handle request in callback.

- createContext(req, res) : 创建一个新的context

- onerror(err) : 默认的错误处理器

### 注意

1. use 把 fn函数 加入到middleware数组

2. callback 里面 会把middleware数组 使用compose进行处理得到新方法(middleware的
工作模式是后进先出，刚好和递归一样，所以compose内部使用了递归)；并由新方法生成handleRequest

3. listen 里面使用了callback


