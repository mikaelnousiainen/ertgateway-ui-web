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
  NODE_IMAGES_FETCHED,
} from './constants';

const initialState = fromJS({
  messageReceptionConnectionActive: false,
  followMessageReception: true,
  gatewayMessages: [],
  nodeMessages: [],
  nodeImages: [],
  deviceConfig: {},
  deviceConfigLoading: false,
  commProtocolStreams: {},
  commProtocolDataLoading: false,
});

function trackerReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_RECEPTION_CONNECTION_ESTABLISHED:
      return state
        .set('messageReceptionConnectionActive', true);
    case MESSAGE_RECEPTION_CONNECTION_CLOSED:
      return state
        .set('messageReceptionConnectionActive', false);
    case CLEAR_MESSAGE_HISTORY:
      return state
        .set('gatewayMessages', fromJS([]))
        .set('nodeMessages', fromJS([]))
        .set('nodeImages', fromJS([]))
        .set('selectedNodeMessage', null)
        .set('centeredNodeMessage', null)
        .set('hoveredNodeMessage', null)
        .set('selectedGatewayMessage', null)
        .set('centeredGatewayMessage', null)
        .set('hoveredGatewayMessage', null);
    case SET_FOLLOW_MESSAGE_RECEPTION: {
      let currentState = state;

      if (action.enable) {
        const selectedNodeMessage = state.get('nodeMessages').get(0);
        const selectedGatewayMessage = state.get('gatewayMessages').get(0);

        currentState = state
          .set('selectedNodeMessage', selectedNodeMessage)
          .set('centeredNodeMessage', selectedNodeMessage)
          .set('selectedGatewayMessage', selectedGatewayMessage)
          .set('centeredGatewayMessage', selectedGatewayMessage);
      }

      return currentState
        .set('followMessageReception', action.enable);
    }
    case FETCH_DEVICE_CONFIG:
    case UPDATE_DEVICE_CONFIG:
      return state
        .set('deviceConfigLoading', true);
    case DEVICE_CONFIG_FETCHED:
    case DEVICE_CONFIG_UPDATED:
      return state
        .set('deviceConfig', fromJS(action.config))
        .set('deviceConfigLoading', false);
    case FETCH_COMM_PROTOCOL_STREAMS:
      return state
        .set('commProtocolDataLoading', true);
    case COMM_PROTOCOL_STREAMS_FETCHED:
      return state
        .set('commProtocolStreams', fromJS(action.data))
        .set('commProtocolDataLoading', false);
    case GATEWAY_MESSAGE_HISTORY_FETCHED: {
      const selectedMessage = action.messages[0];
      const centeredMessage = selectedMessage;

      return state
        .set('gatewayMessages', fromJS(action.messages))
        .set('selectedGatewayMessage', selectedMessage)
        .set('centeredGatewayMessage', centeredMessage)
        .set('hoveredGatewayMessage', null);
    }
    case NODE_MESSAGE_HISTORY_FETCHED: {
      const selectedMessage = action.messages[0];
      const centeredMessage = selectedMessage;

      return state
        .set('nodeMessages', fromJS(action.messages))
        .set('selectedNodeMessage', selectedMessage)
        .set('centeredNodeMessage', centeredMessage)
        .set('hoveredNodeMessage', null);
    }
    case POST_GATEWAY_MESSAGE: {
      const followMessageReception = state.get('followMessageReception');

      let selectedMessage = state.get('selectedGatewayMessage');
      if (!selectedMessage || followMessageReception) {
        selectedMessage = action.message;
      }

      let centeredMessage = state.get('centeredGatewayMessage');
      if (!centeredMessage || followMessageReception) {
        centeredMessage = action.message;
      }

      return state
        .set('gatewayMessages', state.get('gatewayMessages').unshift(action.message))
        .set('selectedGatewayMessage', selectedMessage)
        .set('centeredGatewayMessage', centeredMessage);
    }
    case SELECT_GATEWAY_MESSAGE:
      return state
        .set('selectedGatewayMessage', action.message);
    case HOVER_GATEWAY_MESSAGE:
      return state
        .set('hoveredGatewayMessage', action.message);
    case CENTER_GATEWAY_MESSAGE:
      return state
        .set('centeredGatewayMessage', action.message);
    case CHANGE_GATEWAY_MAP_BOUNDS:
      return state
        .set('gatewayMapBounds', action.bounds);
    case POST_NODE_MESSAGE: {
      const followMessageReception = state.get('followMessageReception');

      let selectedMessage = state.get('selectedNodeMessage');
      if (!selectedMessage || followMessageReception) {
        selectedMessage = action.message;
      }

      let centeredMessage = state.get('centeredNodeMessage');
      if (!centeredMessage || followMessageReception) {
        centeredMessage = action.message;
      }

      return state
        .set('nodeMessages', state.get('nodeMessages').unshift(action.message))
        .set('selectedNodeMessage', selectedMessage)
        .set('centeredNodeMessage', centeredMessage);
    }
    case SELECT_NODE_MESSAGE:
      return state
        .set('selectedNodeMessage', action.message);
    case HOVER_NODE_MESSAGE:
      return state
        .set('hoveredNodeMessage', action.message);
    case CENTER_NODE_MESSAGE:
      return state
        .set('centeredNodeMessage', action.message);
    case CHANGE_NODE_MAP_BOUNDS:
      return state
        .set('nodeMapBounds', action.bounds);
    case POST_NODE_IMAGE:
      return state
        .set('nodeImages', state.get('nodeImages').unshift(action.image));
    case NODE_IMAGES_FETCHED:
      return state
        .set('nodeImages', fromJS(action.images));
    default:
      return state;
  }
}

export default trackerReducer;
