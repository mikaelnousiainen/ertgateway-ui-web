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

export class TelemetryGeneral extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    message: React.PropTypes.object,
  };

  render() {
    const message = this.props.message ? this.props.message : {};

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
            <th>General info</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Message ID</td>
            <td>{toFixed(message.id, 0)}</td>
          </tr>
          <tr>
            <td>Timestamp</td>
            <td>{message.timestamp}</td>
          </tr>
          <tr>
            <td>Device name</td>
            <td>{message.device_name}</td>
          </tr>
          <tr>
            <td>Device model</td>
            <td>{message.device_model}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TelemetryGeneral);
