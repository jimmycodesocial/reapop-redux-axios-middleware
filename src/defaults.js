/**
 * Copyright(c) 2016 JimmyCode Social <hi@jimmycode.com> (https://jimmycode.com)
 */

'use strict';

import _ from 'lodash';

export const isAxiosRequest = (action) => !!_.get(action, 'payload.request', null);
