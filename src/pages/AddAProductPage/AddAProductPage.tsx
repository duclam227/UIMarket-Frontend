import React, { useEffect, useState } from "react";
import { Button, Nav, Tab, TabContainer, Tabs } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import categoryAPI from "../../api/category";
import productAPI from "../../api/product";
import { product } from "../../app/util/interfaces";

import { OneToFivePage, PageWithNavbar } from "../../components";
import { AddAProductDescriptionForm, AddAProductPicturesForm } from "../../forms";

// import './AddAProductPage.css'
import style from './AddAProductPage.module.css';

const AddAProductPage: React.FC = () => {

  const [product, setProduct] = useState<product | null>(null);

  const isDescriptionFilled = !!(product && product.productName && product.productPrice && product.productCategory && product.productDescription);
  const isImagesFilled = !!(product && product.productPicture && product.productPicture.length > 0);

  const updateProduct = (input: any) => {
    setProduct({
      ...product,
      ...input,
    })
  }

  const handleSubmit = () => {
    productAPI.addNewProduct(product)
      .then((res: any) => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <OneToFivePage>
      <div className={style.wrapper}>
        <div className={style.container}>
          <TabContainer defaultActiveKey="description">
            <Nav variant="pills" className={style.tabButtons}>
              <Nav.Item className={style.tabItem}>
                <Nav.Link eventKey="description">
                  <FormattedMessage id='AddAProductPage.DescriptionTabTitle' />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={style.tabItem}>
                <Nav.Link disabled={!isDescriptionFilled} eventKey="images">
                  <FormattedMessage id='AddAProductPage.ImagesTabTitle' />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={style.tabItem}>
                <Nav.Link disabled={!isDescriptionFilled || !isImagesFilled} eventKey="product">
                  <FormattedMessage id='AddAProductPage.ProductTabTitle' />
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
                sdfsd
              </Tab.Pane>
            </Tab.Content>
          </TabContainer>

          <Button
            disabled={!isImagesFilled || !isDescriptionFilled}
            onClick={handleSubmit}
          >Add product</Button>
        </div>
      </div>
    </OneToFivePage>
  )
}

export default AddAProductPage;