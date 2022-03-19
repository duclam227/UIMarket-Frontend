import { FC, useState } from "react";
import { FormattedMessage } from "react-intl";
import JsxParser from "react-jsx-parser";
import { customer } from "../../app/util/interfaces";
import { Paginator } from "../../components";

import style from './SectionAnswers.module.css';
import SectionAnswerVoter from "./SectionAnswerVoter";

interface SectionAnswersProps {
  answerList: Array<any>;
  currentUser: customer | null;
  question: any;
}

const SectionAnswers: FC<SectionAnswersProps> = (props) => {
  const { answerList, currentUser, question } = props;

  if (!answerList.length) {
    return null;
  }

  const renderAnswers = () => {
    return answerList.map(a => {
      return (
        <div className={style.answer}>
          <div className={style.sideContent}>avt</div>
          <div className={style.content}>
            <div className={style.authorInfo}>
              {a.customerInfo[0].customerName}
            </div>
            <JsxParser jsx={a.answerContent} />
            <SectionAnswerVoter
              answer={a}
              question={question}
              voteStatus={a.voteStatus}
              currentUser={currentUser}
              handleVoteStatus={() => { }}
            />
          </div>
        </div>
      )
    })
  }

  return (
    <div className={style.answerContainer}>
      {renderAnswers()}
    </div>
  )
}

export default SectionAnswers;