import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FormattedMessage, IntlShape, injectIntl } from "react-intl";
import JsxParser from "react-jsx-parser";
import parse from 'html-react-parser';
import { customer, voteStatus } from "../../app/util/interfaces";
import answerAPI from "../../api/answer";

import { Paginator, ThreeDotMenu, Comment } from "../../components";

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
  const [comments, setComments] = useState<any>(null);
  const [commentPage, setCommentPage] = useState<number>(1);
  const [commentTotalPages, setCommentTotalPages] = useState<number>(1);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [reply, setReply] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    commentAPI.getCommentsByPageNumber(answer._id, 1, 2)
      .then((res: any) => {
        setComments(res.comments);
        setCommentPage(res.page);
        setCommentTotalPages(res.totalPages);
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
        setIsReply(false);
        if (comments.length === 0) {
          getMoreComments(1);
        }
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

  const getMoreComments = (pageNumber: number) => {
    commentAPI.getCommentsByPageNumber(answer._id, pageNumber, 2)
      .then((res: any) => {
        setComments([...comments, ...res.comments]);
        setCommentPage(res.page);
        setCommentTotalPages(res.totalPages);
      })
  }

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
            {parse(answerContent)}

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

            {
              comments
                ? <div className={style.sectionComments}>
                  {comments.map((c: any) => <Comment
                    key={c._id}
                    question={question}
                    answer={answer}
                    comment={c}
                    currentUser={currentUser}
                  />)}
                  {commentTotalPages > commentPage ?
                    <div className={style.showMoreComments}>
                      <span onClick={() => getMoreComments(commentPage + 1)}>Show more...</span>
                    </div>
                    : null
                  }
                </div>
                : null
            }
          </>
        }

        {isReply &&
          <Form className={style.addCommentWrapper}>
            <Form.Group>
              <Form.Control type='textarea' onChange={(e) => handleChange(e as any)} />
            </Form.Group>
            <div className={style.editFooter}>
              <Button
                className={style.addCommentButton}
                variant="primary"
                type="button"
                onClick={() => setIsReply(false)}
              >
                Cancel
              </Button>
              <Button
                className={style.addCommentButton}
                variant="primary"
                type="button"
                onClick={addReply}
              >
                Reply
              </Button>
            </div>
          </Form>
        }
      </div>
    </div >
  )
}

export default injectIntl(Answer);