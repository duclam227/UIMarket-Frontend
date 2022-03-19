import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import questionAPI from "../../api/question";
import { getErrorMessage } from "../../app/util";

import { State } from "../../redux/store";

import { PageWithNavbar } from "../../components";
import SectionAddComment from "./SectionAddComment";
import SectionQuestion from "./SectionQuestion";

import style from './ViewQuestionPage.module.css';

const ViewQuestionPage = () => {
  const { id } = useParams();
  const questionId = id || '';

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [question, setQuestion] = useState<any>({});

  const currentUser = useSelector((state: State) => state.auth.user);

  useEffect(() => {
    questionAPI.getQuestionById(questionId)
      .then((res: any) => {
        setQuestion({ ...res._doc });
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
          : question &&
          <div className={style.content}>
            <SectionQuestion question={question} />
            <SectionAddComment currentUser={currentUser} />
          </div>
        }
      </div>
    </PageWithNavbar>
  )
}

export default ViewQuestionPage;