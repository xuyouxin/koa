
'use strict';

const assert = require('assert');
const context = require('../helpers/context');
const parseurl = require('parseurl');

describe('get ctx.path', () => {
  it('should return the pathname', () => {
    const ctx = context();
    ctx.url = '/login?next=/dashboard';
    assert.equal(ctx.path, '/login');
  });
});

describe('set ctx.path=', () => {
  it('should set the pathname', () => {
    const ctx = context();
    ctx.url = '/login?next=/dashboard';

    ctx.path = '/logout';
    assert.equal(ctx.path, '/logout');
    assert.equal(ctx.url, '/logout?next=/dashboard');
  });

  it('should change .url but not .originalUrl', () => {
    const ctx = context({ url: '/login' });
    ctx.path = '/logout';
    assert.equal(ctx.url, '/logout');
    assert.equal(ctx.originalUrl, '/login');
    assert.equal(ctx.request.originalUrl, '/login');
  });

  it('should not affect parseurl(ctx.req)', () => {
    const ctx = context({ url: '/login?foo=bar' });
    ctx.path = '/logout';
    const url = parseurl(ctx.req);
    assert.equal(url.path, '/logout?foo=bar'); // ?, it is hard to understand
  });
});
