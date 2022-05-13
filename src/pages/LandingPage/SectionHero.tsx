import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { customer } from '../../app/util/interfaces';
import cover from './images/heroImage.png';

import style from './LandingPage.module.css';

interface IProps {
  currentUser: customer | null;
}

const SectionHero: React.FC<IProps> = (props) => {
  const { currentUser } = props;

  const heroButton = currentUser
    ? <Link to='/products'><button className={style.sectionHeroButton}>
      <FormattedMessage id='LandingPage.ExploreLabel' />
    </button></Link>
    : <Link to='/signup'><button className={style.sectionHeroButton}>
      <FormattedMessage id='LandingPage.SignUpLabel' />
    </button></Link>;

  return (
    <section className={style.sectionHero}>
      <div className={style.sectionHeroLeft}>
        <h1 className={style.sectionHeroTitle}>
          <FormattedMessage id='LandingPage.SectionHeroTitle' />
        </h1>
        <h3 className={style.sectionHeroSubtitle}><FormattedMessage id='LandingPage.SectionHeroSubtitle' /></h3>
        {heroButton}
      </div>
      <div className={style.sectionHeroRight}>
        <img src={cover} alt='Picture of a girl drawing' />
      </div>

    </section>
  )
}

export default SectionHero;