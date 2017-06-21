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
  watchFetchDeviceConfig,
  watchUpdateDeviceConfig,
} from './sagas-tracker-config';

import {
  watchFetchCommProtocolStreams,
} from './sagas-tracker-comm-protocol';

import {
  watchGatewayMessageHistory,
  watchNodeMessageHistory,
} from './sagas-tracker-message-history';

import {
  watchImageHistory,
} from './sagas-tracker-images';

import {
  watchMessageReception,
} from './sagas-tracker-websocket';

export default [
  watchFetchDeviceConfig,
  watchUpdateDeviceConfig,
  watchFetchCommProtocolStreams,
  watchMessageReception,
  watchGatewayMessageHistory,
  watchNodeMessageHistory,
  watchImageHistory,
];
