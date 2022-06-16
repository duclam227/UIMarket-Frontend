import React, { useEffect, useState } from "react";
import { IntlShape, injectIntl, FormattedMessage } from "react-intl";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

import { RichTextEditor, FormInput } from "../../components";

import categoryAPI from "../../api/category";

import style from './AddAProductDescriptionForm.module.css';

interface Props {
  updateProductInfo: Function;
  initialValue?: any;
  isEdit?: boolean;
  intl: IntlShape;
}

const AddAProductDescriptionForm: React.FC<Props> = (props) => {
  const {
    initialValue,
    isEdit,
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

  const schema = Joi.object({
    productName: Joi.string().required().label('Product name').min(10),
    productPrice: Joi.number().required().label('Product price').min(0).allow(0),
    productDescription: Joi.string().required().label('Product description').min(20),
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
      productName: initialValue?.productName || null,
      productPrice: initialValue?.productPrice >= 0 ? initialValue?.productPrice : null,
      productDescription: initialValue?.productDescription || null,
    }
  });

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
      <div className={style.formTitle}><FormattedMessage id={isEdit ? 'EditProduct.TabDescriptionTitle' : 'AddAProduct.TabDescriptionTitle'} /></div>

      <FormInput
        label={productNameLabel}
        placeholder={productNamePlaceholder}
        name="productName"
        control={control}
        className="mb-3"
        labelClassName={style.label}
      />

      <FormInput
        label={productPriceLabel}
        placeholder={productPricePlaceholder}
        name="productPrice"
        control={control}
        className="mb-3"
        labelClassName={style.label}
      />

      <Form.Group className="mb-3">
        <Form.Label className={style.label}>{productCategoryLabel}</Form.Label>
        <Form.Select
          id="productCategory"
          aria-label="Default select example"
          defaultValue={initialValue?.productCategory || null}
        >
          <option selected disabled={true}>
            {intl.formatMessage({ id: 'AddAProduct.ProductCategoryPlaceholder' })}
          </option>
          {categories && categories.map(cat => (
            <option value={cat._id}>{cat.categoryName}</option>
          ))
          }
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className={style.label}>{productDescriptionLabel}</Form.Label>
        <Controller
          control={control}
          name="productDescription"
          render={({ field: { onChange, onBlur, value } }) => (
            <RichTextEditor
              onChange={(e: any) => {
                props.updateProductInfo({
                  productDescription: e
                });
                return onChange(e);
              }}
              onBlur={onBlur}
              initialValue={value}
            />
          )}
        />
        {errors.productDescription && (
          <Alert variant="danger" className="mt-2">
            {errors.productDescription.message}
          </Alert>
        )}
        {/* <RichTextEditor
          onChange={(e: any) => {
            props.updateProductInfo({
              productDescription: e
            })
          }}
          initialValue={initialValue?.productDescription || null}
        /> */}
      </Form.Group>
    </Form >
  )
}

export default injectIntl(AddAProductDescriptionForm);