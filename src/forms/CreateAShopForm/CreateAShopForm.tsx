import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FormattedMessage, IntlShape, injectIntl } from "react-intl";

import { logInWithJWT } from '../../redux/index';
import shopAPI from "../../api/shop";
import { setJwt } from "../../app/util/authHelpers";

import style from './CreateAShopForm.module.css';

interface Props {
  intl: IntlShape;
}

const CreateAShopForm: React.FC<Props> = (props) => {
  const {
    intl,
  } = props;

  const [shopInfo, setShopInfo] = useState<any>(null);
  const dispatch = useDispatch();

  const shopNameLabel = <FormattedMessage id='CreateAShopForm.shopNameLabel' />
  const shopNamePlaceholder = intl.formatMessage({
    id: 'CreateAShopForm.shopNamePlaceholder'
  })

  const updateShopInfo = (input: any) => {
    setShopInfo({
      ...shopInfo,
      ...input,
    })
  }

  const handleCreateShop = () => {
    shopAPI.createShop(shopInfo)
      .then((res: any) => {
        console.log(res);
        const { token }: { token: string } = res;
        setJwt(token);

        dispatch(logInWithJWT(token));
      })
      .catch(error => {
        console.log(error);
      })
  }

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
      <Form.Group className="mb-3">
        <Form.Label className={style.label}>{shopNameLabel}</Form.Label>
        <Form.Control
          id="shopName"
          type="text"
          placeholder={shopNamePlaceholder}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className={style.label}>{shopNameLabel}</Form.Label>
        <Form.Control
          id="shopDescription"
          type="textarea"
          placeholder={shopNamePlaceholder}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className={style.label}>{shopNameLabel}</Form.Label>
        <Form.Control
          id="shopEmail"
          type="email"
          placeholder={shopNamePlaceholder}
          required={true}
        />
      </Form.Group>

      <Button type='button' onClick={handleCreateShop}>Create shop</Button>

    </Form>
  )
}

export default injectIntl(CreateAShopForm);