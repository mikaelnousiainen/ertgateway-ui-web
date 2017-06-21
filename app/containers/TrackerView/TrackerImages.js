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

import Lightbox from 'react-images';

const DEFAULT_COUNT = 10;

export class TrackerImages extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    onFetchImages: React.PropTypes.func,
    images: React.PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      count: DEFAULT_COUNT,
      lightboxIsOpen: false,
      lightboxCurrentImage: 0,
    };
  }

  doOnFetchImages = () => {
    if (this.props.onFetchImages) {
      let count = DEFAULT_COUNT;

      try {
        count = parseInt(this.state.count, 10);
      } catch (e) {
        // ignore
      }
      if (isNaN(count)) {
        count = DEFAULT_COUNT;
      }

      this.props.onFetchImages(count);
    }
  };

  doOnCountChanged = (event) => {
    this.setState({ count: event.target.value });
  };

  openLightbox = () => {
    this.setState({ lightboxIsOpen: true });
  };

  closeLightbox = () => {
    this.setState({ lightboxIsOpen: false });
  };

  prevLightboxImage = () => {
    this.setState({ lightboxCurrentImage: this.state.lightboxCurrentImage - 1 });
  };

  nextLightboxImage = () => {
    this.setState({ lightboxCurrentImage: this.state.lightboxCurrentImage + 1 });
  };

  render() {
    const images = (this.props.images && this.props.images.length > 0) ? this.props.images : [];

    const imageComponentData = (images.length > 0) ? images : [{ name: 'placeholder' }];

    const imageComponents = imageComponentData.map((image) =>
      <div key={image.name} className="image-list-entry">
        {image.url &&
        <img className="img-responsive" src={image.url} alt={image.name} onClick={this.openLightbox} />
        }
        {!image.url &&
        <span>No image</span>
        }
      </div>
    );

    const lightboxImages = images
      .map((image) => ({ src: image.url, caption: image.name }));

    const doClickImage = () => {
      const selectedImage = lightboxImages[this.state.lightboxCurrentImage];
      window.open(selectedImage.src);
    };

    return (
      <div>
        <div style={{ margin: '15px 0px' }}>
          <Lightbox
            currentImage={this.state.lightboxCurrentImage}
            images={lightboxImages}
            imageCountSeparator=" of "
            isOpen={this.state.lightboxIsOpen}
            onClickPrev={this.prevLightboxImage}
            onClickNext={this.nextLightboxImage}
            onClose={this.closeLightbox}
            onClickImage={doClickImage}
            preloadNextImage={false}
            enableKeyboardInput
            showThumbnails
            showImageCount
            showCloseButton
            backdropClosesModal
          />
          <form className="form-inline">
            <div className="input-group">
              <span className="input-group-btn">
                <button type="button" className="btn btn-default" onClick={this.doOnFetchImages}>Fetch images</button>
              </span>
              <input
                type="text"
                className="form-input-text-small form-control"
                placeholder="Count"
                value={this.state.count}
                onChange={this.doOnCountChanged}
              />
            </div>
          </form>
        </div>
        <div style={{ margin: '15px 0px' }} className="image-grid">
          {imageComponents}
        </div>
      </div>
    );
  }
}
