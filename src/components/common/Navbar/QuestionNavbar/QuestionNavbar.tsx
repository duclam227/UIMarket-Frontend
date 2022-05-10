import classNames from 'classnames';

import { BsFillLightningChargeFill } from 'react-icons/bs';

import style from './QuestionNavbar.module.css';

const QuestionNavbar = () => {
  return (
    <nav className={style.subNavbar}>
      <section className={style.leftSide}>
        <button className={style.button}>Questions</button>
        <button className={style.button}>Tags</button>
      </section>

      <section className={style.rightSide}>
        <button className={style.button}>DeeX Marketplace</button>
      </section>
    </nav>
  )
}

export default QuestionNavbar;