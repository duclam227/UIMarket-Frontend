import React from "react";
import { IntlShape, injectIntl } from "react-intl";

import Form from "react-bootstrap/Form";

import style from './AddAProductDescriptionForm.module.css';
import { RichTextEditor } from "../../components";

interface Props {
  updateProductInfo: Function;
  intl: IntlShape;
}

const AddAProductDescriptionForm: React.FC<Props> = (props) => {
  const {
    intl
  } = props;

  const productNameLabel = intl.formatMessage({ id: 'AddAProduct.ProductNameLabel' })
  const productNamePlaceholder = intl.formatMessage({ id: 'AddAProduct.ProductNamePlaceholder' });

  const productPriceLabel = intl.formatMessage({ id: 'AddAProduct.ProductPriceLabel' })
  const productPricePlaceholder = intl.formatMessage({ id: 'AddAProduct.ProductPricePlaceholder' });

  const productCategoryLabel = intl.formatMessage({ id: 'AddAProduct.ProductCategoryLabel' })
  const productCategoryPlaceholder = intl.formatMessage({ id: 'AddAProduct.ProductCategoryPlaceholder' });

  const productDescriptionLabel = intl.formatMessage({ id: 'AddAProduct.ProductDescriptionLabel' })
  const productDescriptionPlaceholder = intl.formatMessage({ id: 'AddAProduct.ProductDescriptionPlaceholder' });

  return (
    <Form
      name='AddAProductDescriptionForm'
      onChange={(e: any) => {
        props.updateProductInfo({
          [e.target.id]: e.target.value
        })
      }}
      className={style.form}
    >
      <Form.Group className="mb-3">
        <Form.Label className={style.label}>{productNameLabel}</Form.Label>
        <Form.Control
          id="productName"
          type="text"
          placeholder={productNamePlaceholder}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className={style.label}>{productPriceLabel}</Form.Label>
        <Form.Control
          id="productPrice"
          type="number"
          placeholder={productPricePlaceholder}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className={style.label}>{productCategoryLabel}</Form.Label>
        <Form.Select
          id="productCategory"
          aria-label="Default select example"
        >
          <option disabled={true} selected={true}>{productCategoryPlaceholder}</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className={style.label}>{productDescriptionLabel}</Form.Label>
        <RichTextEditor
          onChange={(e: any) => {
            props.updateProductInfo({
              productDescription: e
            })
          }}
        />
      </Form.Group>

    </Form>
  )
}

export default injectIntl(AddAProductDescriptionForm);