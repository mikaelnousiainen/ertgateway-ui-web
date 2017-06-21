/*
 * Embedded Radio Tracker
 *
 * Copyright (C) 2017 Mikael Nousiainen
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {
  POST_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
} from './constants';

export function postNotification({ type, message, description, data }) {
  return {
    type: POST_NOTIFICATION,
    notification: {
      type,
      message,
      description,
      data,
    },
  };
}

export function clearNotifications() {
  return {
    type: CLEAR_NOTIFICATIONS,
  };
}
