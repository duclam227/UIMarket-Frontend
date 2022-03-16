import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams, useSearchParams } from "react-router-dom";
import questionAPI from "../../api/question";
import { getErrorMessage } from "../../app/util";

import { PageWithNavbar } from "../../components";

import style from './ViewQuestionPage.module.css';

const ViewQuestionPage = () => {
  const { id } = useParams();
  const questionId = id || '';

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [question, setQuestion] = useState<any>({});

  useEffect(() => {
    questionAPI.getQuestionById(questionId)
      .then((res: any) => {
        setQuestion({ ...res.question })
        console.log(res.question);

        setIsLoading(false);
      })
      .catch((error) => {
        const errorMsg = getErrorMessage(error);
        setError(errorMsg);
        setIsLoading(false);
      })
  }, [])

  return (
    <PageWithNavbar>
      <div className={style.container}>
        {isLoading
          ? 'loading...'
          : question && <div className={style.content}>
            <div className={style.question}>
              <h1 className={style.title}>{question.questionTitle}</h1>
              <div className={style.moreInfo}>
                <div className={style.authorInfo}>
                  <FormattedMessage id="ViewQuestionPage.askedBy" />
                  <img src="/" alt="avt" />
                  <span>{question.userId.customerName}</span>
                </div>
              </div>
            </div>

          </div>
        }
      </div>
    </PageWithNavbar>
  )
}

export default ViewQuestionPage;