/*
 * Embedded Radio Tracker
 *
 * Copyright (C) 2017 Mikael Nousiainen
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  setFollowMessageReception,
  startMessageReception,
  stopMessageReception,
  clearMessageHistory,
  fetchMessageHistory,
  fetchDeviceConfig,
  updateDeviceConfig,
  fetchCommProtocolStreams,
} from 'containers/Tracker/actions';

import {
  selectTrackerMessageReceptionConnectionActive,
  selectTrackerFollowMessageReception,
  selectTrackerDeviceConfig,
  selectTrackerDeviceConfigLoading,
  selectTrackerCommProtocolStreams,
  selectTrackerCommProtocolDataLoading,
} from 'containers/Tracker/selectors';

import { TrackerControlsWidget } from './TrackerControlsWidget';

export class TrackerControls extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    trackingActive: React.PropTypes.bool,
    onStartTracking: React.PropTypes.func,
    onStopTracking: React.PropTypes.func,
    onClearMessageHistory: React.PropTypes.func,
    onFetchMessageHistory: React.PropTypes.func,
    onSetFollowMessageReception: React.PropTypes.func,
    onSetShowGatewayTracker: React.PropTypes.func,
    onFetchDeviceConfig: React.PropTypes.func,
    onUpdateDeviceConfig: React.PropTypes.func,
    onFetchCommProtocolStreams: React.PropTypes.func,
    followMessageReception: React.PropTypes.bool,
    showGatewayTracker: React.PropTypes.bool,
    deviceConfig: React.PropTypes.object,
    deviceConfigLoading: React.PropTypes.bool,
    commProtocolStreams: React.PropTypes.object,
    commProtocolDataLoading: React.PropTypes.bool,
  };

  componentDidMount() {
  }

  doOnFetchMessageHistory = (count) => {
    if (this.props.onFetchMessageHistory) {
      this.props.onFetchMessageHistory(0, count);
    }
  };

  render() {
    return (
      <TrackerControlsWidget
        trackingActive={this.props.trackingActive}
        onStartTracking={this.props.onStartTracking}
        onStopTracking={this.props.onStopTracking}
        onClearMessageHistory={this.props.onClearMessageHistory}
        onFetchMessageHistory={this.doOnFetchMessageHistory}
        onSetFollowMessageReception={this.props.onSetFollowMessageReception}
        onFetchDeviceConfig={this.props.onFetchDeviceConfig}
        onUpdateDeviceConfig={this.props.onUpdateDeviceConfig}
        onFetchCommProtocolStreams={this.props.onFetchCommProtocolStreams}
        followMessageReception={this.props.followMessageReception}
        onSetShowGatewayTracker={this.props.onSetShowGatewayTracker}
        showGatewayTracker={this.props.showGatewayTracker}
        deviceConfig={this.props.deviceConfig}
        deviceConfigLoading={this.props.deviceConfigLoading}
        commProtocolStreams={this.props.commProtocolStreams}
        commProtocolDataLoading={this.props.commProtocolDataLoading}
      />
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSetFollowMessageReception: (enable) => dispatch(setFollowMessageReception(enable)),
    onStartTracking: () => dispatch(startMessageReception()),
    onStopTracking: () => dispatch(stopMessageReception()),
    onClearMessageHistory: () => dispatch(clearMessageHistory()),
    onFetchMessageHistory: (offset, count) => dispatch(fetchMessageHistory(offset, count)),
    onFetchDeviceConfig: () => dispatch(fetchDeviceConfig()),
    onUpdateDeviceConfig: (config) => dispatch(updateDeviceConfig(config)),
    onFetchCommProtocolStreams: () => dispatch(fetchCommProtocolStreams()),
  };
}

const mapStateToProps = createStructuredSelector({
  trackingActive: selectTrackerMessageReceptionConnectionActive(),
  followMessageReception: selectTrackerFollowMessageReception(),
  deviceConfig: selectTrackerDeviceConfig(),
  deviceConfigLoading: selectTrackerDeviceConfigLoading(),
  commProtocolStreams: selectTrackerCommProtocolStreams(),
  commProtocolDataLoading: selectTrackerCommProtocolDataLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackerControls);
