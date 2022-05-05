import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import parse from 'html-react-parser';

import style from './ViewProductPage.module.css';

interface Props {
  title: string
}

const SectionHeader: React.FC<Props> = (props) => {
  const { title } = props;
  return (
    <section className={style.header}>
      <h1 className={style.title}>{title}</h1>
      <div className={style.buttonRow}>
        <Button className={style.button}>
          <AiOutlineShoppingCart />
          <FormattedMessage id='ViewProductPage.AddToCart' />
        </Button>
      </div>
    </section>
  )
}

export default SectionHeader;