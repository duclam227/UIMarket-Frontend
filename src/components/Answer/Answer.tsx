import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FormattedMessage, IntlShape, injectIntl } from "react-intl";
import JsxParser from "react-jsx-parser";
import { customer, voteStatus } from "../../app/util/interfaces";
import answerAPI from "../../api/answer";

import { Paginator, ThreeDotMenu } from "../../components";

import SectionAnswerVoter from "./SectionAnswerVoter";
import SectionEditAnswer from "./SectionEditAnswer";

import style from './Answer.module.css';
import commentAPI from "../../api/comment";

interface SectionAnswerProps {
  answer: any;
  currentUser: customer | null;
  question: any;
  intl: IntlShape
}

const Answer: FC<SectionAnswerProps> = (props) => {
  const { answer, currentUser, question, intl } = props;

  const [answerContent, setAnswerContent] = useState<string>(answer.answerContent || '');
  const [isReply, setIsReply] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [reply, setReply] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    commentAPI.getAllComments(answer._id)
      .then((res: any) => {
        console.log(res);
      })
  }, [])

  if (!answer || !answerContent) {
    return null;
  }

  const isUserAuthenticated = !!currentUser;
  const isCurrentUserAuthor = isUserAuthenticated && currentUser.customerEmail === answer.customerInfo[0].customerEmail;

  const turnOnReply = () => {
    setIsReply(true);
  }

  const handleChange = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    setReply(input.value);
  }

  const addReply = () => {
    commentAPI.addNewComment(reply, question._id, answer._id, 'Answer')
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const editAnswer = () => {
    setIsEdit(true);
  }

  const handleSaveAnswer = (newContent: string) => {
    answerAPI.updateAnswer(newContent, answer._id)
      .then(res => {
        console.log(res);
        setAnswerContent(newContent);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const deleteAnswer = () => {
    setIsModalOpen(true);
  }

  const menuItems = [
    {
      key: 'edit',
      label: intl.formatMessage({ id: 'Answer.editLabel' }),
      function: editAnswer
    },
    {
      key: 'delete',
      label: intl.formatMessage({ id: 'Answer.deleteLabel' }),
      function: deleteAnswer
    },
  ]

  const confirmDeleteModal = (
    <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title><FormattedMessage id='Answer.confirmDelete' /></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><FormattedMessage id='Answer.confirmDeleteContent' /></p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalOpen(false)}><FormattedMessage id='Answer.close' /></Button>
        <Button variant="primary" onClick={() => {
          answerAPI.deleteAnswer(answer._id)
            .then((res: any) => {
              setAnswerContent('');
            })
            .catch(error => {
              console.log(error);
            })
        }}>
          <FormattedMessage id='Answer.deleteLabel' />
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return (
    <div className={style.answer}>
      {confirmDeleteModal}
      <div className={style.sideContent}>avt</div>
      <div className={style.content}>
        <div className={style.authorInfo}>
          {answer.customerInfo[0].customerName}
          {isCurrentUserAuthor &&
            <ThreeDotMenu menuItems={menuItems} />
          }
        </div>
        {isEdit
          ? <SectionEditAnswer
            initialValue={answerContent}
            onHide={() => setIsEdit(false)}
            onSave={(content: string) => handleSaveAnswer(content)}
          />
          : <>
            <JsxParser jsx={answerContent} />
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
          </>
        }

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

export default injectIntl(Answer);