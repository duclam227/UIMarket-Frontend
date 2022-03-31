import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, IntlShape, injectIntl } from "react-intl";
import JsxParser from "react-jsx-parser";
import { Button, Modal } from "react-bootstrap";

import { customer, voteStatus } from "../../app/util/interfaces";

import questionAPI from "../../api/question";

import { ThreeDotMenu } from '../../components';
import SectionQuestionVoter from "./SectionQuestionVoter";
import SectionBountyHeader from "./SectionBountyHeader";

import style from './Question.module.css';

interface QuestionProps {
  question: any;
  currentUser: customer | null;
  intl: IntlShape;
}

const Question: FC<QuestionProps> = (props) => {
  const { question, currentUser, intl } = props;
  const navigate = useNavigate();

  const [voteStatus, setVoteStatus] = useState<voteStatus>(question.voteStatus || null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isUserAuthenticated = !!currentUser;
  const isCurrentUserAuthor = isUserAuthenticated && currentUser.customerEmail === question.userId.customerEmail;

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

  const editQuestion = () => {
    navigate('edit');
  }

  const deleteQuestion = () => {
    setIsModalOpen(true);
  }

  const menuItems = [
    {
      key: 'edit',
      label: intl.formatMessage({ id: 'Question.editLabel' }),
      function: editQuestion
    },
    {
      key: 'delete',
      label: intl.formatMessage({ id: 'Question.deleteLabel' }),
      function: deleteQuestion
    },
  ]

  const confirmDeleteModal = (
    <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title><FormattedMessage id='Question.confirmDelete' /></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><FormattedMessage id='Question.confirmDeleteContent' /></p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalOpen(false)}><FormattedMessage id='Question.close' /></Button>
        <Button variant="primary" onClick={() => {
          questionAPI.deleteQuestion(question._id)
            .then(res => {
              navigate('/');
            })
            .catch(error => {
              console.log(error);
            })
        }}>
          <FormattedMessage id='Question.deleteLabel' />
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return (<div className={style.question}>
    {confirmDeleteModal}

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
          <FormattedMessage id="Question.askedBy" />
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
      {isCurrentUserAuthor &&
        <ThreeDotMenu menuItems={menuItems} />
      }
    </div>
  </div>
  )
}

export default injectIntl(Question);