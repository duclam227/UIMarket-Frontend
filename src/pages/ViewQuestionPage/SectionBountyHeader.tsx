import { FC } from "react";
import { Alert } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

import style from './SectionQuestion.module.css';

interface BountyHeaderProps {
  question: any;
}

const SectionBountyHeader: FC<BountyHeaderProps> = (props) => {
  const { question } = props;

  if (question.questionBounty < 0) {
    return null;
  }

  return (
    <Alert variant="info" className={style.bountyHeader}>
      <svg className={style.clock} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17">
        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
      </svg>
      <div className={style.bountyContent}>
        <FormattedMessage id='SectionBountyHeader.bountyDuration'
          values={{
            user: question.userId.customerName,
            b: (word: string) => <b>{word}</b>
          }} />
        <div>

          <FormattedMessage id='SectionBountyHeader.bountyAmount'
            values={{
              amount: question.questionBounty,
              b: (word: string) => <b>{word}</b>,
            }} />
        </div>
      </div >
    </Alert >
  )
}

export default SectionBountyHeader;