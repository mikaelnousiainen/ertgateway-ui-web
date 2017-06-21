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

import { LatLonEllipsoidal as GeodesyLatLon } from 'geodesy';

function mapCoordinatesToSphericalDistance(p1, p2) {
  const datum = GeodesyLatLon.datum.WGS84;
  const latlon1 = new GeodesyLatLon(p1.latitude, p1.longitude, datum);
  const latlon2 = new GeodesyLatLon(p2.latitude, p2.longitude, datum);

  return latlon1.distanceTo(latlon2);
}

function messageToLatLonObject(message) {
  return {
    latitude: message.gps.latitude_degrees,
    longitude: message.gps.longitude_degrees,
  };
}

function messageHasValidLocation(message) {
  if (!message) {
    return false;
  }

  if (!message.gps) {
    return false;
  }

  return (typeof message.gps.latitude_degrees === 'number' && typeof message.gps.longitude_degrees === 'number');
}

export class TelemetryOverview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    title: React.PropTypes.string,
    message: React.PropTypes.object,
    secondaryMessage: React.PropTypes.object,
  };

  render() {
    const message = this.props.message ? this.props.message : {};
    const gps = (this.props.message && this.props.message.gps) ? this.props.message.gps : {};
    const commDevice = (this.props.message && this.props.message.comm_devices
      && this.props.message.comm_devices[0]) ? this.props.message.comm_devices[0] : {};

    const toFixed = (value, digits) => {
      if (typeof value === 'undefined' || value === null) {
        return '-';
      }

      return value.toFixed(digits);
    };

    let formattedDistance = '-';

    if (messageHasValidLocation(this.props.message) && messageHasValidLocation(this.props.secondaryMessage)) {
      const distance = mapCoordinatesToSphericalDistance(
        messageToLatLonObject(this.props.message),
        messageToLatLonObject(this.props.secondaryMessage)
      );

      formattedDistance = `${numeral(distance).format('0.00 a')}m`;
    }

    return (
      <table className="table table-hover table-condensed">
        <thead>
          <tr>
            <th>{this.props.title}</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Device name</td>
            <td>{message.device_name}</td>
          </tr>
          <tr>
            <td>Timestamp</td>
            <td>{message.timestamp}</td>
          </tr>
          <tr>
            <td>Message ID</td>
            <td>{toFixed(message.id, 0)}</td>
          </tr>
          <tr>
            <td>Distance</td>
            <td>{formattedDistance}</td>
          </tr>
          <tr>
            <td>Altitude (uncertainty)</td>
            <td>{toFixed(gps.altitude_meters, 2)} m ({toFixed(gps.altitude_uncertainty_meters, 2)} m)</td>
          </tr>
          <tr>
            <td>Speed (uncertainty)</td>
            <td>{toFixed(gps.speed_meters_per_sec, 1)} m/s ({toFixed(gps.speed_uncertainty_meters_per_sec, 2)} m/s)</td>
          </tr>
          <tr>
            <td>Current RSSI</td>
            <td>{toFixed(commDevice.current_rssi, 1)} dBm</td>
          </tr>
          <tr>
            <td>Last packet RSSI</td>
            <td>{toFixed(commDevice.last_received_packet_rssi, 1)} dBm</td>
          </tr>
          <tr>
            <td>Last TX packet timestamp</td>
            <td>{commDevice.last_transmitted_packet_timestamp}</td>
          </tr>
          <tr>
            <td>Last RX packet timestamp</td>
            <td>{commDevice.last_received_packet_timestamp}</td>
          </tr>
          <tr>
            <td>Last invalid RX packet timestamp</td>
            <td>{commDevice.last_invalid_received_packet_timestamp}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TelemetryOverview);
