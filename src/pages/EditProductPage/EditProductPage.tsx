import JSZip from 'jszip';
import React, { useEffect, useState } from 'react';
import { Button, Nav, Spinner, Tab, TabContainer, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import s3API from '../../api/amazonS3';
import categoryAPI from '../../api/category';
import productAPI from '../../api/product';
import { createCommonLicenseFile, getErrorMessage } from '../../app/util';
import { product } from '../../app/util/interfaces';
import { errors as errorCodes } from '../../app/util/errors';

import { OneToFivePage, PageWithNavbar } from '../../components';
import {
  AddAProductDescriptionForm,
  AddAProductFilesForm,
  AddAProductPicturesForm,
} from '../../forms';
import { State } from '../../redux/store';

import style from './EditProductPage.module.css';

interface IProps {
  intl: IntlShape
}

const EditProductPage: React.FC<IProps> = (props) => {
  const { intl } = props;
  const currentUser = useSelector((state: State) => state.auth.user);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<product | null>(null);
  const [productDescription, setProductDescription] = useState<string | null>(null);
  const [productFiles, setProductFiles] = useState<Array<File>>([]);
  const [postInProgress, setPostInProgress] = useState<boolean>(false);

  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  const isDescriptionFilled = !!(
    product &&
    product.productName &&
    product.productPrice >= 0 &&
    product.productCategory &&
    product.productDescription
  );
  const isImagesFilled = !!(
    product &&
    product.productPictures &&
    product.productPictures.length > 0
  );
  const isFilesFilled = !!(
    productFiles &&
    productFiles.length > 0
  )

  const updateProduct = (input: any) => {
    setProduct({
      ...product,
      ...input,
    });
  };

  const updateFile = (input: any) => {
    setProductFiles([...input.productFiles]);
  };

  const zipFiles = async () => {
    const license = createCommonLicenseFile(
      product?.productName!,
      currentUser?.customerName!,
      'Example License',
    );

    const files = [...productFiles, license];
    const zip = JSZip();
    for (let i = 0; i < files!.length; i++) {
      const file = files![i];
      zip.file(file.name, file);
    }

    return zip.generateAsync({ type: 'blob' }).then(content => {
      return content;
    });
  };

  const handleSubmit = async () => {
    setPostInProgress(true);
    if (isFilesFilled) {
      const zippedFile = await zipFiles();

      s3API
        .getSignedUrl('products')
        .then((res: any) => {
          const signedUploadUrl: string = res.url;
          s3API
            .uploadToS3Bucket(signedUploadUrl, zippedFile)
            .then((res: any) => {
              const fileUrl = signedUploadUrl.split('?')[0];

              productAPI
                .editProduct({
                  ...product!,
                  productFile: fileUrl,
                })
                .then((res: any) => {
                  const { _id } = res.updatedProduct;
                  navigate(`/product/${_id}`)
                })
                .catch(error => {
                  throw error;
                });
            })
            .catch(error => {
              throw error;
            });
        })
        .catch(error => {
          const errorMsg = getErrorMessage(error);
          const errorCode: any = errorCodes.product[errorMsg as keyof typeof errorCodes.product];
          toast.error(intl.formatMessage({ id: `Product.${errorCode}` }));
        })
        .finally(() => {
          setPostInProgress(false);
        });
    } else {
      productAPI
        .editProduct({
          ...product!,
        })
        .then((res: any) => {
          const { _id } = res.updatedProduct;
          navigate(`/product/${_id}`)
        })
        .catch(error => {
          const errorMsg = getErrorMessage(error);
          const errorCode: any = errorCodes.product[errorMsg as keyof typeof errorCodes.product];
          toast.error(intl.formatMessage({ id: `Product.${errorCode}` }));
        })
        .finally(() => {
          setPostInProgress(false);
        });
    }

  };

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const res: any = await productAPI.getProductById(id!);
        const { product } = res;
        const { productDescription, ...rest } = product;
        setProductDescription(productDescription);
        setProduct({ ...rest, productDescription });
        setIsLoading(false);
      } catch (error) {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.product[errorMsg as keyof typeof errorCodes.product];
        toast.error(intl.formatMessage({ id: `Product.${errorCode}` }));
      }
    };

    getProduct();
  }, [id])


  return (
    <OneToFivePage>
      <div className={style.wrapper}>
        {isLoading
          ? <Spinner animation="border" />
          : <div className={style.container}>
            <TabContainer defaultActiveKey="description">
              <Nav variant="pills" className={style.tabButtons}>
                <Nav.Item className={style.tabItem}>
                  <Nav.Link eventKey="description">
                    <FormattedMessage id="EditProductPage.DescriptionTabTitle" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className={style.tabItem}>
                  <Nav.Link disabled={!isDescriptionFilled} eventKey="images">
                    <FormattedMessage id="EditProductPage.ImagesTabTitle" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className={style.tabItem}>
                  <Nav.Link
                    disabled={!isDescriptionFilled || !isImagesFilled}
                    eventKey="product"
                  >
                    <FormattedMessage id="EditProductPage.ProductTabTitle" />
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="description">
                  <AddAProductDescriptionForm
                    updateProductInfo={(input: any) => updateProduct(input)}
                    initialValue={{
                      productName: product?.productName,
                      productDescription: productDescription,
                      productCategory: product?.productCategory,
                      productPrice: product?.productPrice,
                    }}
                    isEdit={true}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="images">
                  <AddAProductPicturesForm
                    updateProductInfo={(input: any) => updateProduct(input)}
                    images={product?.productPictures}
                    isEdit={true}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="product">
                  <AddAProductFilesForm
                    updateProductInfo={(input: any) => updateFile(input)}
                    isEdit={true}
                  />
                </Tab.Pane>
              </Tab.Content>
            </TabContainer>

            <Button
              disabled={!isImagesFilled || !isDescriptionFilled || postInProgress}
              onClick={handleSubmit}
            >
              {postInProgress
                ? <Spinner animation='border' />
                : <FormattedMessage id="AddAProduct.submitBtn" />
              }
            </Button>
          </div>
        }

      </div>
    </OneToFivePage>
  );
};

export default injectIntl(EditProductPage);
