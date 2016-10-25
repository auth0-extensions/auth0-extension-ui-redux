'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import { normalizeErrorMiddleware } from '../../src';

const { describe, it } = global;

describe('NormalizeErrorMiddleware', () => {
  let next;
  let action;

  describe('should test simple error', () => {
    beforeEach((done) => {
      next = sinon.spy();
      action = {
        type: 'MY_ACTION_REJECTED',
        payload: {
          data: {
            error: 'My Error'
          }
        }
      };

      done();
    });

    it('should call next', () => {
      normalizeErrorMiddleware()()(next)(action);
      expect(next.calledOnce).to.be.true;
    });

    it('should call next with errorMessage provided', () => {
      normalizeErrorMiddleware()()(next)(action);
      expect(next.args[0][0].errorMessage).to.be.equal('My Error');
    });
  });

  it('should handle ECONNABORTED', () => {
    next = sinon.spy();
    action = {
      type: 'MY_ACTION_REJECTED',
      payload: {
        code: 'ECONNABORTED'
      }
    };
    normalizeErrorMiddleware()()(next)(action);
    expect(next.args[0][0].errorMessage).to.be.equal('The connectioned timed out.');
  });

  it('should use error from payload', () => {
    next = sinon.spy();
    action = {
      type: 'MY_ACTION_REJECTED',
      payload: {
        error: 'My Error'
      }
    };
    normalizeErrorMiddleware()()(next)(action);
    expect(next.args[0][0].errorMessage).to.be.equal('My Error');
  });

  it('should use error message from payload', () => {
    next = sinon.spy();
    action = {
      type: 'MY_ACTION_REJECTED',
      payload: {
        error: {
          message: 'My Error'
        }
      }
    };
    normalizeErrorMiddleware()()(next)(action);
    expect(next.args[0][0].errorMessage).to.be.equal('My Error');
  });

  it('should use response data', () => {
    next = sinon.spy();
    action = {
      type: 'MY_ACTION_REJECTED',
      payload: {
        response: {
          data: 'My Error'
        }
      }
    };
    normalizeErrorMiddleware()()(next)(action);
    expect(next.args[0][0].errorMessage).to.be.equal('My Error');
  });

  it('should set message to be Unknown Server Error using statusText', () => {
    next = sinon.spy();
    action = {
      type: 'MY_ACTION_REJECTED',
      payload: {
        statusText: 'status'
      }
    };
    normalizeErrorMiddleware()()(next)(action);
    expect(next.args[0][0].errorMessage).to.be.equal('Unknown Server Error');
  });

  it('should set message to be Unknown Server Error using statusText', () => {
    next = sinon.spy();
    action = {
      type: 'MY_ACTION_REJECTED',
      payload: {
        status: 500
      }
    };
    normalizeErrorMiddleware()()(next)(action);
    expect(next.args[0][0].errorMessage).to.be.equal('Unknown Server Error');
  });
});
