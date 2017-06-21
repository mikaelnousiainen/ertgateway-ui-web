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
import numeral from 'numeral';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

export class TelemetryCommDevice extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    message: React.PropTypes.object,
  };

  render() {
    const data = (this.props.message && this.props.message.comm_devices
        && this.props.message.comm_devices[0]) ? this.props.message.comm_devices[0] : {};

    const toFixed = (value, digits) => {
      if (typeof value === 'undefined' || value === null) {
        return '-';
      }

      return value.toFixed(digits);
    };

    let formattedFrequency = '-';

    if (typeof data.frequency === 'number') {
      formattedFrequency = `${numeral(data.frequency).format('000.000 a')}Hz`;
    }

    let formattedFrequencyError = '-';

    if (typeof data.frequency_error === 'number') {
      formattedFrequencyError = `${numeral(data.frequency_error).format('000.000 a')}Hz`;
    }

    return (
      <table className="table table-hover table-condensed">
        <thead>
          <tr>
            <th>Comm device</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{data.name}</td>
          </tr>
          <tr>
            <td>Model</td>
            <td>{data.model}</td>
          </tr>
          <tr>
            <td>Manufacturer</td>
            <td>{data.manufacturer}</td>
          </tr>
          <tr>
            <td>Current RSSI</td>
            <td>{toFixed(data.current_rssi, 1)} dBm</td>
          </tr>
          <tr>
            <td>Last packet RSSI</td>
            <td>{toFixed(data.last_received_packet_rssi, 1)} dBm</td>
          </tr>
          <tr>
            <td>Transmitted packets</td>
            <td>{toFixed(data.transmitted_packet_count, 0)}</td>
          </tr>
          <tr>
            <td>Transmitted bytes</td>
            <td>{toFixed(data.transmitted_bytes, 0)}</td>
          </tr>
          <tr>
            <td>Last TX packet timestamp</td>
            <td>{data.last_transmitted_packet_timestamp}</td>
          </tr>
          <tr>
            <td>Received packets</td>
            <td>{toFixed(data.received_packet_count, 0)}</td>
          </tr>
          <tr>
            <td>Received bytes</td>
            <td>{toFixed(data.received_bytes, 0)}</td>
          </tr>
          <tr>
            <td>Last RX packet timestamp</td>
            <td>{data.last_received_packet_timestamp}</td>
          </tr>
          <tr>
            <td>Invalid received packets</td>
            <td>{toFixed(data.invalid_received_packet_count, 0)}</td>
          </tr>
          <tr>
            <td>Last invalid RX packet timestamp</td>
            <td>{data.last_invalid_received_packet_timestamp}</td>
          </tr>
          <tr>
            <td>Frequency</td>
            <td>{formattedFrequency}</td>
          </tr>
          <tr>
            <td>Frequency error</td>
            <td>{formattedFrequencyError}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = createSelector(
  (message) => (message)
);

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TelemetryCommDevice);
