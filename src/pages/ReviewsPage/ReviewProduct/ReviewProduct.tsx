import { ChangeEvent, FC, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import s3API from '../../../api/amazonS3';
import reviewAPI from '../../../api/review';
import { getErrorMessage } from '../../../app/util';
import { errors as errorCodes } from '../../../app/util/errors';

import { FormInput, ImageInput } from '../../../components';

import style from './ReviewProduct.module.css';

interface IProps {
  review: any;
  handleClose: Function;
  intl: IntlShape;
}

const ReviewProduct: FC<IProps> = (props) => {
  const { review, intl } = props;
  const { product } = review;
  const { productName, } = product;

  const [rating, setRating] = useState<number>(review.productRating || 0);
  const [images, setImages] = useState<Array<string>>(review.reviewPictures || []);


  const schema = Joi.object({
    productReview: Joi.string().label('Review').allow(''),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    getFieldState,
  } = useForm<any>({
    resolver: joiResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      productReview: review.productReview || '',
    },
  });

  const changeRating = (rating: number) => {
    setRating(rating);
  }

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

  const handleReview: SubmitHandler<any> = async data => {
    const { productReview } = data;
    reviewAPI.editReview({
      _id: review._id,
      productReview: productReview || '',
      productRating: rating,
      reviewPictures: images,
    })
      .then((res: any) => {
        props.handleClose();
        toast.success(intl.formatMessage({ id: 'ReviewProduct.successMessage' }));
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.review[errorMsg as keyof typeof errorCodes.review];
        toast.error(intl.formatMessage({ id: `Review.${errorCode}` }));
      })
  };

  return review._id
    ? <Modal
      show={true}
      backdrop="static"
      onHide={() => props.handleClose()}
      centered
      size='lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3><FormattedMessage id='ReviewProduct.title' values={{ name: productName }} /></h3>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleReview)}>
        <Modal.Body>

          <div className={style.ratingSection}>
            <StarRatings
              rating={rating}
              starRatedColor="#d63384"
              starHoverColor='#efadce'
              changeRating={(rate: number) => changeRating(rate)}
              numberOfStars={5}
              name='productRating'
              svgIconPath='M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z'
              svgIconViewBox='0 0 1024 1024'
            />
          </div>

          <FormInput
            name='productReview'
            label={intl.formatMessage({
              id: 'ReviewProduct.reviewLabel'
            })}
            placeholder={intl.formatMessage({
              id: 'ReviewProduct.reviewPlaceholder'
            })}
            control={control}
          />

          <Form.Group>
            <Form.Label className={style.label}><FormattedMessage id='ReviewProduct.imageLabel' /></Form.Label>
            <ImageInput
              images={images}
              handleUploadImage={(image: Array<File>) => uploadImage(image)}
              handleDeleteImage={(index: number) => deleteImage(index)}
              multiple={true}
            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-primary' onClick={() => props.handleClose()}>
            <FormattedMessage id='ReviewProduct.cancelButtonLabel' />
          </Button>
          <Button type='submit' disabled={rating === 0}>
            <FormattedMessage id='ReviewProduct.submitButtonLabel' />
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
    : null
};

export default injectIntl(ReviewProduct);