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
  START_MESSAGE_RECEPTION,
  STOP_MESSAGE_RECEPTION,
  SET_FOLLOW_MESSAGE_RECEPTION,
  MESSAGE_RECEPTION_CONNECTION_ESTABLISHED,
  MESSAGE_RECEPTION_CONNECTION_CLOSED,
  FETCH_DEVICE_CONFIG,
  DEVICE_CONFIG_FETCHED,
  UPDATE_DEVICE_CONFIG,
  DEVICE_CONFIG_UPDATED,
  FETCH_COMM_PROTOCOL_STREAMS,
  COMM_PROTOCOL_STREAMS_FETCHED,
  CLEAR_MESSAGE_HISTORY,
  FETCH_MESSAGE_HISTORY,
  GATEWAY_MESSAGE_HISTORY_FETCHED,
  NODE_MESSAGE_HISTORY_FETCHED,
  POST_GATEWAY_MESSAGE,
  SELECT_GATEWAY_MESSAGE,
  HOVER_GATEWAY_MESSAGE,
  CENTER_GATEWAY_MESSAGE,
  CHANGE_GATEWAY_MAP_BOUNDS,
  POST_NODE_MESSAGE,
  SELECT_NODE_MESSAGE,
  HOVER_NODE_MESSAGE,
  CENTER_NODE_MESSAGE,
  CHANGE_NODE_MAP_BOUNDS,
  POST_NODE_IMAGE,
  FETCH_NODE_IMAGES,
  NODE_IMAGES_FETCHED,
} from './constants';

export function startMessageReception() {
  return {
    type: START_MESSAGE_RECEPTION,
  };
}

export function stopMessageReception() {
  return {
    type: STOP_MESSAGE_RECEPTION,
  };
}

export function messageReceptionConnectionEstablished(endpoint, data) {
  return {
    type: MESSAGE_RECEPTION_CONNECTION_ESTABLISHED,
    endpoint,
    data,
  };
}

export function messageReceptionConnectionClosed(endpoint, clean, data) {
  return {
    type: MESSAGE_RECEPTION_CONNECTION_CLOSED,
    endpoint,
    clean,
    data,
  };
}

export function setFollowMessageReception(enable) {
  return {
    type: SET_FOLLOW_MESSAGE_RECEPTION,
    enable,
  };
}

export function clearMessageHistory() {
  return {
    type: CLEAR_MESSAGE_HISTORY,
  };
}

export function fetchDeviceConfig() {
  return {
    type: FETCH_DEVICE_CONFIG,
  };
}

export function deviceConfigFetched(config) {
  return {
    type: DEVICE_CONFIG_FETCHED,
    config,
  };
}

export function updateDeviceConfig(config) {
  return {
    type: UPDATE_DEVICE_CONFIG,
    config,
  };
}

export function deviceConfigUpdated(config) {
  return {
    type: DEVICE_CONFIG_UPDATED,
    config,
  };
}

export function fetchCommProtocolStreams() {
  return {
    type: FETCH_COMM_PROTOCOL_STREAMS,
  };
}

export function commProtocolStreamsFetched(data) {
  return {
    type: COMM_PROTOCOL_STREAMS_FETCHED,
    data,
  };
}

export function fetchMessageHistory(offset, count) {
  return {
    type: FETCH_MESSAGE_HISTORY,
    offset,
    count,
  };
}

export function gatewayMessageHistoryFetched(messages) {
  return {
    type: GATEWAY_MESSAGE_HISTORY_FETCHED,
    messages,
  };
}

export function nodeMessageHistoryFetched(messages) {
  return {
    type: NODE_MESSAGE_HISTORY_FETCHED,
    messages,
  };
}

export function postGatewayMessage(message) {
  return {
    type: POST_GATEWAY_MESSAGE,
    message,
  };
}

export function selectGatewayMessage(message) {
  return {
    type: SELECT_GATEWAY_MESSAGE,
    message,
  };
}

export function hoverGatewayMessage(message) {
  return {
    type: HOVER_GATEWAY_MESSAGE,
    message,
  };
}

export function centerGatewayMessage(message) {
  return {
    type: CENTER_GATEWAY_MESSAGE,
    message,
  };
}

export function changeGatewayMapBounds(bounds) {
  return {
    type: CHANGE_GATEWAY_MAP_BOUNDS,
    bounds,
  };
}

export function postNodeMessage(message) {
  return {
    type: POST_NODE_MESSAGE,
    message,
  };
}

export function selectNodeMessage(message) {
  return {
    type: SELECT_NODE_MESSAGE,
    message,
  };
}

export function hoverNodeMessage(message) {
  return {
    type: HOVER_NODE_MESSAGE,
    message,
  };
}

export function centerNodeMessage(message) {
  return {
    type: CENTER_NODE_MESSAGE,
    message,
  };
}

export function changeNodeMapBounds(bounds) {
  return {
    type: CHANGE_NODE_MAP_BOUNDS,
    bounds,
  };
}

export function postNodeImage(image) {
  return {
    type: POST_NODE_IMAGE,
    image,
  };
}

export function fetchNodeImages(offset, count) {
  return {
    type: FETCH_NODE_IMAGES,
    offset,
    count,
  };
}

export function nodeImagesFetched(images) {
  return {
    type: NODE_IMAGES_FETCHED,
    images,
  };
}
