import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import cover from './images/startEarningImage.png';

import style from './LandingPage.module.css';

const SectionStartEarning = () => {
  return (
    <section className={classNames(style.sectionWrapper, style.sectionStartEarning)}>
      <div className={style.sectionStartEarningLeft}>
        <h1 className={style.sectionStartEarningTitle}>
          <FormattedMessage id="LandingPage.SectionStartEarningTitle" />
        </h1>
        <h3 className={style.sectionStartEarningSubtitle}>
          <FormattedMessage id="LandingPage.SectionStartEarningSubtitle" />
        </h3>
        <Link to="/create-shop">
          <button className={style.sectionStartEarningButton}>
            <FormattedMessage id="LandingPage.OpenShopLabel" />
          </button>
        </Link>
      </div>

      <div className={style.sectionStartEarningRight}>
        <img src={cover} alt="Desk with a computer" className="d-lg-block my-4 my-lg-0" />
      </div>
    </section>
  );
};

export default SectionStartEarning;
