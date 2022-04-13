import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './QuestionItem.module.css';

interface Props {
  questionId: string;
  questionTitle: string;
  questionPoints: number;
  statVariant: string;
  answerId?: string;
}

const QuestionItem: FC<Props> = ({
  questionId,
  questionTitle,
  questionPoints,
  statVariant,
  answerId,
}) => {
  const renderBadge = (questionPoints: number, statVariant: string) => {
    switch (statVariant) {
      case 'point':
        return (
          <span
            className={`${style.questionBadge} ${style.questionPointBadge}`}
          >
            {questionPoints}
          </span>
        );
      case 'bounty':
        return (
          <span
            className={`${style.questionBadge} ${style.questionBountyBadge}`}
          >
            {questionPoints}
          </span>
        );
    }
  };
  return (
    <div className={style.questionItemContainer}>
      {renderBadge(questionPoints, statVariant)}
      <Link
        to={`/question/${questionId}`}
        className={style.textUnderlineHover + ' nav-link'}
      >
        {questionTitle}
      </Link>
    </div>
  );
};

export default QuestionItem;
