import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { BsFillLightningChargeFill } from 'react-icons/bs';

import style from './QuestionNavbar.module.css';
import { FormattedMessage } from 'react-intl';

const QuestionNavbar = () => {
  return (
    <nav className={style.subNavbar}>
      <section className={style.leftSide}>
        <Link to="/questions">
          <button className={style.button}>
            <FormattedMessage
              id="QuestionNavBar.questionsBtn"
              defaultMessage="Questions"
            />
          </button>
        </Link>
        <Link to="/questions/tags">
          <button className={style.button}>
            <FormattedMessage id="QuestionNavBar.tagsBtn" defaultMessage="Tags" />
          </button>
        </Link>
      </section>

      <section className={style.rightSide}>
        <Link to="/products">
          <button className={style.button}>
            <FormattedMessage
              id="QuestionNavBar.Marketplace"
              defaultMessage="DeeX Marketplace"
            />
          </button>
        </Link>
      </section>
    </nav>
  );
};

export default QuestionNavbar;
