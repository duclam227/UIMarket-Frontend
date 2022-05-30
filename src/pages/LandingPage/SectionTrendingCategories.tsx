import { FormattedMessage } from 'react-intl';
import style from './LandingPage.module.css';

const SectionTrendingCategories = () => {
  const categories = [
    {
      label: 'One',
      cover:
        'https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/273521795_2145114342303326_7930307173132119773_n.jpg?_nc_cat=107&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=i2GLBCzWWIEAX_EL5-h&tn=i3yw3qEmSJxwXx1f&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT-fj32SEee5N48EKY_QyoBPYtbsK_ahf4JcaIq7-0bkDQ&oe=62813B51',
    },
    {
      label: 'Two',
      cover:
        'https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/273521795_2145114342303326_7930307173132119773_n.jpg?_nc_cat=107&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=i2GLBCzWWIEAX_EL5-h&tn=i3yw3qEmSJxwXx1f&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT-fj32SEee5N48EKY_QyoBPYtbsK_ahf4JcaIq7-0bkDQ&oe=62813B51',
    },
    {
      label: 'Three',
      cover:
        'https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/273521795_2145114342303326_7930307173132119773_n.jpg?_nc_cat=107&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=i2GLBCzWWIEAX_EL5-h&tn=i3yw3qEmSJxwXx1f&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT-fj32SEee5N48EKY_QyoBPYtbsK_ahf4JcaIq7-0bkDQ&oe=62813B51',
    },
    {
      label: 'Four',
      cover:
        'https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/273521795_2145114342303326_7930307173132119773_n.jpg?_nc_cat=107&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=i2GLBCzWWIEAX_EL5-h&tn=i3yw3qEmSJxwXx1f&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT-fj32SEee5N48EKY_QyoBPYtbsK_ahf4JcaIq7-0bkDQ&oe=62813B51',
    },
    {
      label: 'Five',
      cover:
        'https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/273521795_2145114342303326_7930307173132119773_n.jpg?_nc_cat=107&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=i2GLBCzWWIEAX_EL5-h&tn=i3yw3qEmSJxwXx1f&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT-fj32SEee5N48EKY_QyoBPYtbsK_ahf4JcaIq7-0bkDQ&oe=62813B51',
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
              <img src={cate.cover} className={style.categoryCardCover} />
              <div className={style.categoryCardTitle}>{cate.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionTrendingCategories;
