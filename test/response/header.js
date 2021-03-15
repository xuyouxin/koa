
'use strict';

const assert = require('assert');
const request = require('supertest');
const response = require('../helpers/context').response;
const Koa = require('../..');

describe('res.header', () => {

  it('should return the response header object', () => {
    const res = response();
    res.set('X-Foo', 'Bar');
    res.set('X-Number', 200);
    assert.deepEqual(res.header, { 'x-foo': 'Bar', 'x-number': '200' }); // key 变成了 全小写
  });

  it('should use res.getHeaders() accessor when available', () => {
    const res = response();
    res.res._headers = null;
    res.res.getHeaders = () => ({ 'X-Foo': 'baz' });
    assert.deepEqual(res.header, { 'X-Foo': 'baz' }); // 保持了原有的大小写
  });

  it('should return the response header object when no mocks are in use', async() => {
    const app = new Koa();
    let header;

    app.use(ctx => {
      ctx.set('x-foo', '42');
      header = Object.assign({}, ctx.response.header);
    });

    await request(app.callback())
      .get('/');

    assert.deepEqual(header, { 'x-foo': '42' });
  });

  describe('when res._headers not present', () => {
    it('should return empty object', () => {
      const res = response();
      res.res._headers = null;
      assert.deepEqual(res.header, {});
    });
  });
});
