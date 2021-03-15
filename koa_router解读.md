## Router

### 特性

- 有与REST 对应的 get、post、put、delete的 API，以及all

- 可嵌套

- 匹配到之后，可以有多个方法来分步处理

- 多个正则都匹配到之后，谁先匹配到算谁的

- 生成Router 对象时，可以指定前缀

- path规则：route的前缀，use方法的参数，子route的前缀，get等方法的参数 这些组合而成


### 属性

- prefix

### 方法

- Router(opts) : 生成Router对象，可以同时支持Router() 和 new Router() 两种写法

- use() : 使用给的的middleware；
       参数1可以是string 或 string array，表示path，那只有匹配的url才会调用这个middleware

- allowedMethods ：Returns separate middleware for responding to `OPTIONS` requests with
   an `Allow` header containing the allowed methods
   返回一个中间件，中间件的作用是响应请求：
   - 如果是OPTIONS请求，则在响应头里面，有allow参数，代表这个url支持的请求类型
   - 否则，如果是不支持的请求（支持的，这个中间件不处理），返回405：Method Not Allowed

- register(path, methods, middleware, opts) : Create and register a route.

- redirect(source, destination, code) : 重定向
        Redirect `source` to `destination` URL with optional 30x status `code`.
                 
- routes() : Returns router middleware which dispatches a route matching the request.
         places a `_matchedRoute` value on context
         places a `_matchedRouteName` value on the context for a named route
         
- all : Register route with all methods; GET、PUT、POST、DELETE等全部注册

- route(name) ： Lookup route with given `name`

- match(path, method) ：Match given `path` and return corresponding routes.

- param(param, middleware) : Run middleware for named route parameters. Useful for auto-loading or validation
                   调用了Layer的param方法
 
- url(name, params) : Generate URL for route. Takes a route name and map of named `params`.
         params可以是对象，也可以是string、number等，还可以是带query对象的对象-query部分会自动拼到url



### 特殊方法： 通过Router.prototype[method] 加进去的方法

    'get',
    'post',
    'put',
    'head',
    'delete',
    'options',
    ...
    
 参数：判断第二个参数，如果它是string 或 Regex类型，则它是path，前一个参数是name；往后的参数是middleware。
                    否则，前一个参数是path，从它开始往后都是middleware，name为null

### opts

- strict

- prefix 设置前缀


## Layer

### 构造函数

- Layer(path, methods, middleware, opts)

### 属性

- opts、name、methods、paramNames、stack、path、regexp

### 方法

- match(path) : return this.regexp.test(path);

- params(path, captures, existingParams)：Returns map of URL parameters for given `path` and `paramNames`.
                  对地址拦上的参数进行处理；处理顺序与 匹配规则中 该参数在URL上的出现顺序一致
                
- param(param, fn) : Run validations on route named parameters
                  只有与param匹配的请求，才会触发fn的调用
         
- captures(path)：return path.match(this.regexp).slice(1);

- url(params, options)：Generate URL for route using given `params`

- setPrefix：Prefix route path

