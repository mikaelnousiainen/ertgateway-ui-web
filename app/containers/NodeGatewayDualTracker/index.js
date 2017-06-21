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
import { createTestMessage } from './testing';

import {
  postGatewayMessage,
  selectGatewayMessage,
  hoverGatewayMessage,
  centerGatewayMessage,
  changeGatewayMapBounds,
  postNodeMessage,
  selectNodeMessage,
  hoverNodeMessage,
  centerNodeMessage,
  changeNodeMapBounds,
  fetchNodeImages,
} from 'containers/Tracker/actions';

import {
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
} from 'containers/Tracker/selectors';

import TrackerControls from 'containers/TrackerControls';
import { TrackerView } from 'containers/TrackerView';

export class NodeGatewayDualTracker extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    nodeMessages: React.PropTypes.array,
    selectedNodeMessage: React.PropTypes.object,
    hoveredNodeMessage: React.PropTypes.object,
    centeredNodeMessage: React.PropTypes.object,
    nodeImages: React.PropTypes.array,
    nodeMapBounds: React.PropTypes.object,
    onNodeTestMessage: React.PropTypes.func,
    onSelectNodeMessage: React.PropTypes.func,
    onHoverNodeMessage: React.PropTypes.func,
    onCenterNodeMessage: React.PropTypes.func,
    onFetchNodeImages: React.PropTypes.func,
    onNodeMapBoundsChange: React.PropTypes.func,

    gatewayMessages: React.PropTypes.array,
    selectedGatewayMessage: React.PropTypes.object,
    hoveredGatewayMessage: React.PropTypes.object,
    centeredGatewayMessage: React.PropTypes.object,
    gatewayMapBounds: React.PropTypes.object,
    onGatewayTestMessage: React.PropTypes.func,
    onSelectGatewayMessage: React.PropTypes.func,
    onHoverGatewayMessage: React.PropTypes.func,
    onCenterGatewayMessage: React.PropTypes.func,
    onGatewayMapBoundsChange: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      showGatewayTracker: true,
    };
  }

  doOnSetShowGatewayTracker = (show) => {
    this.setState({ showGatewayTracker: show });
  };

  render() {
    const singleTrackerClass = 'col-xs-12 col-sm-12 col-md-12 col-lg-12';
    const dualTrackerClass = 'col-xs-12 col-sm-12 col-md-6 col-lg-6';

    const trackerClass = this.state.showGatewayTracker ?
      dualTrackerClass : singleTrackerClass;

    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <TrackerControls
              showGatewayTracker={this.state.showGatewayTracker}
              onSetShowGatewayTracker={this.doOnSetShowGatewayTracker}
            />
          </div>
        </div>

        <div>
          <div className={trackerClass}>
            <TrackerView
              title="Node"
              messages={this.props.nodeMessages}
              selectedMessage={this.props.selectedNodeMessage}
              hoveredMessage={this.props.hoveredNodeMessage}
              centeredMessage={this.props.centeredNodeMessage}
              mapBounds={this.props.nodeMapBounds}
              images={this.props.nodeImages}
              onSelectMessage={this.props.onSelectNodeMessage}
              onHoverMessage={this.props.onHoverNodeMessage}
              onCenterMessage={this.props.onCenterNodeMessage}
              onMapBoundsChange={this.props.onNodeMapBoundsChange}
              onFetchImages={this.props.onFetchNodeImages}
              onTest={this.props.onNodeTestMessage}
              secondaryMessages={this.props.gatewayMessages}
              selectedSecondaryMessage={this.props.selectedGatewayMessage}
            />
          </div>
          { this.state.showGatewayTracker &&
          <div className={trackerClass}>
            <TrackerView
              title="Gateway"
              messages={this.props.gatewayMessages}
              selectedMessage={this.props.selectedGatewayMessage}
              hoveredMessage={this.props.hoveredGatewayMessage}
              centeredMessage={this.props.centeredGatewayMessage}
              mapBounds={this.props.gatewayMapBounds}
              onSelectMessage={this.props.onSelectGatewayMessage}
              onHoverMessage={this.props.onHoverGatewayMessage}
              onCenterMessage={this.props.onCenterGatewayMessage}
              onMapBoundsChange={this.props.onGatewayMapBoundsChange}
              onTest={this.props.onGatewayTestMessage}
              secondaryMessages={this.props.nodeMessages}
              selectedSecondaryMessage={this.props.selectedNodeMessage}
            />
          </div>
          }
        </div>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSelectGatewayMessage: (message) => dispatch(selectGatewayMessage(message)),
    onHoverGatewayMessage: (message) => dispatch(hoverGatewayMessage(message)),
    onCenterGatewayMessage: (message) => dispatch(centerGatewayMessage(message)),
    onGatewayMapBoundsChange: (bounds) => dispatch(changeGatewayMapBounds(bounds)),
    onGatewayTestMessage: () => dispatch(postGatewayMessage(createTestMessage())),
    onSelectNodeMessage: (message) => dispatch(selectNodeMessage(message)),
    onHoverNodeMessage: (message) => dispatch(hoverNodeMessage(message)),
    onCenterNodeMessage: (message) => dispatch(centerNodeMessage(message)),
    onNodeMapBoundsChange: (bounds) => dispatch(changeNodeMapBounds(bounds)),
    onNodeTestMessage: () => dispatch(postNodeMessage(createTestMessage())),
    onFetchNodeImages: (offset, count) => dispatch(fetchNodeImages(offset, count)),
  };
}

const mapStateToProps = createStructuredSelector({
  gatewayMessages: selectTrackerGatewayMessages(),
  selectedGatewayMessage: selectTrackerSelectedGatewayMessage(),
  hoveredGatewayMessage: selectTrackerHoveredGatewayMessage(),
  centeredGatewayMessage: selectTrackerCenteredGatewayMessage(),
  gatewayMapBounds: selectTrackerGatewayMapBounds(),
  nodeMessages: selectTrackerNodeMessages(),
  selectedNodeMessage: selectTrackerSelectedNodeMessage(),
  hoveredNodeMessage: selectTrackerHoveredNodeMessage(),
  centeredNodeMessage: selectTrackerCenteredNodeMessage(),
  nodeMapBounds: selectTrackerNodeMapBounds(),
  nodeImages: selectTrackerNodeImages(),
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeGatewayDualTracker);
