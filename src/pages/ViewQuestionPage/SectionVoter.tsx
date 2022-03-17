import { FC } from "react";
import classNames from "classnames";

import style from './SectionVoter.module.css';
import voteAPI from "../../api/vote";
import { getErrorMessage } from "../../app/util";

interface VoterProps {
  numberOfUpvotes: number;
  numberOfDownvotes: number;
  questionId: string
}

const SectionVoter: FC<VoterProps> = (props) => {
  const { numberOfUpvotes, numberOfDownvotes, questionId } = props;

  const upvoteStyle = classNames(style.voteButton, style.upvote);
  const downvoteStyle = classNames(style.voteButton, style.downvote);

  const handleUpvote = () => {
    voteAPI.upvote('question', questionId, questionId)
      .then((res: any) => {
        console.log(res);
      })
      .catch((error) => {
        const errorMsg = getErrorMessage(error);
        console.log(errorMsg);

      })
  }

  const handleDownvote = () => {
    voteAPI.downvote('question', questionId, questionId)
      .then((res: any) => {
        console.log(res);
      })
      .catch((error) => {
        const errorMsg = getErrorMessage(error);
        console.log(errorMsg);

      })
  }

  return (
    <div className={style.voter}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={upvoteStyle}
          onClick={handleUpvote}>
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
        </svg>
      </div>
      <div>{numberOfUpvotes - numberOfDownvotes}</div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={downvoteStyle}
          onClick={handleDownvote}>
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
        </svg>
      </div>
    </div>
  )
}

export default SectionVoter;