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

import { TrackerImages } from './TrackerImages';
import { TelemetryMap } from './TelemetryMap';
import { TelemetryHistoryControls } from './TelemetryHistoryControls';
import { TelemetryOverview } from './TelemetryOverview';
import { TelemetryGeneral } from './TelemetryGeneral';
import { TelemetryLocation } from './TelemetryLocation';
import { TelemetryFlight } from './TelemetryFlight';
import { TelemetrySensors } from './TelemetrySensors';
import { TelemetryCommDevice } from './TelemetryCommDevice';
import { TelemetryCommProtocol } from './TelemetryCommProtocol';

export class TrackerView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    title: React.PropTypes.string,
    messages: React.PropTypes.array,
    selectedMessage: React.PropTypes.object,
    hoveredMessage: React.PropTypes.object,
    centeredMessage: React.PropTypes.object,
    images: React.PropTypes.array,
    mapBounds: React.PropTypes.object,
    secondaryMessages: React.PropTypes.array,
    selectedSecondaryMessage: React.PropTypes.object,
    onTest: React.PropTypes.func,
    onSelectMessage: React.PropTypes.func,
    onHoverMessage: React.PropTypes.func,
    onCenterMessage: React.PropTypes.func,
    onFetchImages: React.PropTypes.func,
    onMapBoundsChange: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedMessageIndex: -1,
    };
  }

  componentDidMount() {
  }

  getSelectedMessageIndex() {
    if (!this.props.messages || this.props.messages.length < 1 || !this.props.selectedMessage) {
      return -1;
    }

    let index = -1;

    // Check whether the saved index is valid
    if (this.state.selectedMessageIndex >= 0 && this.state.selectedMessageIndex < this.props.messages.length) {
      const selectedMessageForIndex = this.props.messages[this.state.selectedMessageIndex];

      if (selectedMessageForIndex.id === this.props.selectedMessage.id
        && selectedMessageForIndex.timestamp_millis === this.props.selectedMessage.timestamp_millis) {
        index = this.state.selectedMessageIndex;
      }
    }

    if (index < 0) {
      index = this.props.messages.findIndex((message) =>
        (message.id === this.props.selectedMessage.id)
        && (message.timestamp_millis === this.props.selectedMessage.timestamp_millis));
    }

    return index;
  }

  doSelectRelativeMessage = (offset) => {
    if (!this.props.messages || this.props.messages.length < 1) {
      return;
    }

    let index = -1;
    if (this.props.selectedMessage) {
      index = this.getSelectedMessageIndex();

      if (index >= 0) {
        index += offset;
      }
    }

    if (index < 0) {
      index = 0;
    } else if (index >= this.props.messages.length) {
      index = this.props.messages.length - 1;
    }

    this.setState({ selectedMessageIndex: index });

    if (this.props.onSelectMessage) {
      this.props.onSelectMessage(this.props.messages[index]);
    }
  };

  doSelectPrevMessage = () => {
    this.doSelectRelativeMessage(1);
  };

  doSelectNextMessage = () => {
    this.doSelectRelativeMessage(-1);
  };

  doCenterSelectedMessage = () => {
    this.props.onCenterMessage(this.props.selectedMessage);
  };

  doOnFetchImages = (count) => {
    if (this.props.onFetchImages) {
      this.props.onFetchImages(0, count);
    }
  };

  render() {
    const selectedMessageIndex = this.getSelectedMessageIndex();

    const showImages = !!this.props.images;
    const showCommProtocol = !!(this.props.selectedMessage
      && this.props.selectedMessage.comm_devices
      && this.props.selectedMessage.comm_devices[0]
      && this.props.selectedMessage.comm_devices[0].comm_protocol);

    const latestMessage = this.props.messages
      ? this.props.messages[0] : null;
    const latestSecondaryMessage = this.props.secondaryMessages
      ? this.props.secondaryMessages[0] : null;

    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h2>{this.props.title}</h2>
            <hr />
            <TelemetryHistoryControls
              currentMessageIndex={selectedMessageIndex}
              messages={this.props.messages}
              onTest={this.props.onTest}
              onPrevMessage={this.doSelectPrevMessage}
              onNextMessage={this.doSelectNextMessage}
              selectedMessage={this.props.selectedMessage}
              onCenter={this.doCenterSelectedMessage}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <TelemetryMap
              messages={this.props.messages}
              secondaryMessages={this.props.secondaryMessages}
              mapBounds={this.props.mapBounds}
              selectedMessage={this.props.selectedMessage}
              hoveredMessage={this.props.hoveredMessage}
              centeredMessage={this.props.centeredMessage}
              onSelectMessage={this.props.onSelectMessage}
              onHoverMessage={this.props.onHoverMessage}
              onMapBoundsChange={this.props.onMapBoundsChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <TelemetryOverview
              title="Overview (latest)"
              message={latestMessage}
              secondaryMessage={latestSecondaryMessage}
            />
          </div>
          <div className="col-lg-6">
            <TelemetryOverview
              title="Overview (selected)"
              message={this.props.selectedMessage}
              secondaryMessage={this.props.selectedSecondaryMessage}
            />
          </div>
        </div>

        {showImages &&
        <div className="row">
          <div className="col-lg-12">
            <TrackerImages
              onFetchImages={this.doOnFetchImages}
              images={this.props.images}
            />
          </div>
        </div>
        }

        <div className="row">
          <div className="col-lg-6">
            <TelemetryGeneral message={this.props.selectedMessage} />
          </div>
          <div className="col-lg-6">
            <TelemetryLocation message={this.props.selectedMessage} />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <TelemetrySensors message={this.props.selectedMessage} />
          </div>
          <div className="col-lg-6">
            <TelemetryFlight message={this.props.selectedMessage} />
          </div>
        </div>

        <div className="row">
          {showCommProtocol &&
          <div className="col-lg-6">
            <TelemetryCommProtocol message={this.props.selectedMessage} />
          </div>
          }
          <div className="col-lg-6">
            <TelemetryCommDevice message={this.props.selectedMessage} />
          </div>
        </div>
      </div>
    );
  }
}
