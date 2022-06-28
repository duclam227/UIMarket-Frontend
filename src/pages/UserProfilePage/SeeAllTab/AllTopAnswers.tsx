import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { GeneralAnswerInfo } from '../UserProfilePage';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { InfoCardContainer } from '../../../components';
import QuestionItem from '../UserActivityTab/QuestionItem';

interface Props {
  profileTopAnswers: null | GeneralAnswerInfo[];
}
const AllTopAnswers: FC<Props> = props => {
  const { profileTopAnswers } = props;
  if (!profileTopAnswers) return null;
  return (
    <Container>
      <Row className="justify-content-between mt-2">
        <Col>
          <h3>
            <FormattedMessage
              id="UserActivityTab.topAnswersLabel"
              defaultMessage="Top Answers"
            />
          </h3>
        </Col>
      </Row>
      <Row className="gx-0">
        <InfoCardContainer style={{ maxHeight: '200em' }}>
          <>
            {profileTopAnswers && profileTopAnswers.length > 0 ? (
              profileTopAnswers?.map(answer => (
                <QuestionItem
                  answerId={answer._id}
                  questionId={answer.questionId._id}
                  questionTitle={answer.questionId.questionTitle}
                  key={answer._id}
                  questionPoints={answer.totalUpvote}
                  statVariant="point"
                />
              ))
            ) : (
              <div className={`p-2`}>
                <FormattedMessage id="UserActivityTab.noData" />
              </div>
            )}
          </>
        </InfoCardContainer>
      </Row>
    </Container>
  );
};

export default AllTopAnswers;
