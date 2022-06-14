import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl';
import JsxParser from 'react-jsx-parser';
import parse from 'html-react-parser';
import { customer, voteStatus } from '../../app/util/interfaces';
import { errors as errorCodes } from '../../app/util/errors';
import answerAPI from '../../api/answer';

import { Paginator, ReportModal, ThreeDotMenu } from '..';

import SectionEditComment from './SectionEditComment';

import style from './Comment.module.css';
import commentAPI from '../../api/comment';
import UserAvatar from '../common/UserAvatar/UserAvatar';
import { getErrorMessage } from '../../app/util';
import { Link } from 'react-router-dom';

interface Props {
  answer: any;
  currentUser: customer | null;
  question: any;
  comment: any;
  intl: IntlShape;
}

const Comment: FC<Props> = props => {
  const { answer, currentUser, question, comment, intl } = props;

  const [commentContent, setCommentContent] = useState<string>(
    comment.commentContent || '',
  );
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const handleShowReportModal = () => {
    setShowReportModal(true);
  };
  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  if (!comment || !commentContent) {
    return null;
  }

  const isUserAuthenticated = !!currentUser;
  const isCurrentUserAuthor =
    isUserAuthenticated && currentUser.customerEmail === comment.userId.customerEmail;

  const editComment = () => {
    setIsEdit(true);
  };

  const handleSaveComment = (newContent: string) => {
    commentAPI
      .updateComment(newContent, comment._id)
      .then(res => {
        setCommentContent(newContent);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.comment[errorMsg as keyof typeof errorCodes.comment];
        toast.error(intl.formatMessage({ id: `Comment.${errorCode}` }));
      });
  };

  const deleteComment = () => {
    setIsModalOpen(true);
  };

  const authorMenuItems = [
    {
      key: 'edit',
      label: intl.formatMessage({ id: 'Comment.editLabel' }),
      function: editComment,
    },
    {
      key: 'delete',
      label: intl.formatMessage({ id: 'Comment.deleteLabel' }),
      function: deleteComment,
    },
  ];
  const reportMenuItem = {
    key: 'report',
    label: intl.formatMessage({ id: 'Answer.reportLabel' }),
    function: handleShowReportModal,
  };
  const menuItems = isCurrentUserAuthor
    ? [reportMenuItem, ...authorMenuItems]
    : [reportMenuItem];

  const confirmDeleteModal = (
    <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="Comment.confirmDelete" />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          <FormattedMessage id="Comment.confirmDeleteContent" />
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
          <FormattedMessage id="Comment.close" />
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            commentAPI
              .deleteComment(comment._id)
              .then((res: any) => {
                setCommentContent('');
              })
              .catch(error => {
                const errorMsg = getErrorMessage(error);
                const errorCode: any = errorCodes.comment[errorMsg as keyof typeof errorCodes.comment];
                toast.error(intl.formatMessage({ id: `Comment.${errorCode}` }));
              });
          }}
        >
          <FormattedMessage id="Comment.deleteLabel" />
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className={style.comment}>
      {confirmDeleteModal}
      <div className={style.sideContent}>
        <UserAvatar image={comment.userId.customerAvatar} />
      </div>
      <div className={style.content}>
        <div className={style.authorInfo + "text-nowrap"}>
          <Link to={`/user/${comment.userId._id}`}>
            {comment.userId.customerName}
          </Link>
          <ThreeDotMenu menuItems={menuItems} />
        </div>
        {isEdit ? (
          <SectionEditComment
            initialValue={commentContent}
            onHide={() => setIsEdit(false)}
            onSave={(content: string) => handleSaveComment(content)}
          />
        ) : (
          commentContent
        )}
        <ReportModal
          show={showReportModal}
          onClose={handleCloseReportModal}
          reportObjectId={comment._id!}
          type="comment"
        />
      </div>
    </div>
  );
};

export default injectIntl(Comment);
