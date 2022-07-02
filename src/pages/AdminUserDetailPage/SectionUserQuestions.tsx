import React, { FC, useEffect } from "react";

import { FormattedDate, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import style from './AdminUserDetailPage.module.css';

interface IProps {
  questions: any;
}

const SectionUserQuestions: FC<IProps> = (props) => {
  const { questions } = props;

  return (
    <>
      <h2><FormattedMessage id='AdminUserDetailPage.QuestionsLabel' /></h2>
      {
        questions && questions.length > 0
          ? questions.map((question: any) => {
            return (
              <div className={style.question} key={question._id}>
                <Link to={`/question/${question._id}`}>
                  {question.questionTitle}
                </Link>
                <div className={style.qDate}>
                  <span><FormattedMessage id='AdminUserDetailPage.createdOn' /></span>
                  <span><FormattedDate value={question.createdDate} /></span>
                </div>
              </div>
            )
          })
          : <FormattedMessage id='AdminUserDetailPage.NoQuestions' />
      }
    </>
  )
}

export default SectionUserQuestions;