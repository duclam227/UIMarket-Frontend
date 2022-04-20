import React, { useEffect, useState } from 'react';

import { RiCloseFill, RiUpload2Line } from 'react-icons/ri';
import { TiCloudStorageOutline } from 'react-icons/ti';
import { FormattedMessage } from 'react-intl';

import style from './ImageInput.module.css';

interface Props {
  images: Array<string>;
  handleUploadImage: Function;
  handleDeleteImage: Function;
}

const ImageInput: React.FC<Props> = (props) => {
  const [images, setImages] = useState<Array<any>>(props.images || []);
  const [prevImages, setPrevImages] = useState<Array<any>>(props.images || []);
  const [previewImages, setPreviewImages] = useState<Array<any>>(props.images || []);
  const [error, setError] = useState<null | string>(null);

  const handleChange = (e: any) => {
    const imagesInInput = [...e.target.files];
    imagesInInput.forEach(image => {
      if (!image.type.startsWith("image/")) {
        setError("File must be a picture!");
      } else {
        setError(null);
      }

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        props.handleUploadImage(image);
        setImages([...images, image]);
        setPreviewImages([...previewImages, reader.result]);
        setPrevImages([...previewImages, reader.result]);
      }
    })
  }

  const handleDeleteImage = (e: any, index: number) => {
    const imagesAfterDelete = images.filter((item, i) => i !== index);
    const previewImagesAfterDelete = prevImages.filter((item, i) => i !== index);

    props.handleDeleteImage(index);
    setImages([...imagesAfterDelete]);
    setPreviewImages([...previewImagesAfterDelete]);

    e.preventDefault();
  }

  useEffect(() => {
    setPrevImages([...previewImages]);
  }, [previewImages])

  return (
    <>
      <div className={style.dropzone}>
        <label className={style.dropzoneButton}>
          <RiUpload2Line className={style.uploadIcon} />
          <div className={style.title}><FormattedMessage id='ImageInput.uploadTitle' /></div>
          <FormattedMessage id='ImageInput.uploadSubtitle' />
          <input id='image' name='image' type="file"
            onChange={(e) => handleChange(e)}
            accept='image/*'
          />
        </label>
        {error && <div>{error}</div>}
        <div className={style.images}>
          {previewImages && previewImages.map((image: any, index: number) => {
            return (
              <div id={'image' + index} key={index} className={style.imageContainer}>

                <div className={style.previewImage}>
                  <img src={image} alt="Preview" />
                </div>

                <div className={style.removeImageButton}
                  onClick={(e) => handleDeleteImage(e, index)}
                >
                  <RiCloseFill className={style.removeImageIcon} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </>
  )
}

export default ImageInput;