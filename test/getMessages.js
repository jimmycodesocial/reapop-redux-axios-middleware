/**
 * Copyright(c) 2016 JimmyCode Social <hi@jimmycode.com> (https://jimmycode.com)
 */

'use strict';

import { expect } from 'chai';
import { getMessages } from '../src/getMessages';

describe('getMessages', () => {
  it ('should return null for unknown action', () => {
    const action = { };
    const messages = getMessages(action);

    expect(messages).to.eql({
      request: null,
      success: null,
      error: null
    });
  });

  describe('_REQUEST', () => {
    it ('should extract messages from action', () => {
      const action = {
        type: 'AJAX_REQUEST',
        payload: {
          messages: []
        }
      };

      const messages = getMessages(action);

      expect(messages).to.eql({
        request: null,
        success: null,
        error: null
      });
    });

    it ('should extract messages from action', () => {
      const action = {
        type: 'AJAX_REQUEST',
        payload: {
          messages: [
            {}, // REQUEST
            {}, // SUCCESS
            {}  // FAILURE
          ]
        }
      };

      const messages = getMessages(action);

      expect(messages).to.not.eql({
        request: null,
        success: null,
        error: null
      });
    });
  });

  describe('_SUCCESS|_FAIL|_FAILURE', () => {
    it ('should extract messages from action', () => {
      const action = {
        type: 'AJAX_SUCCESS',
        meta: {
          previousAction: {
            payload: {
              messages: []
            }
          }
        }
      };

      const messages = getMessages(action);

      expect(messages).to.eql({
        request: null,
        success: null,
        error: null
      });
    });

    it ('should extract messages from action', () => {
      const action = {
        type: 'AJAX_SUCCESS',
        meta: {
          previousAction: {
            payload: {
              messages: [
                {}, // REQUEST
                {}, // SUCCESS
                {}  // FAILURE
              ]
            }
          }
        }
      };

      const messages = getMessages(action);

      expect(messages).to.not.eql({
        request: null,
        success: null,
        error: null
      });

      expect(messages).to.eql({
        request: {},
        success: {},
        error: {}
      });
    });
  });

  describe('Messages', () => {
    const request = {
      title: 'Loading',
      message: 'Your profile is loading...',
      status: 'info',
      dismissible: true,
      dismissAfter: 3000
    };

    const success = {
      title: 'Profile',
      message: 'Welcome to your profile.',
      status: 'success',
      dismissible: true,
      dismissAfter: 3000
    };

    const error = {
      title: 'Profile',
      message: 'Ups, and error occurred.',
      status: 'error',
      dismissible: true,
      dismissAfter: 3000
    };

    it ('should accept message for each status', () => {
      const action = {
        type: 'AJAX_REQUEST',
        payload: {
          messages: [
            {}, // REQUEST
            {}, // SUCCESS
            {}  // FAILURE
          ]
        }
      };

      const messages = getMessages(action);

      expect(messages).to.eql({
        request: {},
        success: {},
        error: {}
      });
    });

    it ('should accept message for each status', () => {
      const action = {
        type: 'AJAX_REQUEST',
        payload: {
          messages: [
            request,
            success,
            error
          ]
        }
      };

      const messages = getMessages(action);

      expect(messages).to.eql({
        request: request,
        success: success,
        error: error
      });
    });

    it ('should accept two declarations (success, error)', () => {
      const action = {
        type: 'AJAX_REQUEST',
        payload: {
          messages: [
            success,
            error
          ]
        }
      };

      const messages = getMessages(action);

      expect(messages).to.eql({
        request: null,
        success: success,
        error: error
      });
    });

    it ('should accept error declaration', () => {
      const action = {
        type: 'AJAX_REQUEST',
        payload: {
          messages: [
            null,
            error
          ]
        }
      };

      const messages = getMessages(action);

      expect(messages).to.eql({
        request: null,
        success: null,
        error: error
      });
    });

    it ('should accept one declaration', () => {
      const action = {
        type: 'AJAX_REQUEST',
        payload: {
          messages: [
            success
          ]
        }
      };

      const messages = getMessages(action);

      expect(messages).to.eql({
        request: null,
        success: success,
        error: null
      });
    });

    it ('should accept one object declaration', () => {
      const action = {
        type: 'AJAX_REQUEST',
        payload: {
          messages: success
        }
      };

      const messages = getMessages(action);

      expect(messages).to.eql({
        request: null,
        success: success,
        error: null
      });
    });
  });
});
