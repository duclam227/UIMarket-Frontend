import React, { useEffect, useState } from 'react';
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl';
import { useNavigate, useSearchParams } from 'react-router-dom';
import questionAPI from '../../api/question';
import { navbarBranches } from '../../app/util/config';
import { question } from '../../app/util/interfaces';
import { PageWithNavbar, Paginator, QuestionList } from '../../components';
import { SearchForm } from '../../forms';

import style from './SearchQuestionsPage.module.css';

const ITEM_LIMIT = 10;

interface IProps {
  intl: IntlShape;
}

const SearchQuestionsPage: React.FC<IProps> = (props) => {
  const { intl } = props;
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Array<question> | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('title');
  const decodedKeyword = decodeURI(keyword!);

  const searchPlaceholderMessage = intl.formatMessage({ id: 'SearchQuestionsPage.searchPlaceholder' })

  const handleSearch = (keyword: string) => {
    const encodedKeyword = encodeURIComponent(keyword);
    navigate('/questions/search?title=' + encodedKeyword);
  }

  const goToPage = (pageNumber: number) => {
    questionAPI
      .getQuestionsByTitle(encodeURI(keyword!)!, pageNumber, ITEM_LIMIT)
      .then((res: any) => {
        const { totalPages, questions, page } = res;
        setPage(page);
        setQuestions(questions);
        setTotalPages(totalPages);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (keyword) {
      questionAPI.getQuestionsByTitle(encodeURI(keyword!)!, page, ITEM_LIMIT)
        .then((res: any) => {
          if (res.questions.length > 0) {
            setQuestions(res.questions);
            setPage(res.page)
            setTotalPages(res.totalPages);
          } else {
            setQuestions([]);
            setPage(1);
            setTotalPages(0);
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }, [keyword])

  return (
    <PageWithNavbar branch={navbarBranches.question}>
      <div className={style.wrapper}>
        <div className={style.content}>
          <SearchForm
            className={style.searchWrapper}
            placeholder={searchPlaceholderMessage}
            initialValue={keyword ? decodedKeyword : null}
            handleSubmit={(keyword: string) => handleSearch(keyword)}
          />

          <div className={style.questionsContainer}>
            {questions && questions.length > 0
              ? <>
                <QuestionList questionsList={questions} />
                <Paginator
                  totalNumberOfPages={totalPages}
                  currentPage={page}
                  handleClickGoToPage={(number: number) => goToPage(number)}
                />
              </>
              : questions && questions.length === 0
                ? <h3><FormattedMessage id='SearchQuestionsPage.noResult' /></h3>
                : null
            }


          </div>
        </div>
      </div>
    </PageWithNavbar>
  )
}

export default injectIntl(SearchQuestionsPage);