import { joiResolver } from '@hookform/resolvers/joi';
import classNames from 'classnames';
import Joi from 'joi';
import { FC, useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import s3API from '../../api/amazonS3';
import invoiceAPI from '../../api/invoice';
import paymentAPI from '../../api/payment';
import { product } from '../../app/util/interfaces';
import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';

import { FormInput, ImageInput, PageWithNavbar } from '../../components';
import Product from './Product';

import style from './RequestRefundPage.module.css';

interface IProps {
  intl: IntlShape;
}

const RequestRefundPage: FC<IProps> = (props) => {
  const { intl } = props;

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [invoiceDetail, setInvocieDetail] = useState<any>(null);
  const [productList, setProductList] = useState<Array<product> | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Array<string>>([]);
  const [images, setImages] = useState<Array<string>>([]);

  const navigate = useNavigate();

  const schema = Joi.object({
    refundReason: Joi.string().required().label('Reason').min(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
    getFieldState,
  } = useForm<any>({
    resolver: joiResolver(schema),
    mode: 'onTouched',
  });

  const onToggleProductSelect = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts([...selectedProducts.filter((item: string) => item !== id)]);
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
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

  const handleRequestRefund: SubmitHandler<any> = async data => {
    const { refundReason } = data;
    paymentAPI.requestRefund(invoiceDetail._id!, [...selectedProducts], refundReason, [...images]
    )
      .then((res: any) => {
        toast.success(intl.formatMessage({ id: 'RequestRefundPage.submitSuccessMessage' }), {
          onClose: () => navigate('/purchases')
        })
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.payment[errorMsg as keyof typeof errorCodes.payment];
        toast.error(intl.formatMessage({ id: `Payment.${errorCode}` }));
      })
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      invoiceAPI.getInvoiceById(id)
        .then((res: any) => {
          const { invoice } = res;
          const { productList, ...rest } = invoice;
          setInvocieDetail({ ...rest });
          setProductList([...productList]);
        })
        .catch(error => {
          const errorMsg = getErrorMessage(error);
          toast.error(intl.formatMessage({ id: `Invoice.actionFailed` }));
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [id])

  return (
    <PageWithNavbar>
      <div className={style.wrapper}>
        {isLoading
          ? <Spinner animation='border' />
          : <>
            <section className={style.header}>
              <h2><FormattedMessage id='RequestRefundPage.title' /></h2>
              <h4><FormattedMessage id='RequestRefundPage.subtitle' /></h4>
              <div className={style.warning}><FormattedMessage id='RequestRefundPage.warning' /></div>
            </section>
            <section className={style.container}>
              {productList && productList.length > 0
                ? productList.map((product, index) => <Product
                  key={index}
                  product={product}
                  handleToggleProduct={(id: string) => onToggleProductSelect(id)}
                />)
                : null
              }
            </section>
            <Form className={style.container} onSubmit={handleSubmit(handleRequestRefund)}>
              <section className={classNames(style.form)}>
                <FormInput
                  label={intl.formatMessage({ id: 'RequestRefundPage.reasonLabel' })}
                  name="refundReason"
                  control={control}
                  className={`mb-3`}
                />
                <br />
                <Form.Group>
                  <Form.Label>
                    <FormattedMessage id='RequestRefundPage.reasonLabel' />
                  </Form.Label>
                  <ImageInput
                    multiple={true}
                    images={images}
                    handleUploadImage={(image: Array<File>) => uploadImage(image)}
                    handleDeleteImage={(index: number) => deleteImage(index)}
                  />
                </Form.Group>
              </section>

              <Button
                type='submit'
                variant='primary'
                disabled={!isDirty || !isValid || images.length < 1 || selectedProducts.length < 1}
              >
                <FormattedMessage id='RequestRefundPage.submitLabel' />
              </Button>
            </Form>

          </>
        }
      </div>
    </PageWithNavbar >
  )
};

export default injectIntl(RequestRefundPage);