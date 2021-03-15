## Request

### 属性

- header

- headers（header的别名）

- url

- origin (origin of URL)

- href (full request URL)

- method (request method)

- path (request pathname)

- query (解析querystring得到的对象)

- querystring

- search (值为`?${this.querystring}`)

- host （Parse the "Host" header field host 
     and support X-Forwarded-Host when a proxy is enabled.）
     
- hostname (与host差不多)

- fresh (检查请求是否新鲜; 只有GET和HEAD请求才有可能为true)

- stale (与fresh相反，检查请求是否过期)

- idempotent (检查请求是否幂等；由method的值来判断，GET、PUT、DELETE是幂等的，POST不是幂等的)

- socket

- charset

- length (如果Content-Length存在，读取它的值并转为数字类型)

- protocol (值为 http 或 https)

- secure (protocol为 https时，是安全的)

- ip

- subdomains

- accept (是个object)

### 方法

- accepts (匹配内容类型 html、text、json之类的;
      与headers.accept 的值进行匹配，返回最佳匹配 或者 false)

- acceptsEncodings (匹配编码；与req.headers['accept-encoding'] 的值进行匹配)

- acceptsCharsets (匹配字符集；与req.headers['accept-charset'] 的值进行匹配)

- acceptsLanguages (匹配语言；与req.headers['accept-language'] 的值进行匹配)

- is (感觉与accepts用法有点像；不过它是与header['content-type'] 的值进行匹配)

- get(field) (返回req.headers[field])
