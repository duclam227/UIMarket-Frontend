import React, { useEffect, useState } from 'react';

import { RiCloseFill, RiUpload2Line } from 'react-icons/ri';
import { TiCloudStorageOutline } from 'react-icons/ti';
import { FormattedMessage } from 'react-intl';

import style from './ImageInput.module.css';

interface Props {
  multiple: boolean;
  images: Array<string>;
  handleUploadImage: Function;
  handleDeleteImage: Function;
}

const ImageInput: React.FC<Props> = props => {
  const { multiple } = props;
  const [images, setImages] = useState<Array<any>>(props.images || []);
  const [prevImages, setPrevImages] = useState<Array<any>>(props.images || []);
  const [previewImages, setPreviewImages] = useState<Array<any>>(
    props.images || [],
  );
  const [error, setError] = useState<null | string>(null);

  const readFileAsURL = (inputFile: File) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  };

  const handleChange = async (e: any) => {
    const imagesInInput = [...e.target.files];
    const imagesAfterUpload: Array<any> = [];
    const previewImagesAfterUpload: Array<any> = [];

    for (let i = 0; i < imagesInInput.length; i++) {
      const image = imagesInInput[i];
      if (!image.type.startsWith('image/')) {
        setError('File must be a picture!');
      } else {
        setError(null);
      }

      const imageURL = await readFileAsURL(image);
      imagesAfterUpload.push(image);
      previewImagesAfterUpload.push(imageURL);
    }

    props.handleUploadImage(imagesAfterUpload);
    setImages(multiple ? [...images, ...imagesAfterUpload] : [...imagesAfterUpload]);
    setPreviewImages(multiple ? [...previewImages, ...previewImagesAfterUpload] : [...previewImagesAfterUpload]);
    setPrevImages(multiple ? [...previewImages, ...previewImagesAfterUpload] : [...previewImagesAfterUpload]);
  };

  const handleDeleteImage = (e: any, index: number) => {
    const imagesAfterDelete = images.filter((item, i) => i !== index);
    const previewImagesAfterDelete = prevImages.filter(
      (item, i) => i !== index,
    );

    props.handleDeleteImage(index);
    setImages([...imagesAfterDelete]);
    setPreviewImages([...previewImagesAfterDelete]);

    e.preventDefault();
  };

  useEffect(() => {
    setPrevImages([...previewImages]);
  }, [previewImages]);

  return (
    <>
      <div className={style.dropzone}>
        <label className={style.dropzoneButton}>
          <RiUpload2Line className={style.uploadIcon} />
          <div className={style.title}>
            <FormattedMessage id="ImageInput.uploadTitle" />
          </div>
          <FormattedMessage id="ImageInput.uploadSubtitle" />
          <input
            id="image"
            name="image"
            type="file"
            onChange={e => handleChange(e)}
            accept="image/*"
            multiple={multiple}
          />
        </label>
        {error && <div>{error}</div>}
        <div className={style.images}>
          {previewImages &&
            previewImages.map((image: any, index: number) => {
              return (
                <div
                  id={'image' + index}
                  key={index}
                  className={style.imageContainer}
                >
                  <div className={style.previewImage}>
                    <img src={image} alt="Preview" />
                  </div>

                  <div
                    className={style.removeImageButton}
                    onClick={e => handleDeleteImage(e, index)}
                  >
                    <RiCloseFill className={style.removeImageIcon} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ImageInput;
