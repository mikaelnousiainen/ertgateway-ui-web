import React from 'react';

import messages from './messages';
import { FormattedMessage } from 'react-intl';

export default function NotFound() {
  return (
    <article>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    </article>
  );
}
