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
  FETCH_MESSAGE_HISTORY,
} from './constants';

import {
  gatewayMessageHistoryFetched,
  nodeMessageHistoryFetched,
} from './actions';

function createFetchMessageHistoryFunction(endpoint, createMessageHistoryFetchedAction) {
  return function* fetchMessageHistory(action) {
    const offset = action.offset;
    const count = action.count;
    const url = `/api/data-logger/history/${endpoint}?offset=${offset}&count=${count}`;

    try {
      const messages = yield call(request, url);
      yield put(createMessageHistoryFetchedAction(messages)); // nodeMessageHistoryFetched
    } catch (err) {
      const notification = {
        type: 'error',
        message: `Error fetching ${endpoint} message history`,
        description: err.message,
        data: err,
      };
      yield put(postNotification(notification));
    }
  };
}

export const fetchNodeMessageHistory = createFetchMessageHistoryFunction(
  'node', (messages) => nodeMessageHistoryFetched(messages));

export const fetchGatewayMessageHistory = createFetchMessageHistoryFunction(
  'gateway', (messages) => gatewayMessageHistoryFetched(messages));

function* fetchNodeMessageHistoryWatcher() {
  yield fork(takeLatest, FETCH_MESSAGE_HISTORY, fetchNodeMessageHistory);
}

export function* watchNodeMessageHistory() {
  yield fork(fetchNodeMessageHistoryWatcher);

  // Suspend execution until location changes
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
}

function* fetchGatewayMessageHistoryWatcher() {
  yield fork(takeLatest, FETCH_MESSAGE_HISTORY, fetchGatewayMessageHistory);
}

export function* watchGatewayMessageHistory() {
  yield fork(fetchGatewayMessageHistoryWatcher);

  // Suspend execution until location changes
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
}

