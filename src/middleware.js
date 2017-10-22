/**
 * Copyright(c) 2016 JimmyCode Social <hi@jimmycode.com> (https://jimmycode.com)
 */

'use strict';

import _ from 'lodash';
import { addNotification as notify } from 'reapop';
import { getMessages } from './getMessages';
import { isAxiosRequest } from './defaults';

/**
 * Expand message as notification.
 * Messages type function are invoked and must return a notification object.
 *
 * @param message The message extracted from the action.
 * @param action  The action.
 * @param level   Default notification status.
 */
export const applyMessageToAction = (message, action, level = 'success') => {
  if (typeof message === 'function' || message instanceof Function) {
    message = message(action);
  }

  return _.merge(
    {},
    { status: level },
    message
  );
};

/**
 * Extract messages from Axios actions and dispatch notifications.
 */
export const reapopAxiosMiddleware = store => next => action => {
  if (action.type && isAxiosRequest(action)) {
    const messages = getMessages(action);
    let message = null;

    if (messages.request && action.type.endsWith('_REQUEST')) {
      message = applyMessageToAction(messages.request, action, 'info');
    }

    if (messages.success && action.type.endsWith('_SUCCESS')) {
      message = applyMessageToAction(messages.success, action, 'success');
    }

    if (messages.error && (action.type.endsWith('_FAILURE') || action.type.endsWith('_FAIL'))) {
      message = applyMessageToAction(messages.error, action, 'error');
    }

    if (message) {
      store.dispatch(
        notify(message)
      );
    }
  }

  return next(action)
};

export default reapopAxiosMiddleware;
