import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import cover from './images/exploreForumImage.png';

import style from './LandingPage.module.css';

const SectionExploreForum = () => {
  return (
    <section className={classNames(style.sectionWrapper, style.sectionExploreForum)}>
      <div className={style.sectionExploreForumLeft}>
        <img src={cover} alt="2 people talking" className="d-lg-block my-4 my-lg-0" />
      </div>
      <div className={style.sectionExploreForumRight}>
        <h1 className={style.sectionExploreForumTitle}>
          <FormattedMessage
            id="LandingPage.SectionExploreForumTitle"
            values={{
              br: <br />,
            }}
          />
        </h1>
        <h3 className={style.sectionExploreForumSubtitle}>
          <FormattedMessage id="LandingPage.SectionExploreForumSubtitle" />
        </h3>
        <Link to="/questions">
          <button className={style.sectionExploreForumButton}>
            <FormattedMessage id="LandingPage.ExploreForumLabel" />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default SectionExploreForum;
