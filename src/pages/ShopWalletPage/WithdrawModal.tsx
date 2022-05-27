
import { FC, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { FormInput } from '../../components';
import paymentAPI from '../../api/payment';
import { errors as errorCodes } from '../../app/util/errors';
import { getErrorMessage } from '../../app/util';

import style from './ShopWalletPage.module.css';

interface IProps {
  handleClose: Function;
  handleReload: Function;
  balance: number;
  intl: IntlShape;
}

const WithdrawModal: FC<IProps> = (props) => {
  const { balance, intl } = props;

  const schema = Joi.object({
    amountValue: Joi.number().label('Amount').max(balance),
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
  });

  const handleWithdraw: SubmitHandler<any> = async data => {
    const { amountValue } = data;
    paymentAPI.withdrawMoney(amountValue)
      .then((res: any) => {
        props.handleClose();
        toast.success(intl.formatMessage({ id: 'ShopWalletPage.successMessage' }), {
          onClose: () => props.handleReload()
        });
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.payment[errorMsg as keyof typeof errorCodes.payment];
        toast.error(intl.formatMessage({ id: `ShopWalletPage.${errorCode}` }))
      })
  };

  return (
    <Modal
      show={true}
      backdrop="static"
      onHide={() => props.handleClose()}
      centered
      size='lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3><FormattedMessage id='ShopWalletPage.withdrawModalTitle' /></h3>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleWithdraw)}>
        <Modal.Body className={style.withdrawModalBody}>

          <h5>
            <FormattedMessage id='ShopWalletPage.withdrawCurrentBalance' values={{ money: balance }} />
          </h5>

          <Form.Group>
            <FormInput
              name='amountValue'
              label={intl.formatMessage({
                id: 'ShopWalletPage.withdrawModalAmountLabel'
              })}
              placeholder={intl.formatMessage({
                id: 'ShopWalletPage.withdrawModalAmountPlaceholder'
              })}
              control={control}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='outline-primary' onClick={() => props.handleClose()}>
            <FormattedMessage id='ReviewProduct.cancelButtonLabel' />
          </Button>
          <Button type='submit'>
            <FormattedMessage id='ReviewProduct.submitButtonLabel' />
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
};

export default injectIntl(WithdrawModal);