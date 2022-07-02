import { FC, useEffect, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Link } from 'react-router-dom';

import questionAPI from '../../api/question';
import { navbarBranches } from '../../app/util/config';
import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';

import { PageWithNavbar, Paginator } from '../../components';

import style from './TagListPage.module.css';

const ITEMS_PER_PAGE = 7;

interface IProps {
  intl: IntlShape;
}

const TagListPage: FC<IProps> = props => {
  const { intl } = props;
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<Array<any> | null>(null);

  const renderTag = (tag: any) => {
    return (
      <div key={tag._id} className={style.tagItem}>
        <div className={style.tagName}>
          <Link to={`/questions/tag/${tag.tagName}`}>
            <Badge pill>{tag.tagName}</Badge>
          </Link>
        </div>
        <div className={style.tagNumber}>
          <FormattedMessage
            id="TagListPage.numberOfQuestions"
            values={{ count: tag.totalQuestion }}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    setIsLoading(true);
    questionAPI
      .getTagListByPage(1, ITEMS_PER_PAGE)
      .then((res: any) => {
        const { tags, totalPages, page } = res;
        setCurrentPage(page);
        setTotalPages(totalPages);
        setTags([...tags]);
      })
      .catch(error => {
        console.log(error);
        const errorMsg = getErrorMessage(error);
        const errorCode: any =
          errorCodes.question[errorMsg as keyof typeof errorCodes.question];
        toast.error(intl.formatMessage({ id: `Question.${errorCode}` }));
      })
      .finally(() => setIsLoading(false));
  }, []);
  const goToPage = async (pageNumber: number) => {
    setIsLoading(true);
    questionAPI
      .getTagListByPage(pageNumber, ITEMS_PER_PAGE)
      .then((res: any) => {
        const { tags, totalPages, page } = res;
        setCurrentPage(page);
        setTotalPages(totalPages);
        setTags([...tags]);
      })
      .catch(error => {
        console.log(error);
        const errorMsg = getErrorMessage(error);
        const errorCode: any =
          errorCodes.question[errorMsg as keyof typeof errorCodes.question];
        toast.error(intl.formatMessage({ id: `Question.${errorCode}` }));
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <PageWithNavbar branch={navbarBranches.question}>
      <div className={style.wrapper}>
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <div className={style.container}>
            {tags && tags.length > 0 ? tags.map((tag: any) => renderTag(tag)) : null}
            <Paginator
              totalNumberOfPages={totalPages}
              currentPage={currentPage}
              handleClickGoToPage={(number: number) => goToPage(number)}
            />
          </div>
        )}
      </div>
    </PageWithNavbar>
  );
};

export default injectIntl(TagListPage);
