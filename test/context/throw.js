'use strict';

const context = require('../helpers/context');
const assert = require('assert');
const Koa = require('../..');

describe('ctx.throw(msg)', () => {
  it('should set .status to 500', () => {
    const ctx = context();

    try {
      ctx.throw('boom');
    } catch (err) {
      assert.equal(err.status, 500);
      assert.equal(err.expose, false);
    }
  });

  it('should set .status to 500 - 2', () => {
    const app = new Koa();

    app.use((ctx, next) => {
      try {
        throw "boom";
      } catch (err) {
        assert.equal(err.status, 500);
        assert.equal(err.expose, false);
      }
    });
  });
});

describe('ctx.throw(err)', () => {
  it('should set .status to 500', () => {
    const ctx = context();

    try {
      ctx.throw(new Error('test'));
    } catch (err) {
      assert.equal(err.status, 500);
      assert.equal(err.message, 'test');
      assert.equal(err.expose, false);
    }
  });
});

describe('ctx.throw(err, status)', () => {
  it('should throw the error and set .status', () => {
    const ctx = context();
    const error = new Error('test');

    try {
      ctx.throw(error, 422);
    } catch (err) {
      assert.equal(err.status, 422);
      assert.equal(err.message, 'test');
      assert.equal(err.expose, true);
    }
  });
});

describe('ctx.throw(status, err)', () => {
  it('should throw the error and set .status', () => {
    const ctx = context();
    const error = new Error('test');

    try {
      ctx.throw(422, error);
    } catch (err) {
      assert.equal(err.status, 422);
      assert.equal(err.message, 'test');
      assert.equal(err.expose, true);
    }
  });
});

describe('ctx.throw(msg, status)', () => {
  it('should throw an error', () => {
    const ctx = context();

    try {
      ctx.throw('name required', 400);
    } catch (err) {
      assert.equal(err.message, 'name required');
      assert.equal(err.status, 400);
      assert.equal(err.expose, true);
    }
  });
});

describe('ctx.throw(status, msg)', () => {
  it('should throw an error', () => {
    const ctx = context();

    try {
      ctx.throw(400, 'name required');
    } catch (err) {
      assert.equal(err.message, 'name required');
      assert.equal(400, err.status);
      assert.equal(true, err.expose);
    }
  });
});

describe('ctx.throw(status)', () => {
  it('should throw an error', () => {
    const ctx = context();

    try {
      ctx.throw(400);
    } catch (err) {
      assert.equal(err.message, 'Bad Request');
      assert.equal(err.status, 400);
      assert.equal(err.expose, true);
    }
  });

  describe('when not valid status', () => {
    it('should not expose', () => {
      const ctx = context();

      try {
        const error = new Error('some error');
        error.status = -1;
        ctx.throw(error);
      } catch (err) {
        console.log("err>>", err, "<<");
        assert.equal(err.message, 'some error');
        assert.equal(err.expose, false);
      }
    });
  });
});

describe('ctx.throw(status, msg, props)', () => {
  it('should mixin props', () => {
    const ctx = context();

    try {
      ctx.throw(400, 'msg', { prop: true,  msg: "hello" });
    } catch (err) {
      assert.equal(err.message, 'msg');
      assert.equal(err.status, 400);
      assert.equal(err.expose, true);
      assert.equal(err.prop, true);
      assert.equal(err.msg, "hello");
    }
  });

  describe('when props include status', () => {
    it('should be ignored', () => {
      const ctx = context();

      try {
        ctx.throw(400, 'msg', {
          prop: true,
          status: -1,
        });
      } catch (err) {
        assert.equal(err.message, 'msg');
        assert.equal(err.status, 400);
        assert.equal(err.expose, true);
        assert.equal(err.prop, true);
      }
    });
  });

  describe('when props include message', () => {
    it('should not be ignored', () => {
      const ctx = context();

      try {
        ctx.throw(400, 'msg', {
          prop: true,
          status: -1,
          message: "haha",
        });
      } catch (err) {
        assert.equal(err.message, 'haha');
        assert.equal(err.status, 400);
        assert.equal(err.expose, true);
        assert.equal(err.prop, true);
      }
    });
  });
});

describe('ctx.throw(msg, props)', () => {
  it('should mixin props', () => {
    const ctx = context();

    try {
      ctx.throw('msg', { prop: true, msg: "haha" });
    } catch (err) {
      assert.equal(err.message, 'msg');
      assert.equal(err.status, 500);
      assert.equal(err.expose, false);
      assert.equal(err.prop, true);
      assert.equal(err.msg, "haha");
    }
  });
});

describe('ctx.throw(status, props)', () => {
  it('should mixin props - code = 400', () => {
    const ctx = context();

    try {
      ctx.throw(400, { prop: true });
    } catch (err) {
      assert.equal(err.message, 'Bad Request');
      assert.equal(err.status, 400);
      assert.equal(err.expose, true); // code = 400, the expose is true
      assert.equal(err.prop, true);
    }
  });

  it('should mixin props - code = 500', () => {
    const ctx = context();

    try {
      ctx.throw(500, { prop: true });
    } catch (err) {
      assert.equal(err.message, 'Internal Server Error');
      assert.equal(err.status, 500);
      assert.equal(err.expose, false); // code = 500, the expose is false
      assert.equal(err.prop, true);
    }
  });
});

describe('ctx.throw(err, props)', () => {
  it('should mixin props', () => {
    const ctx = context();

    try {
      ctx.throw(new Error('test'), { prop: true });
    } catch (err) {
      assert.equal(err.message, 'test');
      assert.equal(err.status, 500);
      assert.equal(err.expose, false);
      assert.equal(err.prop, true);
    }
  });
});
