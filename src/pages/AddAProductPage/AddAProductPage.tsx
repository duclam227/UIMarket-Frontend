import JSZip from 'jszip';
import React, { useEffect, useState } from 'react';
import { Button, Nav, Tab, TabContainer, Tabs } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s3API from '../../api/amazonS3';
import categoryAPI from '../../api/category';
import productAPI from '../../api/product';
import { createCommonLicenseFile } from '../../app/util';
import { product } from '../../app/util/interfaces';

import { OneToFivePage, PageWithNavbar } from '../../components';
import {
  AddAProductDescriptionForm,
  AddAProductFilesForm,
  AddAProductPicturesForm,
} from '../../forms';
import { State } from '../../redux/store';

// import './AddAProductPage.css'
import style from './AddAProductPage.module.css';

const AddAProductPage: React.FC = () => {
  const currentUser = useSelector((state: State) => state.auth.user);
  const [product, setProduct] = useState<product | null>(null);
  const [productFiles, setProductFiles] = useState<Array<File>>([]);

  const navigate = useNavigate();

  const isDescriptionFilled = !!(
    product &&
    product.productName &&
    product.productPrice &&
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
              .addNewProduct({
                ...product!,
                productFile: fileUrl,
              })
              .then((res: any) => {
                const { _id } = res.product;
                navigate(`/product/${_id}`)
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <OneToFivePage>
      <div className={style.wrapper}>
        <div className={style.container}>
          <TabContainer defaultActiveKey="description">
            <Nav variant="pills" className={style.tabButtons}>
              <Nav.Item className={style.tabItem}>
                <Nav.Link eventKey="description">
                  <FormattedMessage id="AddAProductPage.DescriptionTabTitle" />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={style.tabItem}>
                <Nav.Link disabled={!isDescriptionFilled} eventKey="images">
                  <FormattedMessage id="AddAProductPage.ImagesTabTitle" />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={style.tabItem}>
                <Nav.Link
                  disabled={!isDescriptionFilled || !isImagesFilled}
                  eventKey="product"
                >
                  <FormattedMessage id="AddAProductPage.ProductTabTitle" />
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="description">
                <AddAProductDescriptionForm
                  updateProductInfo={(input: any) => updateProduct(input)}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="images">
                <AddAProductPicturesForm
                  updateProductInfo={(input: any) => updateProduct(input)}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="product">
                <AddAProductFilesForm
                  updateProductInfo={(input: any) => updateFile(input)}
                />
              </Tab.Pane>
            </Tab.Content>
          </TabContainer>

          <Button
            disabled={!isImagesFilled || !isDescriptionFilled || !isFilesFilled}
            onClick={handleSubmit}
          >
            Add product
          </Button>
        </div>
      </div>
    </OneToFivePage>
  );
};

export default AddAProductPage;
