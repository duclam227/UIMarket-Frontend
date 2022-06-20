import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FormattedMessage, IntlShape, injectIntl } from "react-intl";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { FormInput, ImageInput } from "../../components";
import { logInWithJWT } from '../../redux/index';
import { setJwt } from "../../app/util/authHelpers";
import { errors as errorCodes } from "../../app/util/errors";
import { getErrorMessage } from "../../app/util";

import shopAPI from "../../api/shop";
import s3API from "../../api/amazonS3";

import style from './CreateAShopForm.module.css';

interface Props {
  intl: IntlShape;
}

const CreateAShopForm: React.FC<Props> = (props) => {
  const {
    intl,
  } = props;

  const [shopInfo, setShopInfo] = useState<any>(null);
  const [images, setImages] = useState<Array<string>>([]);
  const dispatch = useDispatch();

  const uploadImage = async (image: Array<File>) => {
    try {
      const response: any = await s3API.getSignedUrl('images');
      const signedUploadUrl: string = response.url;

      const responseUpload: any = await s3API.uploadToS3Bucket(signedUploadUrl, image[0]);
      const imageUrl = signedUploadUrl.split('?')[0];
      setImages([imageUrl]);
    }
    catch (error) {
      const errorMsg = getErrorMessage(error);
      const errorCode: any = errorCodes.upload[errorMsg as keyof typeof errorCodes.upload];
      toast.error(intl.formatMessage({ id: `Upload.${errorCode}` }));
    }
  }

  const deleteImage = (indexToDelete: number) => {
    setImages(images.filter((img, index) => index !== indexToDelete));
  }

  const shopNameLabel = intl.formatMessage({ id: 'CreateAShopForm.shopNameLabel' });
  const shopNamePlaceholder = intl.formatMessage({
    id: 'CreateAShopForm.shopNamePlaceholder'
  })

  const shopDescriptionLabel = intl.formatMessage({ id: 'CreateAShopForm.shopDescriptionLabel' });
  const shopDescriptionPlaceholder = intl.formatMessage({
    id: 'CreateAShopForm.shopDescriptionPlaceholder'
  })

  const shopEmailLabel = intl.formatMessage({ id: 'CreateAShopForm.shopEmailLabel' });
  const shopEmailPlaceholder = intl.formatMessage({
    id: 'CreateAShopForm.shopEmailPlaceholder'
  })

  const shopBannerLabel = intl.formatMessage({ id: 'CreateAShopForm.shopBannerLabel' });

  const updateShopInfo = (input: any) => {
    setShopInfo({
      ...shopInfo,
      ...input,
    })
  }

  const handleCreateShop = () => {
    const banner = images.length && images[0];
    shopAPI.createShop({
      ...shopInfo,
      shopBanner: banner,
    })
      .then((res: any) => {
        const { token }: { token: string } = res;
        setJwt(token);

        dispatch(logInWithJWT(token));
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.auth[errorMsg as keyof typeof errorCodes.auth];
        toast.error(intl.formatMessage({ id: `LoginForm.${errorCode}` }));
      })
  }

  const schema = Joi.object({
    shopEmail: Joi.string()
      .email({ tlds: { allow: false } }).required().label('Email'),
    shopName: Joi.string().required().label('Name'),
    shopDescription: Joi.string().required().label('Description'),
    shopBanner: Joi.string().label('Banner'),
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
      shopEmail: '',
      shopName: '',
      shopDescription: '',
    },
  });

  return (
    <Form
      name='CreateAShopForm'
      className={style.form}
      onChange={(e: any) => {
        updateShopInfo({
          [e.target.id]: e.target.value
        })
      }}
    >

      <FormInput
        label={shopNameLabel}
        placeholder={shopNamePlaceholder}
        name="shopName"
        control={control}
        className={`mb-3`}
        labelClassName={style.label}
      />

      <FormInput
        label={shopEmailLabel}
        placeholder={shopEmailPlaceholder}
        name="shopEmail"
        control={control}
        className={`mb-3`}
        labelClassName={style.label}
      />

      <FormInput
        label={shopDescriptionLabel}
        placeholder={shopDescriptionPlaceholder}
        name="shopDescription"
        control={control}
        className={`mb-3`}
        labelClassName={style.label}
        type="textarea"
      />

      <Form.Group>
        <Form.Label className={style.label}>{shopBannerLabel}</Form.Label>
        <br />
        <Form.Text><FormattedMessage id='CreateAShopForm.shopBannerSubtext' /></Form.Text>
        <ImageInput
          images={images}
          multiple={false}
          handleUploadImage={(image: Array<File>) => uploadImage(image)}
          handleDeleteImage={(index: number) => deleteImage(index)}
        />
      </Form.Group>

      <Button type='button' onClick={handleCreateShop}>Create shop</Button>

    </Form>
  )
}

export default injectIntl(CreateAShopForm);