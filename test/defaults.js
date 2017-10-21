/**
 * Copyright(c) 2016 JimmyCode Social <hi@jimmycode.com> (https://jimmycode.com)
 */

'use strict';

import { expect } from 'chai';
import { isAxiosRequest } from './../src/defaults';

describe('defaults', () => {
  describe('isAxiosRequest', () => {
    it('should check valid axios request', () => {
      const action = { payload: { request: {} } };
      const check = isAxiosRequest(action);

      expect(check).to.be.ok;
    });

    it('should check valid axios request', () => {
      const action = { payload: {} };
      const check = isAxiosRequest(action);

      expect(check).to.be.not.ok;
    });

    it('should check valid axios request', () => {
      const action = { payload: { request: null } };
      const check = isAxiosRequest(action);

      expect(check).to.be.not.ok;
    });
  });
});
