/*
 * Embedded Radio Tracker
 *
 * Copyright (C) 2017 Mikael Nousiainen
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const K_WIDTH = 20;
const K_HEIGHT = 20;

const STYLES = {
  primary: {
    normal: '#20e0e0',
    hovered: '#60e0e0',
    current: '#f0f030',
    centerNormal: 'white',
    centerSelected: '#f09050',
  },
  secondary: {
    normal: '#b0b0b0',
    hovered: '#d0d0d0',
    current: '#80f080',
    centerNormal: 'white',
    centerSelected: '#808080',
  },
};

function getMapMarkerStyle(hovered, selected, current, styleName) {
  const style = STYLES[styleName];

  let ringColor;

  if (current) {
    ringColor = style.current;
  } else if (hovered) {
    ringColor = style.hovered;
  } else {
    ringColor = style.normal;
  }

  let centerColor;

  if (selected) {
    centerColor = style.centerSelected;
  } else {
    centerColor = style.centerNormal;
  }

  let sizeCoeff = 1.0;

  if (current) {
    sizeCoeff += 1.5;
  }

  if (hovered) {
    sizeCoeff += 1.0;
  } else if (selected) {
    sizeCoeff += 0.5;
  } else {
    sizeCoeff += 0.0;
  }

  return {
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,
    cursor: 'pointer',

    border: `5px solid ${ringColor}`,
    borderRadius: K_HEIGHT,
    backgroundColor: `${centerColor}`,
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4,

    transform: `scale(${sizeCoeff})`,

    willChange: 'transform',
    transition: 'transform 0.25s cubic-bezier(0.485, 2.000, 0.545, 0.835)',
    WebkitTransition: '-webkit-transform 0.25s cubic-bezier(0.485, 2.000, 0.545, 0.835)',
  };
}

export { getMapMarkerStyle };
