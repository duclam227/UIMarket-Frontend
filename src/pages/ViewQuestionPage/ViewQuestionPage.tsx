import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import questionAPI from "../../api/question";
import { getErrorMessage } from "../../app/util";

import { State } from "../../redux/store";

import { PageWithNavbar, Paginator, Question } from "../../components";
import SectionAddAnswer from "./SectionAddAnswer";

import style from './ViewQuestionPage.module.css';
import SectionAnswers from "./SectionAnswers";
import answerAPI from "../../api/answer";

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

  const currentUser = useSelector((state: State) => state.auth.user);

  useEffect(() => {
    const getAnswers = async () => {
      return answerAPI.getAnswersByPageNumber(1, ITEMS_PER_PAGE, id)
        .then((res: any) => {
          setAnswers([...res.answers])
          setTotalPages(res.totalPages);
          setCurrentPage(res.page);
          console.log(res);
        })
        .catch((error) => {
          const errorMsg = getErrorMessage(error);
          setError(errorMsg);
          setIsLoading(false);
        })
    }

    questionAPI.getQuestionById(questionId)
      .then((res: any) => {
        setQuestion({ ...res._doc });
        setIsLoading(false);

        getAnswers()
          .then((res) => {

          })
      })
      .catch((error) => {
        const errorMsg = getErrorMessage(error);
        setError(errorMsg);
        setIsLoading(false);
      })
  }, [])

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
    const customerInfo = [
      {
        customerEmail: answer.userId.customerEmail,
        customerName: answer.userId.customerName,
      }
    ]
    answer.customerInfo = [...customerInfo];
    setAnswers([...answers, answer]);
  }

  return (
    <PageWithNavbar>
      <div className={style.container}>
        {isLoading
          ? 'loading...'
          : question &&
          <div className={style.content}>
            <Question question={question} currentUser={currentUser} />
            {answers.length > 0 &&
              <>
                <h5 className={style.answersTitle}>Answers</h5>
                <SectionAnswers answerList={answers} currentUser={currentUser} question={question} />
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