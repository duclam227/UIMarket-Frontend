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
    ? <button className={style.sectionHeroButton}>Explore</button>
    : <Link to='/signup'><button className={style.sectionHeroButton}>Create an account</button></Link>;

  return (
    <section className={style.sectionHero}>
      <div className={style.sectionHeroLeft}>
        <h1 className={style.sectionHeroTitle}>Accelerate your workflow with ready-to-use design resources.</h1>
        <h3 className={style.sectionHeroSubtitle}>Find creative works that you’ll love and use.</h3>
        {heroButton}
      </div>
      <div className={style.sectionHeroRight}>
        <img src={cover} alt='Picture of a girl drawing' />
      </div>

    </section>
  )
}

export default SectionHero;