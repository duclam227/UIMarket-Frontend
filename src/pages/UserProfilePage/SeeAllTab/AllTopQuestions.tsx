import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { InfoCardContainer } from '../../../components';
import { GeneralQuestionInfo } from '../UserProfilePage';
import QuestionItem from '../UserActivityTab/QuestionItem';

interface Props {
  profileTopQuestions: null | GeneralQuestionInfo[];
}
const AllTopQuestions: FC<Props> = props => {
  const { profileTopQuestions } = props;
  if (!profileTopQuestions) return null;
  return (
    <Container>
      <Row className="justify-content-between mt-2">
        <Col>
          <h3>
            {' '}
            <FormattedMessage
              id="UserActivityTab.topQuestionsLabel"
              defaultMessage="Top Questions"
            />
          </h3>
        </Col>
      </Row>
      <Row className="gx-0">
        <InfoCardContainer style={{ maxHeight: '200em' }}>
          <>
            {profileTopQuestions && profileTopQuestions.length > 0 ? (
              profileTopQuestions?.map(question => (
                <QuestionItem
                  questionId={question._id}
                  questionTitle={question.questionTitle}
                  questionPoints={question.totalUpvote}
                  statVariant="point"
                  key={question._id}
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

export default AllTopQuestions;
