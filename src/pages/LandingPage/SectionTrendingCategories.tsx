import { FormattedMessage } from 'react-intl';
import style from './LandingPage.module.css';
import fontimg from './images/categories/fonts.png';
import webthemes from './images/categories/webthemes.png';
import uikits from './images/categories/uikits.png';
import illustrations from './images/categories/illustrations.png';
import mockups from './images/categories/mockups.png';
import { Link } from 'react-router-dom';

const SectionTrendingCategories = () => {
  const categories = [
    {
      label: 'Fonts',
      cover: fontimg,
      link: '/products/category/62a45a3951ca7e1703f0b70b',
    },
    {
      label: 'Web Themes',
      cover: webthemes,
      link: '/products/category/62a45a2551ca7e1703f0b6fe',
    },
    {
      label: 'UI Kits',
      cover: uikits,
      link: '/products/category/62a45a5751ca7e1703f0b711',
    },
    {
      label: 'Illustrations',
      cover: illustrations,
      link: '/products/category/62a45a4c51ca7e1703f0b70d',
    },
    {
      label: 'Mockups',
      cover: mockups,
      link: '/products/category/62a45a5151ca7e1703f0b70f',
    },
  ];

  return (
    <section className={style.sectionWrapper}>
      <div className={style.sectionFeaturedProducts}>
        <div className={style.sectionFeaturedProductsTitle}>
          <h4>
            <FormattedMessage
              id="LandingPage.trendingCategories"
              defaultMessage="Trending Categories"
            />
          </h4>
        </div>

        <div className={style.sectionTrendingCategoriesList}>
          {categories.map(cate => (
            <Link key={cate.label} to={cate.link} className={style.categoryCard}>
              <div>
                <img
                  src={cate.cover}
                  className={style.categoryCardCover}
                  alt={cate.label}
                />
                <div className={style.categoryCardTitle}>{cate.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionTrendingCategories;
