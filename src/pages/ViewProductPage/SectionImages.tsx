import React from 'react';
import { FormattedMessage } from 'react-intl';

import style from './ViewProductPage.module.css';

interface Props {
  images: Array<string>;
}

const SectionImages: React.FC<Props> = (props) => {
  const { images } = props;
  return (
    <section className={style.images}>
      {images.map((img, index) => (
        <div className={style.image} key={index}>
          <img src={img} alt='Preview image' />
        </div>
      ))}
    </section>
  )
}

export default SectionImages;