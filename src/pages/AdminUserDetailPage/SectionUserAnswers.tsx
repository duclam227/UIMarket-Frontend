import React, { FC, useEffect } from "react";

import { FormattedDate, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import style from './AdminUserDetailPage.module.css';

interface IProps {
  answers: any;
}

const SectionUserAnswers: FC<IProps> = (props) => {
  const { answers } = props;

  return (
    <>
      <h2><FormattedMessage id='AdminUserDetailPage.AnswersLabel' /></h2>
      {
        answers && answers.length > 0
          ? answers.map((answer: any) => {
            return (
              <div className={style.question} key={answer._id}>
                <Link to={`/question/${answer.questionId._id}`}>
                  {answer.questionId.questionTitle}
                </Link>
                <div className={style.qDate}>
                  <span><FormattedMessage id='AdminUserDetailPage.totalUpvote'
                    values={{ count: answer.totalUpvote }}
                  /></span>
                </div>
              </div>
            )
          })
          : <FormattedMessage id='AdminUserDetailPage.NoAnswers' />
      }
    </>
  )
}

export default SectionUserAnswers;