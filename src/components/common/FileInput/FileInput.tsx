import React, { useEffect, useState } from 'react';
import { AiOutlineFile } from 'react-icons/ai';

import { RiCloseFill, RiUpload2Line } from 'react-icons/ri';
import { TiCloudStorageOutline } from 'react-icons/ti';
import { FormattedMessage } from 'react-intl';

import style from './FileInput.module.css';

interface Props {
  multiple: boolean;
  files: Array<string>;
  handleUpload: Function;
  handleDelete: Function;
}

const FileInput: React.FC<Props> = props => {
  const { multiple } = props;
  const [images, setImages] = useState<Array<any>>(props.files || []);
  const [error, setError] = useState<null | string>(null);

  const handleChange = async (e: any) => {
    const imagesInInput = [...e.target.files];
    const imagesAfterUpload: Array<any> = [];

    for (let i = 0; i < imagesInInput.length; i++) {
      const image = imagesInInput[i];

      imagesAfterUpload.push(image);
    }

    props.handleUpload(imagesAfterUpload);
    setImages([...images, ...imagesAfterUpload]);
  };

  const handleDelete = (e: any, index: number) => {
    const imagesAfterDelete = images.filter((item, i) => i !== index);

    props.handleDelete(index);
    setImages([...imagesAfterDelete]);
    e.preventDefault();
  };

  return (
    <>
      <div className={style.dropzone}>
        <label className={style.dropzoneButton}>
          <RiUpload2Line className={style.uploadIcon} />
          <div className={style.title}>
            <FormattedMessage id="FileInput.uploadTitle" />
          </div>
          <FormattedMessage id="FileInput.uploadSubtitle" />
          <input
            id="file"
            name="file"
            type="file"
            onChange={e => handleChange(e)}
            multiple={multiple}
          />
        </label>
        {error && <div>{error}</div>}
        <div className={style.images}>
          {images &&
            images.map((image: any, index: number) => {
              return (
                <div
                  id={'image' + index}
                  key={index}
                  className={style.imageContainer}
                >
                  <div className={style.previewImage}>
                    <AiOutlineFile className={style.previewIcon} />
                  </div>

                  <div className={style.imageName}>
                    {image.name}
                  </div>

                  <div
                    className={style.removeImageButton}
                    onClick={e => handleDelete(e, index)}
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

export default FileInput;
