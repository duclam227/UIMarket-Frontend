import Container from 'react-bootstrap/Container';
import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { question } from '../../app/util/interfaces';

import style from './QuestionList.module.css';

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
      <div className={style.container}>
        {renderQuestions()}
      </div>
    </>
  );
};

export default QuestionList;
