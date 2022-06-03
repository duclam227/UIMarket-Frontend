import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getErrorMessage } from "../../app/util";
import { State } from "../../redux/store";
import { PageWithNavbar, Paginator, Question } from "../../components";

import questionAPI from "../../api/question";
import answerAPI from "../../api/answer";

import SectionAddAnswer from "./SectionAddAnswer";
import SectionAnswers from "./SectionAnswers";

import style from './ViewQuestionPage.module.css';
import { navbarBranches } from "../../app/util/config";
import { Spinner } from "react-bootstrap";

const ITEMS_PER_PAGE = 10;

const ViewQuestionPage = () => {
  const { id } = useParams();
  const questionId = id || '';

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [question, setQuestion] = useState<any>({});
  const [answers, setAnswers] = useState<Array<any>>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isReload, setIsReload] = useState<boolean>(false);

  const currentUser = useSelector((state: State) => state.auth.user);

  useEffect(() => {
    const getAnswers = async () => {
      return answerAPI.getAnswersByPageNumber(1, ITEMS_PER_PAGE, id)
        .then((res: any) => {
          setAnswers([...res.answers])
          setTotalPages(res.totalPages);
          setCurrentPage(res.page);
        })
        .catch((error) => {
          const errorMsg = getErrorMessage(error);
          setError(errorMsg);
          setIsLoading(false);
        })
    }

    questionAPI.getQuestionById(questionId)
      .then((res: any) => {
        setQuestion({ ...res.question });
        setIsLoading(false);

        getAnswers();
      })
      .catch((error) => {
        const errorMsg = getErrorMessage(error);
        setError(errorMsg);
        setIsLoading(false);
      })
  }, [isReload])

  const goToPage = (page: number) => {
    answerAPI.getAnswersByPageNumber(page, ITEMS_PER_PAGE, id)
      .then((res: any) => {
        setAnswers([...res.answers])
        setTotalPages(res.totalPages);
        setCurrentPage(res.page);
      })
      .catch((error) => {
        const errorMsg = getErrorMessage(error);
        setError(errorMsg);
        setIsLoading(false);
      })
  }

  const addAnswer = (answer: any) => {
    setIsReload(!isReload);
  }

  return (
    <PageWithNavbar branch={navbarBranches.question}>
      <div className={style.container}>
        {isLoading
          ? <Spinner animation='border' />
          : question &&
          <div className={style.content}>
            <Question question={question} currentUser={currentUser} />
            {answers.length > 0 &&
              <>
                <h5 className={style.answersTitle}>Answers</h5>
                <SectionAnswers
                  answerList={answers}
                  currentUser={currentUser}
                  question={question}
                  markBestAnswer={() => {
                    goToPage(currentPage);
                  }}
                />
                <Paginator
                  totalNumberOfPages={totalPages}
                  currentPage={currentPage}
                  handleClickGoToPage={(number: number) => goToPage(number)}
                />
              </>
            }
            <SectionAddAnswer question={question} currentUser={currentUser} handleAddAnswer={(answer: any) => addAnswer(answer)} />
          </div>
        }
      </div>
    </PageWithNavbar>
  )
}

export default ViewQuestionPage;