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
import moment from 'moment';
import {} from 'moment-duration-format';
import numeral from 'numeral';
import GoogleMap from 'google-map-react';

import MapMarker from './MapMarker';
import { SvgComponent } from './SvgComponent';

const K_MARGIN_TOP = 30;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_BOTTOM = 30;
const K_MARGIN_LEFT = 30;

const K_HOVER_DISTANCE = 30;

const TILE_SIZE = 256;

const DEFAULT_ZOOM = 14;

const DEFAULT_MAP_CENTER = [60.1699, 24.9384];

const PATH_STYLES = {
  primary: {
    color: '#ffffff',
    borderColor: '#000000',
  },
  secondary: {
    color: '#777777',
    borderColor: '#dddddd',
  },
};

const DIRECT_PATH_COLOR = '#f08080';

function convertMapCoordinatesToWorld({ latitude, longitude }) {
  const sin = Math.sin((latitude * Math.PI) / 180);
  const x = ((longitude / 360) + 0.5);
  let y = (0.5 - ((0.25 * Math.log((1 + sin) / (1 - sin))) / Math.PI));

  y = y < -1 // eslint-disable-line
    ? -1
    : y > 1
    ? 1
    : y;
  return { x, y };
}

function convertWorldCoordinatesToScreen({ x, y }, zoom) {
  const scale = 2 ** zoom;
  return {
    x: x * scale * TILE_SIZE,
    y: y * scale * TILE_SIZE,
  };
}

function convertScreenCoordinatesToView(point, corner, zoom) {
  const ptScreen = convertWorldCoordinatesToScreen(convertMapCoordinatesToWorld(point), zoom);
  const ptCorner = convertWorldCoordinatesToScreen(convertMapCoordinatesToWorld(corner), zoom);

  return {
    x: ptScreen.x - ptCorner.x,
    y: ptScreen.y - ptCorner.y,
  };
}

function getMessageId(message) {
  return `${message.id}-${message.timestamp_millis}`;
}

function messageEquals(m1, m2) {
  if (!m1 || !m2) {
    return false;
  }

  return (m1.id === m2.id && m1.type === m2.type && m1.timestamp_millis === m2.timestamp_millis);
}

function filterUniqueMessages(messages) {
  if (!messages) {
    return [];
  }

  const map = new Map();
  const uniqueMessages = [];

  messages.forEach((message) => {
    const key = getMessageId(message);

    if (map.has(key)) {
      return;
    }

    map.set(key, true);
    uniqueMessages.push(message);
  });

  return uniqueMessages;
}

function filterUniqueLocationMessagesFrom(messages) {
  if (!messages) {
    return [];
  }

  const locationMessages = messages
    .slice()
    .filter((message) => message.gps && message.gps.has_fix &&
      (typeof message.gps.latitude_degrees === 'number') && (typeof message.gps.longitude_degrees === 'number'));

  return filterUniqueMessages(locationMessages);
}

