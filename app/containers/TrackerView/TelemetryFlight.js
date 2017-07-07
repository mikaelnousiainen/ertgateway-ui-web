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

export class TelemetryFlight extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    message: React.PropTypes.object,
  };

  render() {
    const flight = (this.props.message && this.props.message.flight) ? this.props.message.flight : {};

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
            <th>Flight data</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flight state</td>
            <td>{flight.flight_state}</td>
          </tr>
          <tr>
            <td>Maximum altitude</td>
            <td>{toFixed(flight.maximum_altitude_meters, 2)} m</td>
          </tr>
          <tr>
            <td>Minimum altitude</td>
            <td>{toFixed(flight.minimum_altitude_meters, 2)} m</td>
          </tr>
          <tr>
            <td>Climb rate (filtered)</td>
            <td>{toFixed(flight.climb_rate_meters_per_sec, 1)} m/s</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TelemetryFlight);
