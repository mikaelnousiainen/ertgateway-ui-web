/*
 * Embedded Radio Tracker
 *
 * Copyright (C) 2017 Mikael Nousiainen
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const WEBSOCKET_MESSAGE_CLASS_CONNECTION_ESTABLISHED = 'connection-established';
const WEBSOCKET_MESSAGE_CLASS_CONNECTION_CLOSED = 'connection-closed';
const WEBSOCKET_MESSAGE_CLASS_DATA = 'data';
const WEBSOCKET_MESSAGE_CLASS_NOTIFICATION = 'error';

class TrackerWebSocket {
  constructor(url, protocols) {
    this.url = url;
    this.protocols = protocols;
    this.listeners = [];
    this.ws = null;
  }

  open() {
    this.ws = new WebSocket(this.url, this.protocols);

    this.ws.onopen = (event) => {
      this.onOpen(event);
    };

    this.ws.onmessage = (event) => {
      this.onMessage(event);
    };

    this.ws.onerror = (event) => {
      this.onError(event);
    };

    this.ws.onclose = (event) => {
      this.onClose(event);
    };
  }

  send(message) {
    this.ws.send(JSON.stringify(message));
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  onMessage(event) {
    const message = {
      messageClass: WEBSOCKET_MESSAGE_CLASS_DATA,
      data: JSON.parse(event.data),
    };

    this.fireMessage(message);
  }

  onError(event) {
    const message = {
      messageClass: WEBSOCKET_MESSAGE_CLASS_NOTIFICATION,
      data: {
        type: 'error',
        message: 'WebSocket connection failed',
        description: `Endpoint: ${event.target.url}`,
        data: event,
      },
    };

    this.fireMessage(message);
  }

  onOpen(event) {
    let message = {
      messageClass: WEBSOCKET_MESSAGE_CLASS_CONNECTION_ESTABLISHED,
      endpoint: event.target.url,
      data: event,
    };

    this.fireMessage(message);

    message = {
      messageClass: WEBSOCKET_MESSAGE_CLASS_NOTIFICATION,
      data: {
        type: 'info',
        message: 'WebSocket connection established',
        description: `Endpoint: ${event.target.url}`,
        data: event,
      },
    };

    this.fireMessage(message);
  }

  onClose(event) {
    let message;

    if (event.wasClean) {
      message = {
        messageClass: WEBSOCKET_MESSAGE_CLASS_NOTIFICATION,
        data: {
          type: 'info',
          message: 'WebSocket connection closed',
          description: `Endpoint: ${event.target.url}`,
          data: event,
        },
      };
    } else {
      message = {
        messageClass: WEBSOCKET_MESSAGE_CLASS_NOTIFICATION,
        data: {
          type: 'error',
          message: 'WebSocket connection failed and closed',
          description: `Endpoint: ${event.target.url}, Reason: "${event.reason}", Code: ${event.code}`,
          data: event,
        },
      };
    }

    this.fireMessage(message);

    message = {
      messageClass: WEBSOCKET_MESSAGE_CLASS_CONNECTION_CLOSED,
      endpoint: event.target.url,
      clean: event.wasClean,
      data: event,
    };

    this.fireMessage(message);
  }

  fireMessage(message) {
    this.listeners.forEach((listener) => listener(message));
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export {
  TrackerWebSocket,
  WEBSOCKET_MESSAGE_CLASS_CONNECTION_ESTABLISHED,
  WEBSOCKET_MESSAGE_CLASS_CONNECTION_CLOSED,
  WEBSOCKET_MESSAGE_CLASS_DATA,
  WEBSOCKET_MESSAGE_CLASS_NOTIFICATION,
};
