import React from 'react';
import parse from 'html-react-parser';

import style from './ViewProductPage.module.css';

interface Props {
  body: string
}

const SectionDescription: React.FC<Props> = (props) => {
  const { body } = props;
  return (
    <section className={style.body}>
      {parse(body)}
    </section>
  )
}

export default SectionDescription;