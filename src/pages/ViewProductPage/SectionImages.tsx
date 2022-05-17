import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ImageCarousel } from '../../components';

import style from './ViewProductPage.module.css';

interface Props {
  images: Array<string>;
}

const SectionImages: React.FC<Props> = (props) => {
  const { images } = props;
  return images
    ? (
      <section className={style.images}>
        <ImageCarousel images={images} />
      </section>
    )
    : null
}

export default SectionImages;