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
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import NotificationSystem from 'react-notification-system';

import {
  selectNotifications,
} from 'containers/App/selectors';

import {
  clearNotifications,
} from 'containers/App/actions';

import NodeGatewayDualTracker from 'containers/NodeGatewayDualTracker';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    notifications: React.PropTypes.array,
    onClearNotifications: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.notificationSystem = null;
  }

  componentWillMount() {
    this.showNotifications();
  }

  componentWillUpdate() {
    this.showNotifications();
  }

  showNotifications() {
    this.props.notifications.forEach((notification) => {
      this.showNotification(notification);
    });

    this.props.onClearNotifications();
  }

  showNotification = (notification) => {
    if (!this.notificationSystem) {
      console.log(notification);
      return;
    }

    this.notificationSystem.addNotification({
      level: notification.type,
      title: notification.message,
      message: notification.description,
    });
  };

  render() {
    return (
      <article>
        <Helmet title="ERTgateway" />
        <div>
          <NotificationSystem ref={(ns) => { this.notificationSystem = ns; }} />
          <NodeGatewayDualTracker />
        </div>
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onClearNotifications: () => dispatch(clearNotifications()),
  };
}

const mapStateToProps = createStructuredSelector({
  notifications: selectNotifications(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
