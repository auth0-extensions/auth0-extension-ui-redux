'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import { promiseSuccessMiddleware } from '../../src';

const { describe, it } = global;

describe('PromiseSuccessMiddleware', () => {
  let next;
  let action;

  beforeEach((done) => {
    next = sinon.spy();
    action = {
      type: 'MY_ACTION_FULFILLED',
      meta: {
        onSuccess: sinon.spy()
      }
    };

    done();
  });

  it('should call onSuccess', () => {
    promiseSuccessMiddleware()()(next)(action);
    expect(action.meta.onSuccess.calledOnce).to.be.true;
  });
});
