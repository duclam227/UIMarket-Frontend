import React, { useEffect, useState } from 'react';
import { IntlShape, injectIntl, FormattedMessage } from 'react-intl';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';
import s3API from '../../api/amazonS3';

import { ImageInput } from '../../components';

import style from './AddAProductPicturesForm.module.css';

interface Props {
  updateProductInfo: Function;
  images?: Array<string>;
  isEdit?: boolean;
  intl: IntlShape;
}

const AddAProductPicturesForm: React.FC<Props> = props => {
  const { images: imagesFromProp, isEdit, intl } = props;

  const [images, setImages] = useState<Array<string>>(imagesFromProp || []);

  const uploadImagesToStorage = async (imagesFromInput: Array<File>) => {
    const imageUrls: Array<string> = [];
    for (let i = 0; i < imagesFromInput.length; i++) {
      try {
        const response: any = await s3API.getSignedUrl('images');
        const signedUploadUrl: string = response.url;

        const responseUpload: any = await s3API.uploadToS3Bucket(signedUploadUrl, imagesFromInput[i]);
        const imageUrl = signedUploadUrl.split('?')[0];
        imageUrls.push(imageUrl);
      }
      catch (error) {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.upload[errorMsg as keyof typeof errorCodes.upload];
        toast.error(intl.formatMessage({ id: `Upload.${errorCode}` }));
      }
    }

    return imageUrls;
  }

  const uploadImage = async (imagesFromInput: Array<File>) => {
    const imageUrls: Array<string> = await uploadImagesToStorage(imagesFromInput);
    setImages([...images, ...imageUrls]);
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
        <FormattedMessage id={isEdit ? "EditProduct.TabImagesTitle" : "AddAProduct.TabImagesTitle"} />
      </div>

      <ImageInput
        multiple={true}
        images={images}
        handleUploadImage={(image: Array<File>) => uploadImage(image)}
        handleDeleteImage={(index: number) => deleteImage(index)}
      />
    </Form>
  );
};

export default injectIntl(AddAProductPicturesForm);
