/**
 * Copyright(c) 2016 JimmyCode Social <hi@jimmycode.com> (https://jimmycode.com)
 */

'use strict';

import _ from 'lodash';

/**
 * Extract notification from the action.
 * @param action The action.
 */
export const getMessages = (action) => {
  let notifications = {
    request: null,
    success: null,
    error: null
  };

  if (!action.type) {
    return notifications;
  }

  let messages = action.type.endsWith('_REQUEST')
    ? _.castArray(_.get(action, 'payload.messages', []))
    : _.castArray(_.get(action, 'meta.previousAction.payload.messages', []));

  const len = messages.length;

  if (len === 3) {
    notifications = {
      request: messages[0],
      success: messages[1],
      error: messages[2]
    };
  }
  else if (len === 2) {
    notifications = {
      request: null,
      success: messages[0],
      error: messages[1]
    };
  }
  else if (len === 1) {
    notifications = {
      request: null,
      success: messages[0],
      error: null
    };
  }

  return notifications;
};
