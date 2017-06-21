/*
 * Embedded Radio Tracker
 *
 * Copyright (C) 2017 Mikael Nousiainen
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

export const START_MESSAGE_RECEPTION = 'ert/Tracker/START_MESSAGE_RECEPTION';
export const STOP_MESSAGE_RECEPTION = 'ert/Tracker/STOP_MESSAGE_RECEPTION';
export const SET_FOLLOW_MESSAGE_RECEPTION = 'ert/Tracker/SET_FOLLOW_MESSAGE_RECEPTION';

export const MESSAGE_RECEPTION_CONNECTION_ESTABLISHED = 'ert/Tracker/MESSAGE_RECEPTION_CONNECTION_ESTABLISHED';
export const MESSAGE_RECEPTION_CONNECTION_CLOSED = 'ert/Tracker/MESSAGE_RECEPTION_CONNECTION_CLOSED';

export const FETCH_DEVICE_CONFIG = 'ert/Tracker/FETCH_DEVICE_CONFIG';
export const DEVICE_CONFIG_FETCHED = 'ert/Tracker/DEVICE_CONFIG_FETCHED';
export const UPDATE_DEVICE_CONFIG = 'ert/Tracker/UPDATE_DEVICE_CONFIG';
export const DEVICE_CONFIG_UPDATED = 'ert/Tracker/DEVICE_CONFIG_UPDATED';

export const FETCH_COMM_PROTOCOL_STREAMS = 'ert/Tracker/FETCH_COMM_PROTOCOL_STREAMS';
export const COMM_PROTOCOL_STREAMS_FETCHED = 'ert/Tracker/COMM_PROTOCOL_STREAMS_FETCHED';

export const CLEAR_MESSAGE_HISTORY = 'ert/Tracker/CLEAR_MESSAGE_HISTORY';
export const FETCH_MESSAGE_HISTORY = 'ert/Tracker/FETCH_MESSAGE_HISTORY';
export const GATEWAY_MESSAGE_HISTORY_FETCHED = 'ert/Tracker/GATEWAY_MESSAGE_HISTORY_FETCHED';
export const NODE_MESSAGE_HISTORY_FETCHED = 'ert/Tracker/NODE_MESSAGE_HISTORY_FETCHED';

export const POST_GATEWAY_MESSAGE = 'ert/Tracker/POST_GATEWAY_MESSAGE';
export const SELECT_GATEWAY_MESSAGE = 'ert/Tracker/SELECT_GATEWAY_MESSAGE';
export const HOVER_GATEWAY_MESSAGE = 'ert/Tracker/HOVER_GATEWAY_MESSAGE';
export const CENTER_GATEWAY_MESSAGE = 'ert/Tracker/CENTER_GATEWAY_MESSAGE';
export const CHANGE_GATEWAY_MAP_BOUNDS = 'ert/Tracker/CHANGE_GATEWAY_MAP_BOUNDS';

export const POST_NODE_MESSAGE = 'ert/Tracker/POST_NODE_MESSAGE';
export const SELECT_NODE_MESSAGE = 'ert/Tracker/SELECT_NODE_MESSAGE';
export const HOVER_NODE_MESSAGE = 'ert/Tracker/HOVER_NODE_MESSAGE';
export const CENTER_NODE_MESSAGE = 'ert/Tracker/CENTER_NODE_MESSAGE';
export const CHANGE_NODE_MAP_BOUNDS = 'ert/Tracker/CHANGE_NODE_MAP_BOUNDS';

export const POST_NODE_IMAGE = 'ert/Tracker/POST_NODE_IMAGE';
export const FETCH_NODE_IMAGES = 'ert/Tracker/FETCH_NODE_IMAGES';
export const NODE_IMAGES_FETCHED = 'ert/Tracker/NODE_IMAGES_FETCHED';
