/*
 * Embedded Radio Tracker
 *
 * Copyright (C) 2017 Mikael Nousiainen
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { takeLatest } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';

import request from 'utils/request';

import { postNotification } from 'containers/App/actions';

import {
  FETCH_COMM_PROTOCOL_STREAMS,
} from './constants';

import {
  commProtocolStreamsFetched,
} from './actions';

export function* fetchCommProtocolStreams() {
  const url = '/api/comm-protocol/active-streams';

  try {
    const config = yield call(request, url);
    yield put(commProtocolStreamsFetched(config));
  } catch (err) {
    const notification = {
      type: 'error',
      message: 'Error fetching comm protocol streams',
      description: err.message,
      data: err,
    };
    yield put(postNotification(notification));
  }
}

function* fetchCommProtocolStreamsWatcher() {
  yield fork(takeLatest, FETCH_COMM_PROTOCOL_STREAMS, fetchCommProtocolStreams);
}

export function* watchFetchCommProtocolStreams() {
  yield fork(fetchCommProtocolStreamsWatcher);
}
