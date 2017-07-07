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

export class TelemetryLocation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    message: React.PropTypes.object,
  };

  render() {
    const gps = (this.props.message && this.props.message.gps) ? this.props.message.gps : {};

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
            <th>GPS</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Location</td>
            <td>{toFixed(gps.latitude_degrees, 6)} N, {toFixed(gps.longitude_degrees, 6)} E</td>
          </tr>
          <tr>
            <td>Location uncertainty</td>
            <td>{toFixed(gps.latitude_uncertainty_meters, 2)} m, {toFixed(gps.longitude_uncertainty_meters, 2)} m</td>
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
            <td>Climb (uncertainty)</td>
            <td>{toFixed(gps.climb_meters_per_sec, 1)} m/s ({toFixed(gps.climb_uncertainty_meters_per_sec, 2)} m/s)</td>
          </tr>
          <tr>
            <td>Track (uncertainty)</td>
            <td>{toFixed(gps.track_degrees, 4)} deg ({toFixed(gps.track_uncertainty_degrees, 4)} deg)</td>
          </tr>
          <tr>
            <td>Fix mode</td>
            <td>{gps.has_fix ? gps.mode : 'No fix'}</td>
          </tr>
          <tr>
            <td>Satellites visible</td>
            <td>{gps.satellites_visible}</td>
          </tr>
          <tr>
            <td>Satellites used</td>
            <td>{gps.satellites_used}</td>
          </tr>
          <tr>
            <td>GPS time (uncertainty)</td>
            <td>{gps.time} ({toFixed(gps.time_uncertainty_seconds * 1000, 2)} ms)</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TelemetryLocation);
