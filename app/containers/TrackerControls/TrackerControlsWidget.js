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
import ReactModal from 'react-modal';

import { trackerDeviceConfigTemplates } from 'data/tracker-device-config';

const DEFAULT_COUNT = 100;

const MODAL_STYLES = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: '1000',
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    zIndex: '2000',
  },
};

export class TrackerControlsWidget extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    trackingActive: React.PropTypes.bool,
    onStartTracking: React.PropTypes.func,
    onStopTracking: React.PropTypes.func,
    onFetchMessageHistory: React.PropTypes.func,
    onClearMessageHistory: React.PropTypes.func,
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

  constructor(props) {
    super(props);

    this.state = {
      count: DEFAULT_COUNT,
      follow: props.followMessageReception,
      showGatewayTracker: props.showGatewayTracker,
      showDeviceConfig: false,
      showCommProtocolData: false,
    };
  }

  doOnFetchMessageHistory = () => {
    if (this.props.onFetchMessageHistory) {
      let count = DEFAULT_COUNT;

      try {
        count = parseInt(this.state.count, 10);
      } catch (e) {
        // ignore
      }
      if (isNaN(count)) {
        count = DEFAULT_COUNT;
      }

      this.props.onFetchMessageHistory(count);
    }
  };

  doOnClearMessageHistory = () => {
    if (this.props.onClearMessageHistory) {
      this.props.onClearMessageHistory();
    }
  };

  doOnSetFollowMessageReception = (event) => {
    this.setState({ follow: event.target.checked });
    if (this.props.onSetFollowMessageReception) {
      this.props.onSetFollowMessageReception(event.target.checked);
    }
  };

  doOnSetShowGatewayTracker = (event) => {
    this.setState({ showGatewayTracker: event.target.checked });
    if (this.props.onSetShowGatewayTracker) {
      this.props.onSetShowGatewayTracker(event.target.checked);
    }
  };

  doOnCountChanged = (event) => {
    this.setState({ count: event.target.value });
  };

  doOnFetchDeviceConfig = () => {
    this.setState({ showDeviceConfig: true });
    if (this.props.onFetchDeviceConfig) {
      this.props.onFetchDeviceConfig();
    }
  };

  doOnUpdateDeviceConfig = (config) => {
    this.setState({ showDeviceConfig: true });
    if (this.props.onUpdateDeviceConfig) {
      this.props.onUpdateDeviceConfig(config);
    }
  };

  hideConfiguration = () => {
    this.setState({ showDeviceConfig: false });
  };

  doOnFetchCommProtocolStreams = () => {
    this.setState({ showCommProtocolData: true });
    if (this.props.onFetchCommProtocolStreams) {
      this.props.onFetchCommProtocolStreams();
    }
  };

  hideCommProtocolData = () => {
    this.setState({ showCommProtocolData: false });
  };

  render() {
    const configTemplateChoices = [];

    Object.keys(trackerDeviceConfigTemplates).forEach((key) => {
      const tmpl = trackerDeviceConfigTemplates[key];

      configTemplateChoices.push(
        <div key={key}>
          <button type="button" className="btn btn-link" onClick={() => this.doOnUpdateDeviceConfig(tmpl.config)}>{key}: {tmpl.description} {tmpl.name}</button>
        </div>
      );
    });

    return (
      <div style={{ margin: '15px 0px' }}>
        <form className="form-inline">
          <div className="input-group">
            {this.props.trackingActive ?
              (<button type="button" className="btn btn-danger" onClick={this.props.onStopTracking}>Stop tracking</button>) :
              (<button type="button" className="btn btn-success" onClick={this.props.onStartTracking}>Start tracking</button>)
            }
          </div>

          <div className="input-group">
            <span className="input-group-btn">
              <button type="button" className="btn btn-default" onClick={this.doOnFetchMessageHistory}>Fetch tracking history</button>
            </span>
            <input
              type="text"
              className="form-input-text-small form-control"
              placeholder="Count"
              value={this.state.count}
              onChange={this.doOnCountChanged}
            />
          </div>

          <div className="input-group">
            <span className="input-group">
              <button type="button" className="btn btn-default" onClick={this.doOnClearMessageHistory}>Clear tracking history</button>
            </span>
          </div>

          <div className="input-group">
            <span className="input-group">
              <button type="button" className="btn btn-default" onClick={this.doOnFetchDeviceConfig}>Configure</button>
            </span>
            <span className="input-group">
              <button type="button" className="btn btn-default" onClick={this.doOnFetchCommProtocolStreams}>Show comm protocol state</button>
            </span>
          </div>

          <div className="input-group">
            <input type="checkbox" onChange={this.doOnSetFollowMessageReception} checked={this.state.follow} /> Follow latest telemetry message
          </div>
          <div className="input-group">
            <input type="checkbox" onChange={this.doOnSetShowGatewayTracker} checked={this.state.showGatewayTracker} /> Show gateway tracker
          </div>
        </form>

        <ReactModal
          isOpen={this.state.showDeviceConfig}
          closeTimeoutMS={0}
          contentLabel="Tracker device configuration"
          ariaHideApp
          shouldCloseOnOverlayClick
          role="dialog"
          parentSelector={() => document.body}
          style={MODAL_STYLES}
        >
          <div className="row">
            <button type="button" className="btn btn-primary pull-right" onClick={this.hideConfiguration}>Close</button>
          </div>

          <h2>Select new configuration</h2>

          <div className="row">
            {configTemplateChoices}
          </div>

          <h2>Current configuration</h2>

          <div>
            <code>
              {!this.props.deviceConfigLoading &&
                <pre>{JSON.stringify(this.props.deviceConfig, null, 2)}</pre>
              }
              {this.props.deviceConfigLoading &&
                <pre>Loading...</pre>
              }
            </code>
          </div>
        </ReactModal>

        <ReactModal
          isOpen={this.state.showCommProtocolData}
          closeTimeoutMS={0}
          contentLabel="Comm protocol state"
          ariaHideApp
          shouldCloseOnOverlayClick
          role="dialog"
          parentSelector={() => document.body}
          style={MODAL_STYLES}
        >
          <div className="row">
            <button type="button" className="btn btn-primary pull-right" onClick={this.hideCommProtocolData}>Close</button>
            <button type="button" className="btn btn-default pull-right" onClick={this.doOnFetchCommProtocolStreams}>Refresh</button>
          </div>

          <h2>Comm protocol state</h2>

          <div>
            <code>
              {!this.props.commProtocolDataLoading &&
              <pre>{JSON.stringify(this.props.commProtocolStreams, null, 2)}</pre>
              }
              {this.props.commProtocolDataLoading &&
              <pre>Loading...</pre>
              }
            </code>
          </div>
        </ReactModal>
      </div>
    );
  }
}
