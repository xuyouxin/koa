##  源码

- checkEnable() ： 处理enableTypes，得到enableJson、enableForm 等值

- formatOptions() ：处理jsonLimit、formLimit等值，得到一个统一的limit值

- extendType() ： 处理text/html 等这种 extend 类型

最后，返回名为bodyParser 的中间件。处理请求时，解析成功，会把结果赋值到ctx.request.body，否则为 {} 

可以给bodyParser 传一个onerror(err, ctx) 方法，来处理异常


## json body

请求头里面，需要指定以下的一种，才会去解析数据为json格式：
    'application/json',
    'application/json-patch+json',
    'application/vnd.api+json',
    'application/csp-report'
    
或者在创建App对象时，提供一个detectJSON 方法，也能work
    
### opts

- jsonLimit ： 超过limit会报错，返回413

- strict ： 默认值为true，就是要求数据为json格式，否则返回400；指定为false，则不报错



## form body

解析之后，得到的ctx.request.body 对象，其实与解析json，得到的是一样的

form的参数可以像这样写：foo.bar.abc=baz，
解析之后得到：{ foo: { bar: { abc: 'baz' } } }


### opts

- formLimit ： 超过limit会报错，返回413


## text body

默认不支持该方式，因为默认的enableTypes 是 ['json', 'form']

表现结果是，如果请求体是一个字符串，contentType为 text/plain, 解析后ctx.request.body 是{ }

想要支持的话，enableTypes 得包含字符串 'text'

## xml body

默认不支持该方式，因为默认的enableTypes 是 ['json', 'form']

表现结果是，如果请求体是一个xml格式的字符串，contentType为 application/xml, 解析后ctx.request.body 是{ }

想要支持的话，enableTypes 得包含字符串 'xml'

解析之后，ctx.request.body 是一个字符串


## html body

是text body的 子类型，需指定enableTypes 包含字符串 'text'，且：

        extendTypes: {
          text: ['text/html'],
        },
        
## 其他自定义类型

1 自定义内容类型application/x-javascript（enableTypes默认包含json了）：

        extendTypes: {
          json: 'application/x-javascript'
        }
        
会把内容解析为json

2 application/xml-custom

        enableTypes: ['xml'],
        extendTypes: {
          xml: 'application/xml-custom'
        }
