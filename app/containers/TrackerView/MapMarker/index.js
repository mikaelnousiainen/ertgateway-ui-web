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

import { getMapMarkerStyle } from './style';

export default class MapMarker extends React.PureComponent {
  static propTypes = {
    object: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    hovered: React.PropTypes.bool,
    selected: React.PropTypes.bool,
    current: React.PropTypes.bool,
    text: React.PropTypes.string,
    styleName: React.PropTypes.string,
    id: React.PropTypes.string,
  };

  static defaultProps = {};

  render() {
    return (
      <div key={`marker-div-${this.props.id}`} style={getMapMarkerStyle(this.props.hovered, this.props.selected, this.props.current, this.props.styleName)}>
        {this.props.text}
      </div>
    );
  }
}
