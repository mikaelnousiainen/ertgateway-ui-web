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
import { createSelector } from 'reselect';

export class TelemetryCommProtocol extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    message: React.PropTypes.object,
  };

  render() {
    const data = (this.props.message
        && this.props.message.comm_devices
        && this.props.message.comm_devices[0]
        && this.props.message.comm_devices[0].comm_protocol) ? this.props.message.comm_devices[0].comm_protocol : {};

    const toFixed = (value, digits) => {
      if (typeof value === 'undefined' || value === null) {
        return '-';
      }

      return value.toFixed(digits);
    };

    return (
      <table className="table table-hover table-condensed">
        <thead>
          <tr>
            <th>Comm protocol</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Transmitted packet count</td>
            <td>{toFixed(data.transmitted_packet_count, 0)}</td>
          </tr>
          <tr>
            <td>Transmitted packet data</td>
            <td>{toFixed(data.transmitted_data_bytes, 0)} bytes</td>
          </tr>
          <tr>
            <td>Transmitted packet payload data</td>
            <td>{toFixed(data.transmitted_payload_data_bytes, 0)} bytes</td>
          </tr>
          <tr>
            <td>Last TX packet timestamp</td>
            <td>{data.last_transmitted_packet_timestamp}</td>
          </tr>
          <tr>
            <td>Duplicate transmitted packet count</td>
            <td>{toFixed(data.duplicate_transmitted_packet_count, 0)}</td>
          </tr>
          <tr>
            <td>Retransmitted packet count</td>
            <td>{toFixed(data.retransmitted_packet_count, 0)}</td>
          </tr>
          <tr>
            <td>Retransmitted packet data</td>
            <td>{toFixed(data.retransmitted_data_bytes, 0)} bytes</td>
          </tr>
          <tr>
            <td>Retransmitted packet payload data</td>
            <td>{toFixed(data.retransmitted_payload_data_bytes, 0)} bytes</td>
          </tr>
          <tr>
            <td>Last re-TX packet timestamp</td>
            <td>{data.last_retransmitted_packet_timestamp}</td>
          </tr>
          <tr>
            <td>Received packet count</td>
            <td>{toFixed(data.received_packet_count, 0)}</td>
          </tr>
          <tr>
            <td>Received packet data</td>
            <td>{toFixed(data.received_data_bytes, 0)} bytes</td>
          </tr>
          <tr>
            <td>Received packet payload data</td>
            <td>{toFixed(data.received_payload_data_bytes, 0)} bytes</td>
          </tr>
          <tr>
            <td>Last RX packet timestamp</td>
            <td>{data.last_received_packet_timestamp}</td>
          </tr>
          <tr>
            <td>Duplicate received packet count</td>
            <td>{toFixed(data.duplicate_received_packet_count, 0)}</td>
          </tr>
          <tr>
            <td>Received packet sequence number error count</td>
            <td>{toFixed(data.received_packet_sequence_number_error_count, 0)}</td>
          </tr>
          <tr>
            <td>Invalid received packet count</td>
            <td>{toFixed(data.invalid_received_packet_count, 0)}</td>
          </tr>
          <tr>
            <td>Last invalid RX packet timestamp</td>
            <td>{data.last_invalid_received_packet_timestamp}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TelemetryCommProtocol);
