import { FC } from "react";
import { FormattedMessage } from "react-intl";
import JsxParser from "react-jsx-parser";

import SectionVoter from "./SectionVoter";

import style from './SectionQuestion.module.css';

interface QuestionProps {
  question: any;
}

const SectionQuestion: FC<QuestionProps> = (props) => {
  const { question } = props;

  const renderTags = (tags: Array<any>) => {
    if (tags.length < 1) {
      return null;
    }

    const displayTag: Array<any> = tags.map(t => {
      return <div key={t.tagName} className={style.tag}>{t.tagName}</div>
    })

    return displayTag;
  }

  return (
    <div className={style.question}>
      <SectionVoter numberOfDownvotes={question.totalDownvote} numberOfUpvotes={question.totalUpvote} />
      <div className={style.questionContent}>
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

export default SectionQuestion;