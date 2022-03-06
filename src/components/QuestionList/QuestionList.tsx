import Container from 'react-bootstrap/Container';
import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { question } from '../../app/util/interfaces';

interface Props {
  questionsList: Array<question>
}

const QuestionList: FC<Props> = (props) => {
  const { questionsList } = props;

  if (!questionsList || questionsList.length < 1) {
    return null;
  }

  const renderQuestions = () => {
    return questionsList.map((q: question, i: number) => {
      return (
        <>
          <Card>
            {q.question}
          </Card>
        </>
      )
    })
  }

  return (
    <>
      <Container fluid='sm'>
        {renderQuestions()}
      </Container>
    </>
  );
};

export default QuestionList;
