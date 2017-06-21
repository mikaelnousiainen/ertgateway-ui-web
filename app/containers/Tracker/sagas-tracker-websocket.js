/*
 * Embedded Radio Tracker
 *
 * Copyright (C) 2017 Mikael Nousiainen
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { eventChannel } from 'redux-saga';
import { take, call, fork, put, race, cancelled } from 'redux-saga/effects';

import { postNotification } from 'containers/App/actions';

import {
  TrackerWebSocket,
  WEBSOCKET_MESSAGE_CLASS_CONNECTION_ESTABLISHED,
  WEBSOCKET_MESSAGE_CLASS_CONNECTION_CLOSED,
  WEBSOCKET_MESSAGE_CLASS_DATA,
  WEBSOCKET_MESSAGE_CLASS_NOTIFICATION,
} from './TrackerWebSocket';

import {
  START_MESSAGE_RECEPTION,
  STOP_MESSAGE_RECEPTION,
  MESSAGE_RECEPTION_CONNECTION_CLOSED,
} from './constants';

import {
  messageReceptionConnectionEstablished,
  messageReceptionConnectionClosed,
  postGatewayMessage,
  postNodeMessage,
  postNodeImage,
} from './actions';

import {
  toImageObject,
} from './sagas-common';

const MESSAGE_TYPE_NODE_TELEMETRY = 0x01;
const MESSAGE_TYPE_GATEWAY_TELEMETRY = 0x02;
const MESSAGE_TYPE_NODE_IMAGE = 0x41;

const WEBSOCKET_PROTOCOL_DATA_LOGGER = 'ert-data-logger';

class WebSocketMessageListenerContext {
  constructor() {
    this.trackerWebSocket = null;
  }

  setTrackerWebSocket(trackerWebSocket) {
    this.trackerWebSocket = trackerWebSocket;
  }
}

function getWebsocketUrl() {
  const location = window.location;

  const protocol = (location.protocol === 'https:' ? 'wss:' : 'ws:');

  const host = location.host;

  return `${protocol}//${host}/api/`;
}

function webSocketMessageEmitter(socket) {
  return eventChannel((emitter) => {
    const listener = (message) => {
      emitter(message);
    };

    socket.addListener(listener);

    return () => {
      socket.removeListener(listener);
      socket.close();
    };
  });
}

function* handleDataMessage(dataMessage) {
  switch (dataMessage.type) {
    case MESSAGE_TYPE_NODE_TELEMETRY:
      yield put(postNodeMessage(dataMessage));
      break;
    case MESSAGE_TYPE_GATEWAY_TELEMETRY:
      yield put(postGatewayMessage(dataMessage));
      break;
    case MESSAGE_TYPE_NODE_IMAGE: {
      yield put(postNodeImage(toImageObject(dataMessage.file)));

      const notification = {
        type: 'info',
        message: 'New image received from node',
        description: `File name: ${dataMessage.file}`,
      };

      yield put(postNotification(notification));
      break;
    }
    default: {
      const notification = {
        type: 'warning',
        message: 'Unknown ERT message type',
        description: `Unknown ERT message type ${dataMessage.type}: ${JSON.stringify(dataMessage)}`,
      };
      yield put(postNotification(notification));
    }
  }
}

function* listen(context) {
  const webSocketUrl = getWebsocketUrl();

  const webSocket = new TrackerWebSocket(webSocketUrl, WEBSOCKET_PROTOCOL_DATA_LOGGER);
  const chan = yield call(webSocketMessageEmitter, webSocket);

  context.setTrackerWebSocket(webSocket);
  webSocket.open();

  try {
    while (true) {
      const message = yield take(chan);

      switch (message.messageClass) {
        case WEBSOCKET_MESSAGE_CLASS_CONNECTION_ESTABLISHED:
          yield put(messageReceptionConnectionEstablished(message.endpoint, message.event));
          break;
        case WEBSOCKET_MESSAGE_CLASS_CONNECTION_CLOSED:
          yield put(messageReceptionConnectionClosed(message.endpoint, message.clean, message.event));
          break;
        case WEBSOCKET_MESSAGE_CLASS_DATA:
          yield handleDataMessage(message.data);
          break;
        case WEBSOCKET_MESSAGE_CLASS_NOTIFICATION:
          yield put(postNotification(message.data));
          break;
        default: {
          const notification = {
            type: 'warning',
            message: 'Unknown WebSocket message class',
            description: `Unknown WebSocket message class ${message.messageClass}: ${JSON.stringify(message)}`,
          };
          yield put(postNotification(notification));
        }
      }
    }
  } finally {
    if (yield cancelled()) {
      chan.close();
    }
  }
}

function* watchStartMessageReception(context) {
  while (true) {
    yield take(START_MESSAGE_RECEPTION);
    yield race({
      task: call(listen, context),
      cancel: take([MESSAGE_RECEPTION_CONNECTION_CLOSED]),
    });
  }
}

function* watchStopMessageReception(context) {
  while (true) {
    yield take([STOP_MESSAGE_RECEPTION, MESSAGE_RECEPTION_CONNECTION_CLOSED]);
    if (context.trackerWebSocket) {
      context.trackerWebSocket.close();
    }
  }
}

export function* watchMessageReception() {
  const context = new WebSocketMessageListenerContext();

  yield fork(watchStartMessageReception, context);
  yield fork(watchStopMessageReception, context);
}
