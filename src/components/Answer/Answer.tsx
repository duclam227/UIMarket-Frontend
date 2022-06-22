import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';
import parse from 'html-react-parser';

import { customer, voteStatus } from '../../app/util/interfaces';
import { errors as errorCodes } from '../../app/util/errors';
import { getErrorMessage } from '../../app/util';

import { Paginator, ThreeDotMenu, Comment, ReportModal } from '../../components';

import answerAPI from '../../api/answer';
import commentAPI from '../../api/comment';

import { FaCheck } from 'react-icons/fa';

import SectionAnswerVoter from './SectionAnswerVoter';
import SectionEditAnswer from './SectionEditAnswer';
import UserAvatar from '../common/UserAvatar/UserAvatar';

import style from './Answer.module.css';
import { Link } from 'react-router-dom';

interface SectionAnswerProps {
  answer: any;
  currentUser: customer | null;
  question: any;
  handleMarkBestAnswer: Function;
  intl: IntlShape;
}

const Answer: FC<SectionAnswerProps> = props => {
  const { answer, currentUser, question, intl } = props;

  const [answerContent, setAnswerContent] = useState<string>(answer.answerContent || '');
  const [comments, setComments] = useState<any>(null);
  const [commentPage, setCommentPage] = useState<number>(1);
  const [commentTotalPages, setCommentTotalPages] = useState<number>(1);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [reply, setReply] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [isReload, setIsReload] = useState<boolean>(false);

  const handleShowReportModal = () => {
    setShowReportModal(true);
  };
  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  useEffect(() => {
    commentAPI.getCommentsByPageNumber(answer._id, 1, 2).then((res: any) => {
      setComments(res.comments);
      setCommentPage(res.page);
      setCommentTotalPages(res.totalPages);
    });
  }, [isReload]);

  if (!answer || !answerContent) {
    return null;
  }

  const isUserAuthenticated = !!currentUser;
  const isCurrentUserAuthor =
    isUserAuthenticated &&
    currentUser.customerEmail === answer.customerInfo[0].customerEmail;

  const turnOnReply = () => {
    setIsReply(true);
  };

  const handleChange = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    setReply(input.value);
  };

  const addReply = () => {
    commentAPI
      .addNewComment(reply, question._id, answer._id, 'Answer')
      .then(res => {
        setIsReload(!isReload);
        setIsReply(false);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.answer[errorMsg as keyof typeof errorCodes.answer];
        toast.error(intl.formatMessage({ id: `Answer.${errorCode}` }));
      });
  };

  const editAnswer = () => {
    setIsEdit(true);
  };

  const handleSaveAnswer = (newContent: string) => {
    answerAPI
      .updateAnswer(newContent, answer._id)
      .then(res => {
        setAnswerContent(newContent);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.answer[errorMsg as keyof typeof errorCodes.answer];
        toast.error(intl.formatMessage({ id: `Answer.${errorCode}` }))
      });
  };

  const deleteAnswer = () => {
    setIsModalOpen(true);
  };

  const authorMenuItems = [
    {
      key: 'edit',
      label: intl.formatMessage({ id: 'Answer.editLabel' }),
      function: editAnswer,
    },
    {
      key: 'delete',
      label: intl.formatMessage({ id: 'Answer.deleteLabel' }),
      function: deleteAnswer,
    },
  ];
  const reportMenuItem = {
    key: 'report',
    label: intl.formatMessage({ id: 'Answer.reportLabel' }),
    function: handleShowReportModal,
  };
  const menuItems = isCurrentUserAuthor ? authorMenuItems : [reportMenuItem];
  const confirmDeleteModal = (
    <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="Answer.confirmDelete" />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          <FormattedMessage id="Answer.confirmDeleteContent" />
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
          <FormattedMessage id="Answer.close" />
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            answerAPI
              .deleteAnswer(answer._id)
              .then((res: any) => {
                setAnswerContent('');
              })
              .catch(error => {
                const errorMsg = getErrorMessage(error);
                const errorCode: any = errorCodes.answer[errorMsg as keyof typeof errorCodes.answer];
                toast.error(intl.formatMessage({ id: `Answer.${errorCode}` }))
              });
          }}
        >
          <FormattedMessage id="Answer.deleteLabel" />
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const getMoreComments = (pageNumber: number) => {
    commentAPI.getCommentsByPageNumber(answer._id, pageNumber, 2).then((res: any) => {
      setComments([...comments, ...res.comments]);
      setCommentPage(res.page);
      setCommentTotalPages(res.totalPages);
    });
  };

  const markBestAnswer = () => {
    if (isCurrentUserAuthor) {
      return;
    }

    answerAPI
      .markBestAnswer(question._id, answer._id)
      .then((res: any) => {
        props.handleMarkBestAnswer();
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.answer[errorMsg as keyof typeof errorCodes.answer];
        toast.error(intl.formatMessage({ id: `Answer.${errorCode}` }))
      });
  };

  const bestAnswerIcon = (
    <FaCheck
      className={answer.bestAnswer ? style.bestAnswerActive : style.bestAnswer}
      onClick={markBestAnswer}
    />
  );

  return (
    <div className={style.answer}>
      {confirmDeleteModal}
      <div className={style.sideContent}>
        <UserAvatar image={answer.customerInfo[0].customerAvatar} />
        {isCurrentUserAuthor
          ? <div className={style.markBestAnswer}>{bestAnswerIcon}</div>
          : null
        }
      </div>
      <div className={style.content}>
        <div className={style.authorInfo + " text-nowrap"}>
          <Link to={`/user/${answer.customerInfo[0]._id}`}>
            {answer.customerInfo[0].customerName}
          </Link>
          <ThreeDotMenu menuItems={menuItems} />
        </div>
        {isEdit ? (
          <SectionEditAnswer
            initialValue={answerContent}
            onHide={() => setIsEdit(false)}
            onSave={(content: string) => handleSaveAnswer(content)}
          />
        ) : (
          <>
            {parse(answerContent)}

            <div className={style.footerContent}>
              <SectionAnswerVoter
                answer={answer}
                question={question}
                currentUser={currentUser}
                handleVoteStatus={() => { }}
              />
              {currentUser?.customerEmail ? (
                <div className={style.replyButton} onClick={turnOnReply}>
                  Reply
                </div>
              ) : null}
            </div>

            {comments ? (
              <div className={style.sectionComments}>
                {comments.map((c: any) => (
                  <Comment
                    key={c._id}
                    question={question}
                    answer={answer}
                    comment={c}
                    currentUser={currentUser}
                  />
                ))}
                {commentTotalPages > commentPage ? (
                  <div className={style.showMoreComments}>
                    <span onClick={() => getMoreComments(commentPage + 1)}>
                      Show more...
                    </span>
                  </div>
                ) : null}
              </div>
            ) : null}
          </>
        )}

        {isReply && (
          <Form className={style.addCommentWrapper}>
            <Form.Group>
              <Form.Control type="textarea" onChange={e => handleChange(e as any)} />
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
        )}
        <ReportModal
          show={showReportModal}
          onClose={handleCloseReportModal}
          reportObjectId={answer._id!}
          type="answer"
        />
      </div>
    </div>
  );
};

export default injectIntl(Answer);
