/**
 * Copyright(c) 2016 JimmyCode Social <hi@jimmycode.com> (https://jimmycode.com)
 */

'use strict';

import { expect } from 'chai';
import { applyMessageToAction } from '../src/middleware';

describe('middleware', () => {
  describe('applyMessageToAction', () => {
    const request = {
      title: 'Loading',
      message: 'Your profile is loading...',
      status: 'info',
      dismissible: true,
      dismissAfter: 3000
    };

    it ('should return a message', () => {
      const message = applyMessageToAction(request, {}, 'info');
      expect(message).to.eql(request);
    });
  });
});
