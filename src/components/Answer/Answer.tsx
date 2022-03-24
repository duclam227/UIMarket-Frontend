import { ChangeEvent, FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { FormattedMessage } from "react-intl";
import JsxParser from "react-jsx-parser";
import { customer, voteStatus } from "../../app/util/interfaces";
import { Paginator } from "../../components";

import SectionAnswerVoter from "./SectionAnswerVoter";

import style from './Answer.module.css';
import answerAPI from "../../api/answer";

interface SectionAnswerProps {
  answer: any;
  currentUser: customer | null;
  question: any;
}

const SectionAnswer: FC<SectionAnswerProps> = (props) => {
  const { answer, currentUser, question } = props;

  const [isReply, setIsReply] = useState<boolean>(false);
  const [reply, setReply] = useState<string>('');

  if (!answer) {
    return null;
  }

  const turnOnReply = () => {
    setIsReply(true);
  }

  const handleChange = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    setReply(input.value);
  }

  const addReply = () => {
    answerAPI.addNewComment(reply, answer._id)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className={style.answer}>
      <div className={style.sideContent}>avt</div>
      <div className={style.content}>
        <div className={style.authorInfo}>
          {answer.customerInfo[0].customerName}
        </div>
        <JsxParser jsx={answer.answerContent} />
        <div className={style.footerContent}>
          <SectionAnswerVoter
            answer={answer}
            question={question}
            currentUser={currentUser}
            handleVoteStatus={() => { }}
          />
          {currentUser?.customerEmail
            ? <div className={style.replyButton} onClick={turnOnReply}>Reply</div>
            : null
          }
        </div>
        {isReply &&
          <Form>
            <Form.Group>
              <Form.Control type='textarea' onChange={(e) => handleChange(e as any)} />
            </Form.Group>

            <Button
              className={style.addCommentButton}
              variant="primary"
              type="button"
              onClick={addReply}
            >
              Reply
            </Button>
          </Form>
        }
      </div>
    </div>
  )
}

export default SectionAnswer;