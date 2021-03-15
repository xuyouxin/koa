'use strict';

const request = require('../helpers/context').request;
const assert = require('assert');

describe('req.charset', () => {

  describe('with no content-type present', () => {
    it('should return ""', () => {
      const req = request();
      assert('' === req.charset);
    });
  });

  describe('with charset present', () => {
    it('should return ""', () => {
      const req = request();
      req.header['content-type'] = 'text/plain';
      assert('' === req.charset);
    });
  });

  describe('with a charset', () => {
    it('should return the charset', () => {
      const req = request();
      console.log("req1>>", req);
      req.header['content-type'] = 'text/plain; charset=utf-8';
      console.log("req2>>", req);
      console.log("req.charset>>", req.charset);
      assert.equal(req.charset, 'utf-8');
    });

    it('should return "" if content-type is invalid', () => {
      const req = request();
      req.header['content-type'] = 'application/json; application/text; charset=utf-8';
      console.log("req2>>", req);
      assert.equal(req.charset, '');
    });
  });
});
