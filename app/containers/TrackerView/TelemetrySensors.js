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

export class TelemetrySensors extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    message: React.PropTypes.object,
  };

  render() {
    const sensorValues = [];

    if (this.props.message && this.props.message.sensor_modules && this.props.message.sensor_modules.length > 0) {
      const modules = this.props.message.sensor_modules;
      modules.forEach((module) => {
        if (!module.sensors) {
          return;
        }

        module.sensors.forEach((sensor) => {
          if (!sensor.values) {
            return;
          }

          sensor.values.forEach((value) => {
            const sensorValue = value;
            sensorValue.sensor_id = sensor.id;
            sensorValues.push(sensorValue);
          });
        });
      });
    }

    const toFixed = (value, digits, defaultValue) => {
      if (typeof value === 'undefined' || value === null) {
        return defaultValue !== undefined ? defaultValue : '-';
      }

      return value.toFixed(digits);
    };

    const sensorRows = sensorValues.map((sensorValue) =>
      <tr key={`${sensorValue.sensor_id}-${sensorValue.type}`}>
        <td>{sensorValue.label}</td>
        <td>{toFixed(sensorValue.value, 2, '')} {toFixed(sensorValue.x, 2, '')} {toFixed(sensorValue.y, 2, '')} {toFixed(sensorValue.z, 2, '')}</td>
        <td>{sensorValue.unit}</td>
      </tr>
    );

    return (
      <table className="table table-hover table-condensed">
        <thead>
          <tr>
            <th>Sensor</th>
            <th>Value</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {sensorRows}
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

export default connect(mapStateToProps, mapDispatchToProps)(TelemetrySensors);
