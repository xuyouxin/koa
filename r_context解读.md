## context

代理了request 的诸多方法 和 属性

代理了response 的诸多方法 和 属性

### 属性

- cookies

### 方法

- inspect (与toJSON同)

- toJSON（Return JSON representation）

- assert (断言)

- throw (抛一个异常，默认错误码是500；参数可以是status、message、error的各种组合)

- onerror（Default error handling; 会发射error事件给app：this.app.emit('error', err, this);
       response header如果没发出去，会在这个方法里被unset）
