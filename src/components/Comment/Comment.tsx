import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FormattedMessage, IntlShape, injectIntl } from "react-intl";
import JsxParser from "react-jsx-parser";
import parse from 'html-react-parser';
import { customer, voteStatus } from "../../app/util/interfaces";
import answerAPI from "../../api/answer";

import { Paginator, ThreeDotMenu } from "..";

import SectionEditComment from "./SectionEditComment";

import style from './Comment.module.css';
import commentAPI from "../../api/comment";

interface Props {
  answer: any;
  currentUser: customer | null;
  question: any;
  comment: any;
  intl: IntlShape
}

const Comment: FC<Props> = (props) => {
  const { answer, currentUser, question, comment, intl } = props;

  const [commentContent, setCommentContent] = useState<string>(comment.commentContent || '');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (!comment || !commentContent) {
    return null;
  }

  const isUserAuthenticated = !!currentUser;
  const isCurrentUserAuthor = isUserAuthenticated && currentUser.customerEmail === comment.userId.customerEmail;

  const editComment = () => {
    setIsEdit(true);
  }

  const handleSaveComment = (newContent: string) => {
    commentAPI.updateComment(newContent, comment._id)
      .then(res => {
        console.log(res);
        setCommentContent(newContent);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const deleteComment = () => {
    setIsModalOpen(true);
  }

  const menuItems = [
    {
      key: 'edit',
      label: intl.formatMessage({ id: 'Comment.editLabel' }),
      function: editComment
    },
    {
      key: 'delete',
      label: intl.formatMessage({ id: 'Comment.deleteLabel' }),
      function: deleteComment
    },
  ]

  const confirmDeleteModal = (
    <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title><FormattedMessage id='Comment.confirmDelete' /></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><FormattedMessage id='Comment.confirmDeleteContent' /></p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalOpen(false)}><FormattedMessage id='Comment.close' /></Button>
        <Button variant="primary" onClick={() => {
          commentAPI.deleteComment(comment._id)
            .then((res: any) => {
              setCommentContent('');
            })
            .catch(error => {
              console.log(error);
            })
        }}>
          <FormattedMessage id='Comment.deleteLabel' />
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return (
    <div className={style.comment}>
      {confirmDeleteModal}
      <div className={style.sideContent}>avt</div>
      <div className={style.content}>
        <div className={style.authorInfo}>
          {comment.userId.customerName}
          {isCurrentUserAuthor &&
            <ThreeDotMenu menuItems={menuItems} />
          }
        </div>
        {isEdit
          ? <SectionEditComment
            initialValue={commentContent}
            onHide={() => setIsEdit(false)}
            onSave={(content: string) => handleSaveComment(content)}
          />
          : commentContent
        }
      </div>
    </div>
  )
}

export default injectIntl(Comment);