import { FormattedMessage } from 'react-intl';
import style from './LandingPage.module.css';
import fontimg from './images/categories/fonts.png';
import webthemes from './images/categories/webthemes.png';
import uikits from './images/categories/uikits.png';
import illustrations from './images/categories/illustrations.png';
import mockups from './images/categories/mockups.png';

const SectionTrendingCategories = () => {
  const categories = [
    {
      label: 'Fonts',
      cover: fontimg,
    },
    {
      label: 'Web Themes',
      cover: webthemes,
    },
    {
      label: 'UI Kits',
      cover: uikits,
    },
    {
      label: 'Illustrations',
      cover: illustrations,
    },
    {
      label: 'Mockups',
      cover: mockups,
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
            <div key={cate.label} className={style.categoryCard}>
              <img
                src={cate.cover}
                className={style.categoryCardCover}
                alt={cate.label}
              />
              <div className={style.categoryCardTitle}>{cate.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionTrendingCategories;