export class TelemetryMap extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    messages: React.PropTypes.array,
    secondaryMessages: React.PropTypes.array,
    selectedMessage: React.PropTypes.object,
    hoveredMessage: React.PropTypes.object,
    centeredMessage: React.PropTypes.object,
    mapBounds: React.PropTypes.object,
    onSelectMessage: React.PropTypes.func,
    onHoverMessage: React.PropTypes.func,
    onMapBoundsChange: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      map: null,
      maps: null,
      totalRouteDistance: null,
      totalRouteDuration: null,
    };
  }

  onGoogleApiLoaded = (data) => {
    this.setState({ map: data.map, maps: data.maps });
  };

  getViewCoordinatesForMapCoordinates = (location) => {
    const corner = {};
    let zoom = 1;
    if (this.props.mapBounds) {
      corner.latitude = this.props.mapBounds.latitude;
      corner.longitude = this.props.mapBounds.longitude;
      zoom = this.props.mapBounds.zoom;
    } else {
      corner.latitude = location.latitude;
      corner.longitude = location.longitude;
    }

    return convertScreenCoordinatesToView(location, corner, zoom);
  };

  createMarkersFromMessages = (messages, styleName) =>
    messages
      .slice()
      .reverse()
      .map((message, index, allMessages) =>
        <MapMarker
          id={`${getMessageId(message)}`}
          key={`marker-${getMessageId(message)}`}
          lat={message.gps.latitude_degrees}
          lng={message.gps.longitude_degrees}
          styleName={styleName}
          hovered={messageEquals(this.props.hoveredMessage, message)}
          selected={messageEquals(this.props.selectedMessage, message)}
          current={index === allMessages.length - 1}
          object={message}
        />
      );

  createSvgPathString = (location1, location2) => {
    const viewCoordinates1 = this.getViewCoordinatesForMapCoordinates(location1);
    const viewCoordinates2 = this.getViewCoordinatesForMapCoordinates(location2);
    return `M${viewCoordinates1.x} ${viewCoordinates1.y} ${viewCoordinates2.x} ${viewCoordinates2.y}`;
  };

  createSvgPathElement = (location1, location2, id, color, width) => (
    <path
      id={`${id}`}
      d={this.createSvgPathString(location1, location2)}
      stroke={`${color}`}
      strokeWidth={`${width}`}
      transform="rotate(0 0 0)"
      strokeLinecap="square"
      strokeLinejoin="round"
      fill="none"
    >
    </path>
  );

  createStyledSvgPathElements = (location1, location2, id, styleName) => {
    const style = PATH_STYLES[styleName];

    return [
      this.createSvgPathElement(location1, location2, `path-${id}-1`, style.borderColor, 7),
      this.createSvgPathElement(location1, location2, `path-${id}-2`, style.color, 4),
    ];
  };

  createStyledSvgPathElementsFromMessages = (message1, message2, styleName) => {
    const location1 = {
      latitude: message1.gps.latitude_degrees,
      longitude: message1.gps.longitude_degrees,
    };
    const location2 = {
      latitude: message2.gps.latitude_degrees,
      longitude: message2.gps.longitude_degrees,
    };

    return this.createStyledSvgPathElements(location1, location2, `${getMessageId(message1)}`, styleName);
  };

  drawGoogleMapsDirectPath = (message1, message2) => {
    if (this.directPathPolyline) {
      this.directPathPolyline.setMap(null);
      this.directPathPolyline = null;
    }

    if (!this.state.map || !this.state.maps || !message1 || !message2) {
      return;
    }

    const map = this.state.map;
    const maps = this.state.maps;

    const createLatLngForMessage = (message) =>
      new maps.LatLng(message.gps.latitude_degrees, message.gps.longitude_degrees);

    const point1 = createLatLngForMessage(message1);
    const point2 = createLatLngForMessage(message2);

    const path = [point2, point1];

    this.directPathPolyline = new maps.Polyline({
      map,
      path,
      geodesic: true,
      strokeColor: DIRECT_PATH_COLOR,
      strokeOpacity: 0.75,
      strokeWeight: 6,
    });
  };

  clearGoogleMapsRoute = () => {
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(null);
      this.directionsRenderer = null;
    }

    this.setState({
      totalRouteDistance: null,
      totalRouteDuration: null,
    });
  };

  drawGoogleMapsRoute = (message1, message2) => {
    this.clearGoogleMapsRoute();

    if (!this.state.map || !this.state.maps || !message1 || !message2) {
      return;
    }

    const map = this.state.map;
    const maps = this.state.maps;

    const directionsService = new maps.DirectionsService();

    this.directionsRenderer = new maps.DirectionsRenderer({
      map,
    });

    const createLatLngForMessage = (message) =>
      new maps.LatLng(message.gps.latitude_degrees, message.gps.longitude_degrees);

    const point1 = createLatLngForMessage(message1);
    const point2 = createLatLngForMessage(message2);

    const directionsServiceOptions = {
      origin: point2,
      destination: point1,
      travelMode: maps.TravelMode.DRIVING,
    };

    const calculateRouteDistanceAndDuration = (response) => {
      const legs = response.routes[0].legs;

      let totalDistance = 0;
      let totalDuration = 0;

      legs.forEach((leg) => {
        totalDistance += leg.distance.value;
        totalDuration += leg.duration.value;
      });

      this.setState({
        totalRouteDistance: totalDistance,
        totalRouteDuration: totalDuration,
      });
    };

    const directionsServiceCallback = (response, status) => {
      if (status === maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(response);
        calculateRouteDistanceAndDuration(response);
      } else {
        console.log(status);
      }
    };

    directionsService.route(directionsServiceOptions, directionsServiceCallback);
  };

  doOnChildMouseEnter = (key, childProps) => {
    const message = childProps.object;
    if (this.props.onHoverMessage) {
      this.props.onHoverMessage(message);
    }
  };

  doOnChildMouseLeave = (key, childProps) => { // eslint-disable-line
    if (this.props.onHoverMessage) {
      this.props.onHoverMessage(null);
    }
  };

  doOnChildClick = (key, childProps) => {
    const message = childProps.object;
    if (this.props.onSelectMessage) {
      this.props.onSelectMessage(message);
    }
  };

  doOnBoundsChange = ({ center, zoom, bounds, ...other }) => { // eslint-disable-line
    const b = {
      latitude: bounds.nw.lat,
      longitude: bounds.nw.lng,
      zoom,
    };

    if (this.props.onMapBoundsChange) {
      this.props.onMapBoundsChange(b);
    }
  };

  render() {
    const defaultZoom = DEFAULT_ZOOM;

    let center;

    if (this.props.centeredMessage && this.props.centeredMessage.gps) {
      const message = this.props.centeredMessage;
      center = [message.gps.latitude_degrees, message.gps.longitude_degrees];
    } else {
      center = DEFAULT_MAP_CENTER;
    }

    const locationMessages = filterUniqueLocationMessagesFrom(this.props.messages);
    const markers = this.createMarkersFromMessages(locationMessages, 'primary');
    const routeLines = locationMessages
      .filter((message, index, messages) => index < messages.length - 1)
      .map((message, index) => this.createStyledSvgPathElementsFromMessages(message, locationMessages[index + 1], 'primary'));

    const secondaryLocationMessages = filterUniqueLocationMessagesFrom(this.props.secondaryMessages);
    const secondaryMarkers = this.createMarkersFromMessages(secondaryLocationMessages, 'secondary');
    const secondaryRouteLines = secondaryLocationMessages
      .filter((message, index, messages) => index < messages.length - 1)
      .map((message, index) => this.createStyledSvgPathElementsFromMessages(message, secondaryLocationMessages[index + 1], 'secondary'));

    const latestMessage = locationMessages[0];
    const latestSecondaryMessage = secondaryLocationMessages[0];

    this.drawGoogleMapsDirectPath(latestMessage, latestSecondaryMessage);

    const doDrawGoogleMapsRoute = () => {
      this.drawGoogleMapsRoute(latestMessage, latestSecondaryMessage);
    };

    return (
      <div>
        <div>
          <form className="form-inline">
            <span className="input-group">
              <button type="button" className="btn btn-default" onClick={doDrawGoogleMapsRoute}>Show directions</button>
            </span>
            <span className="input-group">
              <button type="button" className="btn btn-default" onClick={this.clearGoogleMapsRoute}>Clear directions</button>
            </span>
            {this.state.totalRouteDistance !== null &&
            <span className="input-group">
              Route length: {numeral(this.state.totalRouteDistance).format('0.00 a')}m
              ({moment.duration(this.state.totalRouteDuration, 'seconds').format('h [h] m [min]')})
            </span>
            }
          </form>
        </div>

        <div style={{ width: '100%', height: '500px', margin: '15px 0px' }}>
          <GoogleMap
            // apiKey={YOUR_GOOGLE_MAP_API_KEY}
            center={center}
            zoom={defaultZoom}
            margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
            hoverDistance={K_HOVER_DISTANCE}
            onChildMouseEnter={this.doOnChildMouseEnter}
            onChildMouseLeave={this.doOnChildMouseLeave}
            onChildClick={this.doOnChildClick}
            onChange={this.doOnBoundsChange}
            onGoogleApiLoaded={this.onGoogleApiLoaded}
            yesIWantToUseGoogleMapApiInternals
          >
            <SvgComponent>
              {secondaryRouteLines}
              {routeLines}
            </SvgComponent>
            {secondaryMarkers}
            {markers}
          </GoogleMap>
        </div>
      </div>
    );
  }
}
