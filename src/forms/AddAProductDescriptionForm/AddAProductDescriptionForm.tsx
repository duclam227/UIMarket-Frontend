import React, { useEffect, useState } from "react";
import { IntlShape, injectIntl, FormattedMessage } from "react-intl";
import Form from "react-bootstrap/Form";

import { RichTextEditor } from "../../components";

import categoryAPI from "../../api/category";

import style from './AddAProductDescriptionForm.module.css';

interface Props {
  updateProductInfo: Function;
  intl: IntlShape;
}

const AddAProductDescriptionForm: React.FC<Props> = (props) => {
  const {
    intl
  } = props;

  const [categories, setCategories] = useState<Array<any> | null>(null);

  useEffect(() => {
    categoryAPI.getAllCategories()
      .then((res: any) => {
        setCategories(res.categories);
      })
  }, [])

  const productNameLabel = intl.formatMessage({ id: 'AddAProduct.ProductNameLabel' });
  const productNamePlaceholder = intl.formatMessage({ id: 'AddAProduct.ProductNamePlaceholder' });

  const productPriceLabel = intl.formatMessage({ id: 'AddAProduct.ProductPriceLabel' });
  const productPricePlaceholder = intl.formatMessage({ id: 'AddAProduct.ProductPricePlaceholder' });

  const productCategoryLabel = intl.formatMessage({ id: 'AddAProduct.ProductCategoryLabel' });
  const productCategoryPlaceholder = intl.formatMessage({ id: 'AddAProduct.ProductCategoryPlaceholder' });

  const productDescriptionLabel = intl.formatMessage({ id: 'AddAProduct.ProductDescriptionLabel' });
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
      <div className={style.formTitle}><FormattedMessage id='AddAProduct.TabDescriptionTitle' /></div>

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
          {categories && categories.map(cat => (
            <option value={cat._id}>{cat.categoryName}</option>
          ))
          }

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

    </Form >
  )
}

export default injectIntl(AddAProductDescriptionForm);