# reapop-redux-axios-middleware
Redux middleware to trigger reapop's notifications from axios actions.

[![Build Status](https://travis-ci.org/jimmycodesocial/reapop-redux-axios-middleware.svg?branch=master)](https://travis-ci.org/jimmycodesocial/reapop-redux-axios-middleware)

## Overview
This module allows you to dispatch notifications from [axios actions](https://github.com/svrcekmichal/redux-axios-middleware) using [reapop](https://github.com/LouisBarranqueiro/reapop).

## Installation
Fist, install redux-axios-middleware and reapop. Then:
```
npm i -S reapop-redux-axios-middleware
```

## Notifications
```
export const saveProfile = (userId, profile) => {
  return {
    types: [SAVE_PROFILE_REQUEST, SAVE_PROFILE_SUCCESS, SAVE_PROFILE_FAILURE],
    payload: {
      request: {
        url: `/users/${userId}`,
        method: 'PUT',
        data: profile,
      },
      messages: [{
        title: 'Profile',
        message: 'The profile was saved!',
        status: 'success',
        dismissible: true,
        dismissAfter: 3000
      }, 
      {
        title: 'Profile',
        message: 'Error saving the profile.',
        status: 'error',
        dismissible: true,
        dismissAfter: 3000
      }]
    }
  };
};
```
