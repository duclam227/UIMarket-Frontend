import { FC } from "react";

import style from './ViewQuestionPage.module.css';

interface VoterProps {
  numberOfUpvotes: number;
  numberOfDownvotes: number;
}

const SectionVoter: FC<VoterProps> = (props) => {
  const { numberOfUpvotes, numberOfDownvotes } = props;

  return (
    <div className={style.voter}>
      <div>up</div>
      <div>{numberOfUpvotes - numberOfDownvotes}</div>
      <div>down</div>
    </div>
  )
}

export default SectionVoter;