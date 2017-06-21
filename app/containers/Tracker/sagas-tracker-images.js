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
  FETCH_NODE_IMAGES,
} from './constants';

import {
  nodeImagesFetched,
} from './actions';

import {
  toImageObject,
} from './sagas-common';

export function* fetchImages(action) {
  const offset = action.offset;
  const count = action.count;
  const url = `/api/image-history?offset=${offset}&count=${count}`;

  try {
    const imageNames = yield call(request, url);
    const images = imageNames.map((file) => toImageObject(file));
    yield put(nodeImagesFetched(images));
  } catch (err) {
    const notification = {
      type: 'error',
      message: 'Error fetching node images',
      description: err.message,
      data: err,
    };
    yield put(postNotification(notification));
  }
}

function* fetchImagesWatcher() {
  yield fork(takeLatest, FETCH_NODE_IMAGES, fetchImages);
}

export function* watchImageHistory() {
  yield fork(fetchImagesWatcher);

  // Suspend execution until location changes
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
}
