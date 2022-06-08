import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

import style from './ImageCarousel.module.css';

interface IProps {
  images: Array<string>;
}

const ImageCarousel: React.FC<IProps> = props => {
  const { images } = props;

  const [activeImage, setActiveImage] = useState<string | null>(null);

  const renderImages = () => {
    return images.map((img, index) => (
      <Carousel.Item key={index} className={style.imageWrapper}>
        <img
          className={style.img}
          src={img}
          alt={`Image #${index}`}
          onClick={() => {
            setActiveImage(img);
          }}
        />
      </Carousel.Item>
    ));
  };

  return (
    <div className={style.wrapper}>
      {activeImage && (
        <div
          className={style.activeImageWrapper}
          onClick={() => {
            setActiveImage(null);
          }}
        >
          <img
            className={style.activeImage}
            src={activeImage}
            alt={`Active image`}
          />
        </div>
      )}
      <Carousel>{renderImages()}</Carousel>
    </div>
  );
};

export default ImageCarousel;
