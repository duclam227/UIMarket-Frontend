import classNames from 'classnames';
import { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../app/util/customHooks';
import { customer } from '../../app/util/interfaces';
import cover from './images/heroImage.png';

import style from './LandingPage.module.css';

interface IProps {
  currentUser: customer | null;
}

const SectionHero: React.FC<IProps> = props => {
  const { currentUser } = props;

  const contentRef = useRef(null);

  const heroButton = currentUser ? (
    <Link to="/products">
      <button className={style.sectionHeroButton}>
        <FormattedMessage id="LandingPage.ExploreLabel" />
      </button>
    </Link>
  ) : (
    <Link to="/signup">
      <button className={style.sectionHeroButton}>
        <FormattedMessage id="LandingPage.SignUpLabel" />
      </button>
    </Link>
  );

  const checkAnimation = (entryArray: Array<any>) => {
    //entry array stores the one item that is registered to an observer
    const entry = entryArray[0];
    if (entry.isIntersecting) {
      const entryElement = entry.target;
      entryElement.className = classNames(style.sectionHeroLeft, style.show);
    }
  }

  useIntersectionObserver(contentRef, checkAnimation, 0.7);

  return (
    <section className={style.sectionHero}>
      <div ref={contentRef} className={classNames(style.sectionHeroLeft, style.hide)}>
        <h1 className={style.sectionHeroTitle}>
          <FormattedMessage id="LandingPage.SectionHeroTitle" />
        </h1>
        <h3 className={style.sectionHeroSubtitle}>
          <FormattedMessage id="LandingPage.SectionHeroSubtitle" />
        </h3>
        {heroButton}
      </div>
      <div className={style.sectionHeroRight}>
        <img src={cover} alt="Girl drawing" className="d-none d-lg-block" />
      </div>
    </section>
  );
};

export default SectionHero;
