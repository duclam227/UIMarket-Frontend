import { FC } from 'react';
import { Modal } from 'react-bootstrap';

import style from './ReviewProduct.module.css';

interface IProps {
  id: string;
}

const ReviewProduct: FC<IProps> = (props) => {
  const { id } = props;
  return (
    <Modal>

    </Modal>
  )
}