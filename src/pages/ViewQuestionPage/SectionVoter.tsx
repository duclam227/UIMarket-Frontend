import { FC, useState } from "react";
import classNames from "classnames";

import style from './SectionVoter.module.css';
import voteAPI from "../../api/vote";
import { getErrorMessage } from "../../app/util";
import { voteStatus } from "../../app/util/interfaces";

interface VoterProps {
  numberOfUpvotes: number;
  numberOfDownvotes: number;
  questionId: string;
  voteStatus: voteStatus | null;
}

const SectionVoter: FC<VoterProps> = (props) => {
  const { numberOfUpvotes, numberOfDownvotes, questionId, voteStatus } = props;
  const [upvote, setUpvote] = useState(numberOfUpvotes);
  const [downvote, setDownvote] = useState(numberOfDownvotes);

  const upvoteStyle = classNames(style.voteButton, style.upvote);
  const upvoteActiveStyle = classNames(style.voteButton, style.upvote, style.active);
  const downvoteStyle = classNames(style.voteButton, style.downvote);
  const downvoteActiveStyle = classNames(style.voteButton, style.downvote, style.active);

  const handleUpvote = () => {
    voteAPI.upvote('question', questionId, questionId)
      .then((res: any) => {
        setUpvote(upvote + 1);
      })
      .catch((error) => {
        const errorMsg = getErrorMessage(error);
        console.log(errorMsg);
      })
  }

  const handleDownvote = () => {
    voteAPI.downvote('question', questionId, questionId)
      .then((res: any) => {
        setDownvote(downvote + 1);
      })
      .catch((error) => {
        const errorMsg = getErrorMessage(error);
        console.log(errorMsg);

      })
  }

  const upvoteIcon = voteStatus && voteStatus.upvote
    ? <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={upvoteActiveStyle} viewBox="0 0 16 16"
      onClick={handleUpvote}>
      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
    </svg>
    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={upvoteStyle}
      onClick={handleUpvote}>
      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
    </svg>

  const downvoteIcon = voteStatus && voteStatus.downvote
    ? <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={downvoteActiveStyle} viewBox="0 0 16 16"
      onClick={handleDownvote}>
      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
    </svg>
    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={downvoteStyle}
      onClick={handleDownvote}>
      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
    </svg>

  return (
    <div className={style.voter}>
      <div>
        {upvoteIcon}
      </div>
      <div>{upvote - downvote}</div>
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