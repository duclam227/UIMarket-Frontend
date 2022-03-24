import { FC, useState } from "react";
import { FormattedMessage } from "react-intl";
import JsxParser from "react-jsx-parser";

import { customer, voteStatus } from "../../app/util/interfaces";
import SectionQuestionVoter from "./SectionQuestionVoter";

import style from './Question.module.css';
import SectionBountyHeader from "./SectionBountyHeader";

interface QuestionProps {
  question: any;
  currentUser: customer | null;
}

const Question: FC<QuestionProps> = (props) => {
  const { question, currentUser } = props;
  const [voteStatus, setVoteStatus] = useState<voteStatus>(question.voteStatus || null);

  const renderTags = (tags: Array<any>) => {
    if (tags.length < 1) {
      return null;
    }

    const displayTag: Array<any> = tags.map(t => {
      return <div key={t.tagName} className={style.tag}>{t.tagName}</div>
    })

    return displayTag;
  }

  const changeVoteStatus = (newVoteStatus: voteStatus) => {
    setVoteStatus({ ...newVoteStatus });
  }

  return (
    <div className={style.question}>
      <SectionQuestionVoter
        question={question}
        voteStatus={voteStatus}
        currentUser={currentUser}
        handleVoteStatus={(newVoteStatus: voteStatus) => changeVoteStatus(newVoteStatus)}
      />
      <div className={style.questionContent}>
        <SectionBountyHeader question={question} />
        <h1 className={style.title}>{question.questionTitle}</h1>
        <div className={style.moreInfo}>
          <div className={style.authorInfo}>
            <FormattedMessage id="ViewQuestionPage.askedBy" />
            <img src="/" alt="avt" />
            <span>{question.userId.customerName}</span>
          </div>
        </div>
        <div className={style.content}>
          <JsxParser jsx={question.questionContent} />
        </div>
        {question.questionTag &&
          <div className={style.tagsContainer}>
            {renderTags(question.questionTag)}
          </div>
        }

      </div>
    </div>
  )
}

export default Question;