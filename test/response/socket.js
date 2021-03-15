
'use strict';

const assert = require('assert');
const response = require('../helpers/context').response;
const Stream = require('stream');

describe('res.socket', () => {

  it('should return the request socket object', () => {
    const res = response();
    assert.equal(res.socket instanceof Stream, true); // res.socket 是 Stream 对象的实例，就是说它是个流
  });
});
