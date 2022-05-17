import { FC } from 'react';

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
          <h3>Top Answers</h3>
        </Col>
      </Row>
      <Row className="gx-0">
        <InfoCardContainer style={{ maxHeight: '200em' }}>
          <>
            {profileTopQuestions?.map(question => (
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
    </Container>
  );
};

export default AllTopQuestions;
