import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl';
import JsxParser from 'react-jsx-parser';
import parse from 'html-react-parser';
import { Button, Modal } from 'react-bootstrap';

import { customer, voteStatus } from '../../app/util/interfaces';
import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';

import questionAPI from '../../api/question';

import { ReportModal, ThreeDotMenu } from '../../components';
import SectionQuestionVoter from './SectionQuestionVoter';
import SectionBountyHeader from './SectionBountyHeader';
import UserAvatar from '../common/UserAvatar/UserAvatar';

import style from './Question.module.css';
import { toast } from 'react-toastify';

interface QuestionProps {
  question: any;
  currentUser: customer | null;
  intl: IntlShape;
}

const Question: FC<QuestionProps> = props => {
  const { question, currentUser, intl } = props;
  const navigate = useNavigate();

  const [voteStatus, setVoteStatus] = useState<voteStatus>(question.voteStatus || null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const handleShowReportModal = () => {
    setShowReportModal(true);
  };
  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  const isUserAuthenticated = !!currentUser;
  const isCurrentUserAuthor =
    isUserAuthenticated && currentUser.customerEmail === question.userId.customerEmail;

  const renderTags = (tags: Array<any>) => {
    if (tags.length < 1) {
      return null;
    }

    const displayTag: Array<any> = tags.map(t => {
      return (
        <div key={t.tagName} className={style.tag}>
          {t.tagName}
        </div>
      );
    });

    return displayTag;
  };

  const changeVoteStatus = (newVoteStatus: voteStatus) => {
    setVoteStatus({ ...newVoteStatus });
  };

  const editQuestion = () => {
    navigate('edit');
  };

  const deleteQuestion = () => {
    setIsModalOpen(true);
  };

  const authorMenuItems = [
    {
      key: 'edit',
      label: intl.formatMessage({ id: 'Question.editLabel' }),
      function: editQuestion,
    },
    {
      key: 'delete',
      label: intl.formatMessage({ id: 'Question.deleteLabel' }),
      function: deleteQuestion,
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
          <FormattedMessage id="Question.confirmDelete" />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          <FormattedMessage id="Question.confirmDeleteContent" />
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
          <FormattedMessage id="Question.close" />
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            questionAPI
              .deleteQuestion(question._id)
              .then(res => {
                navigate('/');
              })
              .catch(error => {
                const errorMsg = getErrorMessage(error);
                const errorCode: any = errorCodes.question[errorMsg as keyof typeof errorCodes.question];
                toast.error(intl.formatMessage({ id: `Question.${errorCode}` }));
              });
          }}
        >
          <FormattedMessage id="Question.deleteLabel" />
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className={style.question}>
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
            <div className="text-nowrap">
              <FormattedMessage id="Question.askedBy" />
            </div>
            <UserAvatar image={question.userId.customerAvatar} />
            <Link to={`/user/${question.userId._id}`} className="text-nowrap">
              {question.userId.customerName}
            </Link>
          </div>
        </div>
        <div className={style.content}>{parse(question.questionContent)}</div>
        {question.questionTag && (
          <div className={style.tagsContainer}>{renderTags(question.questionTag)}</div>
        )}
        <ThreeDotMenu menuItems={menuItems} />
        <ReportModal
          show={showReportModal}
          onClose={handleCloseReportModal}
          reportObjectId={question._id!}
          type="question"
        />
      </div>
    </div>
  );
};

export default injectIntl(Question);
