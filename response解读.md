## Response

### 属性

- socket

- header 

- headers (header的别名)

- status (响应状态码，要求是100到999之间的数字; 值为204、205、304时，会清空body)

- message (响应状态消息)

- body (response body; 设置的时候，会影响请求头的'Content-Type'、'Content-Length')

- length (值为 Content-Length)

- headerSent (检查header是否被写入 socket 里面了)

- type (代表response mime type; 存储在ctx.response.header['content-type'])

- lastModified (res.header['last-modified'] 存的是字符串；lastModified读取时是Date类型)

- etag (具体什么用途，尚不了解)

### 方法

- vary(field) (调用后会 作用到ctx.response.header.vary，具体什么用途，尚不了解)

- redirect(url, alt) (做302跳转；url的值为back时，会特殊处理)

- attachment(filename, options)

- is(type, ...types) (Check whether the response is one of the listed types;
        与request的is方法类似)
        
- get(field) : 获取 response header

- has(field) : 返回header是否有这个字段

- set(field, val) : set response header; 如果headerSent 为true，则不设置; 
           设置之后，header的值为字符串类型或数组

- append(field, val) : field已有值，会用数组的方式追加；否则，调用set设置

- remove(field) : 删除 response header

- get writable() : Checks if the request is writable

- flushHeaders() : Flush any set headers and begin the body
