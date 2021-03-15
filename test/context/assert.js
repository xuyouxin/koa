
'use strict';

const context = require('../helpers/context');
const assert = require('assert');

describe('ctx.assert(value, status)', () => {
  it('should throw an error', () => {
    const ctx = context();

    try {
      ctx.assert(false, 405);
      throw new Error('asdf');
    } catch (err) {
      assert.equal(err.status, 405);
      assert.strictEqual(err.expose, true);
    }
  });
});
