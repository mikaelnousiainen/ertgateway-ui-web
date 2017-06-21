/*
 * Embedded Radio Tracker
 *
 * Copyright (C) 2017 Mikael Nousiainen
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { fromJS } from 'immutable';

import {
  POST_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
} from './constants';

const initialState = fromJS({
  notifications: [],
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case POST_NOTIFICATION:
      return state.set('notifications', state.get('notifications').push(action.notification));
    case CLEAR_NOTIFICATIONS:
      return state.set('notifications', fromJS([]));
    default:
      return state;
  }
}

export default globalReducer;
