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

export class TelemetryHistoryControls extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentMessageIndex: React.PropTypes.number,
    messages: React.PropTypes.array,
    onPrevMessage: React.PropTypes.func,
    onNextMessage: React.PropTypes.func,
    onTest: React.PropTypes.func,
    onCenter: React.PropTypes.func,
    selectedMessage: React.PropTypes.object,
  };

  render() {
    const id = this.props.selectedMessage ? this.props.selectedMessage.id : '';

    const messageCount = this.props.messages ? this.props.messages.length : 0;
    const clampedCurrentMessageIndex = (this.props.currentMessageIndex >= 0) ? this.props.currentMessageIndex : 0;
    const currentMessageIndex = (messageCount > 0) ? (messageCount - clampedCurrentMessageIndex) : 0;

    return (
      <form className="form-inline">
        <div className="input-group">
          <span className="input-group-btn">
            <button type="button" className="btn btn-default" onClick={this.props.onPrevMessage}>&laquo;</button>
          </span>
          <input type="text" className="form-control" id="telemetryMessageId" placeholder="Message ID" value={id} />
          <span className="input-group-btn">
            <button type="button" className="btn btn-default" onClick={this.props.onNextMessage}>&raquo;</button>
          </span>
        </div>
        <div className="input-group">
          <span>({currentMessageIndex} of {messageCount})</span>
        </div>

        <span className="input-group pull-right">
          <button type="button" className="btn btn-primary" onClick={this.props.onCenter}>Center map at selected location</button>
        </span>
        <span className="input-group pull-right">
          <button type="button" className="btn btn-default" onClick={this.props.onTest}>Post test message</button>
        </span>
      </form>
    );
  }
}
