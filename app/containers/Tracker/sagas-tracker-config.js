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
  FETCH_DEVICE_CONFIG,
  UPDATE_DEVICE_CONFIG,
} from './constants';

import {
  deviceConfigFetched,
  deviceConfigUpdated,
} from './actions';

export function* fetchDeviceConfig() {
  const url = '/api/config';

  try {
    const config = yield call(request, url);
    yield put(deviceConfigFetched(config));
  } catch (err) {
    const notification = {
      type: 'error',
      message: 'Error fetching device config',
      description: err.message,
      data: err,
    };
    yield put(postNotification(notification));
  }
}

export function* updateDeviceConfig(action) {
  const newConfig = action.config;
  const url = '/api/config';
  const options = {
    method: 'POST',
    body: JSON.stringify(newConfig),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const config = yield call(request, url, options);
    yield put(deviceConfigUpdated(config));
    const notification = {
      type: 'info',
      message: 'Device configuration updated',
    };
    yield put(postNotification(notification));
  } catch (err) {
    const notification = {
      type: 'error',
      message: 'Error updating device config',
      description: err.message,
      data: err,
    };
    yield put(postNotification(notification));
  }
}

function* fetchDeviceConfigWatcher() {
  yield fork(takeLatest, FETCH_DEVICE_CONFIG, fetchDeviceConfig);
}

export function* watchFetchDeviceConfig() {
  yield fork(fetchDeviceConfigWatcher);
}

function* updateDeviceConfigWatcher() {
  yield fork(takeLatest, UPDATE_DEVICE_CONFIG, updateDeviceConfig);
}

export function* watchUpdateDeviceConfig() {
  yield fork(updateDeviceConfigWatcher);
}

