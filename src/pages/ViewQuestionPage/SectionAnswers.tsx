import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { FormattedMessage } from "react-intl";
import JsxParser from "react-jsx-parser";
import { customer, voteStatus } from "../../app/util/interfaces";
import { Answer, Paginator } from "../../components";
import SectionAddAnswer from "./SectionAddAnswer";

interface SectionAnswersProps {
  answerList: Array<any>;
  currentUser: customer | null;
  question: any;
  markBestAnswer: Function;
}

const SectionAnswers: FC<SectionAnswersProps> = (props) => {
  const { answerList, currentUser, question } = props;

  if (!answerList.length) {
    return null;
  }

  const renderAnswers = () => {
    return answerList.map(a => {
      return (
        <Answer
          key={a._id}
          currentUser={currentUser}
          question={question}
          answer={a}
          handleMarkBestAnswer={props.markBestAnswer}
        />
      )
    })
  }

  return (
    <div>
      {renderAnswers()}
    </div>
  )
}

export default SectionAnswers;