import { FC } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';

import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { InfoCardContainer } from '../../../components';
import {
  ProfileStats,
  TagStat,
  GeneralQuestionInfo,
  GeneralAnswerInfo,
} from '../UserProfilePage';
import style from './UserActivityTab.module.css';
import QuestionItem from './QuestionItem';

interface Props {
  profileStats: null | ProfileStats;
  profileTagStats: null | TagStat[];
  profileTopQuestions: null | GeneralQuestionInfo[];
  profileBountiedQuestions: null | GeneralQuestionInfo[];
  profileTopAnswers: null | GeneralAnswerInfo[];
}

const UserActivityTab: FC<Props> = props => {
  const {
    profileStats,
    profileTagStats,
    profileTopQuestions,
    profileBountiedQuestions,
    profileTopAnswers,
  } = props;

  const statLabel = (
    <FormattedMessage id="UserActivityTab.statLabel" defaultMessage="Stats" />
  );
  const questionStatItemLabel = (
    <FormattedMessage
      id="UserActivityTab.questionStatItemLabel"
      defaultMessage="Questions"
    />
  );
  const answerStatItemLabel = (
    <FormattedMessage
      id="UserActivityTab.answerStatItemLabel"
      defaultMessage="Answers"
    />
  );
  const upvoteStatItemLabel = (
    <FormattedMessage
      id="UserActivityTab.upvoteStatItemLabel"
      defaultMessage="Upvotes"
    />
  );

  const pointStatItemLabel = (
    <FormattedMessage
      id="UserActivityTab.pointStatItemLabel"
    />
  );

  const tagsLabel = (
    <FormattedMessage id="UserActivityTab.tagsLabel" defaultMessage="Tags" />
  );
  const seeAllLinkLabel = (
    <FormattedMessage
      id="UserActivityTab.seeAllLinkLabel"
      defaultMessage="See all"
    />
  );
  const topAnswersLabel = (
    <FormattedMessage
      id="UserActivityTab.topAnswersLabel"
      defaultMessage="Top Answers"
    />
  );
  const topQuestionsLabel = (
    <FormattedMessage
      id="UserActivityTab.topQuestionsLabel"
      defaultMessage="Top Questions"
    />
  );
  const bountiedQuestionsLabel = (
    <FormattedMessage
      id="UserActivityTab.bountiedQuestionsLabel"
      defaultMessage="Bountied Questions"
    />
  );
  const activeBountyNavBtnLabel = (
    <FormattedMessage
      id="UserActivityTab.activeBountyNavBtnLabel"
      defaultMessage="Active"
    />
  );
  const offeredBountyNavBtnLabel = (
    <FormattedMessage
      id="UserActivityTab.offeredBountyNavBtnLabel"
      defaultMessage="Offered"
    />
  );
  const earnedBountyNavBtnLabel = (
    <FormattedMessage
      id="UserActivityTab.earnedBountyNavBtnLabel"
      defaultMessage="Earned"
    />
  );

  const statItemClassName =
    'my-2 my-md-0 d-flex align-items-center flex-column';

  return (
    <Container>
      {/* Stat and tags row */}
      <Row>
        {/* Stat card column */}
        <Col>
          <h3>{statLabel}</h3>
          <InfoCardContainer
            className="py-md-3 px-3 d-md-flex justify-content-evenly flex-wrap"
            style={{ maxHeight: '20em' }}
          >
            <>
              <div className={statItemClassName}>
                <h5>{profileStats?.questions}</h5>
                <h6 className="m-0 text-muted">{questionStatItemLabel}</h6>
              </div>
              <div className={statItemClassName}>
                <h5>{profileStats?.answers}</h5>
                <h6 className="m-0 text-muted">{answerStatItemLabel}</h6>
              </div>
              <div className={statItemClassName}>
                <h5>{profileStats?.upvote}</h5>
                <h6 className="m-0 text-muted">{upvoteStatItemLabel}</h6>
              </div>
              <div className={statItemClassName}>
                <h5>{profileStats?.point}</h5>
                <h6 className="m-0 text-muted">{pointStatItemLabel}</h6>
              </div>
            </>
          </InfoCardContainer>
        </Col>

        {/* Tags card column */}
        <Col>
          <Row className="justify-content-between">
            <Col>
              <h3>{tagsLabel}</h3>
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
              <Link to={'tags/all'} className={style.textUnderlineHover}>
                {seeAllLinkLabel}
              </Link>
            </Col>
          </Row>{' '}
          <InfoCardContainer className="p-3" style={{ maxHeight: '30em' }}>
            <>
              {profileTagStats?.slice(0, 4).map(tagStat => (
                <Row className="mb-2 justify-content-between" key={tagStat._id}>
                  <Col sm={6}>
                    <Badge bg="primary">{tagStat.tagName}</Badge>
                  </Col>
                  <Col sm={4} className="d-lg-flex justify-content-between">
                    <div className="text-nowrap">{tagStat.numOfPosts} post</div>
                    <div className="text-nowrap">{tagStat.upvote} upvotes</div>
                  </Col>
                </Row>
              ))}
            </>
          </InfoCardContainer>
        </Col>
      </Row>

      {/* Top Answers row */}
      <Row className="justify-content-between mt-5">
        <Col>
          <h3>{topAnswersLabel}</h3>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Link to={'topanswers/all'} className={style.textUnderlineHover}>
            {seeAllLinkLabel}
          </Link>
        </Col>
      </Row>
      <Row className="gx-0">
        <InfoCardContainer style={{ maxHeight: '25em' }}>
          <>
            {profileTopAnswers?.slice(0, 4).map(answer => (
              <QuestionItem
                answerId={answer._id}
                questionId={answer.questionId._id}
                questionTitle={answer.questionId.questionTitle}
                key={answer._id}
                questionPoints={answer.totalUpvote}
                statVariant="point"
              />
            ))}
          </>
        </InfoCardContainer>
      </Row>

      {/* Top Questions row */}
      <Row className="justify-content-between mt-5">
        <Col>
          <h3>{topQuestionsLabel}</h3>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Link to={'topquestions/all'} className={style.textUnderlineHover}>
            {seeAllLinkLabel}
          </Link>
        </Col>
      </Row>
      <Row className="gx-0">
        <InfoCardContainer style={{ maxHeight: '25em' }}>
          <>
            {profileTopQuestions?.slice(0, 4).map(question => (
              <QuestionItem
                questionId={question._id}
                questionTitle={question.questionTitle}
                questionPoints={question.totalUpvote}
                statVariant="point"
                key={question._id}
              />
            ))}
          </>
        </InfoCardContainer>
      </Row>

      {/* Bountied Question */}
      <Row className="justify-content-between mt-5">
        <Col>
          <h3>{bountiedQuestionsLabel}</h3>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Nav
            variant="pills"
            defaultActiveKey="active"
            className="flex-nowrap"
          >
            <Nav.Item>
              <Nav.Link eventKey="active">{activeBountyNavBtnLabel}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="offered">{offeredBountyNavBtnLabel}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="earned">{earnedBountyNavBtnLabel}</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row className="mt-3 gx-0">
        <InfoCardContainer style={{ maxHeight: '25em' }}>
          <>
            {profileBountiedQuestions?.slice(0, 4).map(question => (
              <QuestionItem
                questionId={question._id}
                questionTitle={question.questionTitle}
                questionPoints={question.questionBounty}
                statVariant="bounty"
                key={question._id}
              />
            ))}
          </>
        </InfoCardContainer>
      </Row>
    </Container>
  );
};

export default UserActivityTab;
