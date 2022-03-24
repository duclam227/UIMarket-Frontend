import { FC, useState } from "react";
import classNames from "classnames";

import style from './Question.module.css';
import voteAPI from "../../api/vote";
import { getErrorMessage } from "../../app/util";
import { customer, voteStatus } from "../../app/util/interfaces";
import { useNavigate } from "react-router-dom";

interface VoterProps {
  question: any;
  voteStatus: voteStatus | null;
  currentUser: customer | null;
  handleVoteStatus: Function;
}

const SectionQuestionVoter: FC<VoterProps> = (props) => {
  const { question, voteStatus, currentUser } = props;
  const [upvote, setUpvote] = useState(question.totalUpvote);
  const [downvote, setDownvote] = useState(question.totalDownvote);
  const navigate = useNavigate();

  const isAuthenticated = !!currentUser;
  const isCurrentUserAuthor = currentUser && currentUser.customerEmail === question.userId.customerEmail;

  const upvoteStyle = classNames(style.voteButton, style.upvote);
  const upvoteActiveStyle = classNames(style.voteButton, style.upvote, style.active);
  const downvoteStyle = classNames(style.voteButton, style.downvote);
  const downvoteActiveStyle = classNames(style.voteButton, style.downvote, style.active);

  const handleUpvote = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isCurrentUserAuthor) {
      return;
    }

    voteAPI.upvote('Question', question._id, question._id)
      .then((res: any) => {
        switch (res) {
          case 'UPVOTED': {
            if (voteStatus?.downvote) {
              setUpvote(upvote + 2);
            } else {
              setUpvote(upvote + 1);
            }
            props.handleVoteStatus({ upvote: true, downvote: false });
            break;
          }
          case 'UNVOTED': {
            setUpvote(upvote - 1);
            props.handleVoteStatus({ upvote: false, downvote: false });
            break;
          }
        }
      })
      .catch((error) => {
        const errorMsg = getErrorMessage(error);
        console.log(error);
      })
  }

  const handleDownvote = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isCurrentUserAuthor) {
      return;
    }

    voteAPI.downvote('Question', question._id, question._id)
      .then((res: any) => {
        switch (res) {
          case 'DOWNVOTED': {
            if (voteStatus?.upvote) {
              setDownvote(downvote + 2);
            } else {
              setDownvote(downvote + 1);
            }
            props.handleVoteStatus({ upvote: false, downvote: true });
            break;
          }
          case 'UNVOTED': {
            setDownvote(downvote - 1);
            props.handleVoteStatus({ upvote: false, downvote: false });
            break;
          }
        }
      })
      .catch((error) => {
        const errorMsg = getErrorMessage(error);
        console.log(error);

      })
  }

  const upvoteIcon = voteStatus && voteStatus.upvote
    ? <svg xmlns="http://www.w3.org/2000/svg" className={upvoteActiveStyle} viewBox="0 0 16 16"
      onClick={handleUpvote}>
      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
    </svg>
    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={upvoteStyle}
      onClick={handleUpvote}>
      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
    </svg>

  const downvoteIcon = voteStatus && voteStatus.downvote
    ? <svg xmlns="http://www.w3.org/2000/svg" className={downvoteActiveStyle} viewBox="0 0 16 16"
      onClick={handleDownvote}>
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
    </svg>
    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={downvoteStyle}
      onClick={handleDownvote}>
      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
    </svg>



  return (
    <div className={style.voter}>
      <div>
        {upvoteIcon}
      </div>
      <div>{upvote - downvote}</div>
      <div>
        {downvoteIcon}
      </div>
    </div>
  )
}

export default SectionQuestionVoter;