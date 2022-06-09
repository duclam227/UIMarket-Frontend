import { useEffect, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import questionAPI from '../../api/question';
import { navbarBranches } from '../../app/util/config';
import { PageWithNavbar, Paginator } from '../../components';

import style from './TagListPage.module.css';

const ITEMS_PER_PAGE = 15;

const TagListPage = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<Array<any> | null>(null);

  const renderTag = (tag: any) => {
    return (
      <div key={tag._id} className={style.tagItem}>
        <div className={style.tagName}>
          <Link to={`/questions/tag/${tag.tagName}`}>
            <Badge pill>
              {tag.tagName}
            </Badge>
          </Link>
        </div>
        <div className={style.tagNumber}>
          <FormattedMessage id='TagListPage.numberOfQuestions' values={{ count: tag.totalQuestion }} />
        </div>
      </div>
    )
  }

  useEffect(() => {
    setIsLoading(true)
    questionAPI.getTagListByPage(1, ITEMS_PER_PAGE)
      .then((res: any) => {
        setTags([...res]);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <PageWithNavbar branch={navbarBranches.question}>
      <div className={style.wrapper}>
        {isLoading
          ? <Spinner animation='border' />
          : <div className={style.container}>
            {tags && tags.length > 0
              ? tags.map((tag: any) => renderTag(tag))
              : null
            }
          </div>
        }
      </div>
    </PageWithNavbar>
  )
};

export default TagListPage;