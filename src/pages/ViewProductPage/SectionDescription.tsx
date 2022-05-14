import React from 'react';
import parse from 'html-react-parser';

import style from './ViewProductPage.module.css';
import { FormattedMessage } from 'react-intl';

interface Props {
  body: string
}

const SectionDescription: React.FC<Props> = (props) => {
  const { body } = props;
  return body
    ? (
      <section className={style.body}>
        <h3><FormattedMessage id='ViewProductPage.DescriptionTitle' /></h3>
        {parse(body)}
      </section>
    )
    : null
}

export default SectionDescription;