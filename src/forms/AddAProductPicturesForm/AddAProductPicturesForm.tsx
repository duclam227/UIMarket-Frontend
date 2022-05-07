import React, { useEffect, useState } from 'react';
import { IntlShape, injectIntl, FormattedMessage } from 'react-intl';
import Form from 'react-bootstrap/Form';

import s3API from '../../api/amazonS3';

import { ImageInput } from '../../components';

import style from './AddAProductPicturesForm.module.css';

interface Props {
  updateProductInfo: Function;
  intl: IntlShape;
}

const AddAProductPicturesForm: React.FC<Props> = props => {
  const { intl } = props;

  const [images, setImages] = useState<Array<string>>([]);

  const uploadImage = (image: File) => {
    s3API
      .getSignedUrl('images')
      .then((res: any) => {
        const signedUploadUrl: string = res.url;
        s3API
          .uploadToS3Bucket(signedUploadUrl, image)
          .then((res: any) => {
            const imageUrl = signedUploadUrl.split('?')[0];
            setImages([...images, imageUrl]);
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteImage = (indexToDelete: number) => {
    setImages(images.filter((img, index) => index !== indexToDelete));
  };

  useEffect(() => {
    props.updateProductInfo({
      productPictures: [...images],
    });
  }, [images]);

  return (
    <Form name="AddAProductPicturesForm" className={style.form}>
      <div className={style.formTitle}>
        <FormattedMessage id="AddAProduct.TabImagesTitle" />
      </div>

      <ImageInput
        multiple={true}
        images={images}
        handleUploadImage={(image: File) => uploadImage(image)}
        handleDeleteImage={(index: number) => deleteImage(index)}
      />
    </Form>
  );
};

export default injectIntl(AddAProductPicturesForm);
