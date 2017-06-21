/*
 * Embedded Radio Tracker
 *
 * Copyright (C) 2017 Mikael Nousiainen
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { createSelector } from 'reselect';

const selectTracker = () => (state) => state.get('tracker');

const selectTrackerMessageReceptionConnectionActive = () => createSelector(
  selectTracker(),
  (state) => state.get('messageReceptionConnectionActive')
);

const selectTrackerFollowMessageReception = () => createSelector(
  selectTracker(),
  (state) => state.get('followMessageReception')
);

const selectTrackerGatewayMessages = () => createSelector(
  selectTracker(),
  (state) => state.get('gatewayMessages').toJS()
);

const selectTrackerSelectedGatewayMessage = () => createSelector(
  selectTracker(),
  (state) => state.get('selectedGatewayMessage')
);

const selectTrackerHoveredGatewayMessage = () => createSelector(
  selectTracker(),
  (state) => state.get('hoveredGatewayMessage')
);

const selectTrackerCenteredGatewayMessage = () => createSelector(
  selectTracker(),
  (state) => state.get('centeredGatewayMessage')
);

const selectTrackerGatewayMapBounds = () => createSelector(
  selectTracker(),
  (state) => state.get('gatewayMapBounds')
);

const selectTrackerNodeMessages = () => createSelector(
  selectTracker(),
  (state) => state.get('nodeMessages').toJS()
);

const selectTrackerSelectedNodeMessage = () => createSelector(
  selectTracker(),
  (state) => state.get('selectedNodeMessage')
);

const selectTrackerHoveredNodeMessage = () => createSelector(
  selectTracker(),
  (state) => state.get('hoveredNodeMessage')
);

const selectTrackerCenteredNodeMessage = () => createSelector(
  selectTracker(),
  (state) => state.get('centeredNodeMessage')
);

const selectTrackerNodeMapBounds = () => createSelector(
  selectTracker(),
  (state) => state.get('nodeMapBounds')
);

const selectTrackerNodeImages = () => createSelector(
  selectTracker(),
  (state) => state.get('nodeImages').toJS()
);

const selectTrackerDeviceConfig = () => createSelector(
  selectTracker(),
  (state) => state.get('deviceConfig').toJS()
);

const selectTrackerDeviceConfigLoading = () => createSelector(
  selectTracker(),
  (state) => state.get('deviceConfigLoading')
);

const selectTrackerCommProtocolStreams = () => createSelector(
  selectTracker(),
  (state) => state.get('commProtocolStreams').toJS()
);

const selectTrackerCommProtocolDataLoading = () => createSelector(
  selectTracker(),
  (state) => state.get('commProtocolDataLoading')
);

export {
  selectTracker,
  selectTrackerMessageReceptionConnectionActive,
  selectTrackerFollowMessageReception,
  selectTrackerGatewayMessages,
  selectTrackerSelectedGatewayMessage,
  selectTrackerHoveredGatewayMessage,
  selectTrackerCenteredGatewayMessage,
  selectTrackerGatewayMapBounds,
  selectTrackerNodeMessages,
  selectTrackerSelectedNodeMessage,
  selectTrackerHoveredNodeMessage,
  selectTrackerCenteredNodeMessage,
  selectTrackerNodeMapBounds,
  selectTrackerNodeImages,
  selectTrackerDeviceConfig,
  selectTrackerDeviceConfigLoading,
  selectTrackerCommProtocolStreams,
  selectTrackerCommProtocolDataLoading,
};
