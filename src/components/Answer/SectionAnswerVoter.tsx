import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import { getErrorMessage } from "../../app/util";
import { customer, voteStatus } from "../../app/util/interfaces";

import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
} from 'react-icons/bs';


import voteAPI from "../../api/vote";

import style from './Answer.module.css';

interface VoterProps {
  question: any;
  answer: any;
  currentUser: customer | null;
  handleVoteStatus: Function;
}

const SectionAnswerVoter: FC<VoterProps> = (props) => {
  const { answer, question, currentUser } = props;
  const [upvote, setUpvote] = useState(answer.totalUpvote);
  const [downvote, setDownvote] = useState(answer.totalDownvote);
  const [voteStatus, setVoteStatus] = useState<voteStatus>(answer.voteStatus);
  const navigate = useNavigate();

  const isAuthenticated = !!currentUser;
  const isCurrentUserAuthor = currentUser && currentUser.customerEmail === answer.customerInfo[0].customerEmail;


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

    voteAPI.upvote('Answer', question._id, answer._id)
      .then((res: any) => {
        switch (res) {
          case 'UPVOTED': {
            if (voteStatus?.downvote) {
              setUpvote(upvote + 1);
              setDownvote(downvote - 1);
            } else {
              setUpvote(upvote + 1);
            }
            setVoteStatus({ upvote: true, downvote: false });
            break;
          }
          case 'UNVOTED': {
            setUpvote(upvote - 1);
            setVoteStatus({ upvote: false, downvote: false });
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

    voteAPI.downvote('Answer', question._id, answer._id)
      .then((res: any) => {
        switch (res) {
          case 'DOWNVOTED': {
            if (voteStatus?.upvote) {
              setDownvote(downvote + 1);
              setUpvote(upvote - 1);
            } else {
              setDownvote(downvote + 1);
            }
            setVoteStatus({ upvote: false, downvote: true });
            break;
          }
          case 'UNVOTED': {
            setDownvote(downvote - 1);
            setVoteStatus({ upvote: false, downvote: false });
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
    ? <BsHandThumbsUpFill className={upvoteActiveStyle} onClick={handleUpvote} />
    : <BsHandThumbsUp className={upvoteStyle} onClick={handleUpvote} />


  const downvoteIcon = voteStatus && voteStatus.downvote
    ? <BsHandThumbsDownFill className={downvoteActiveStyle} onClick={handleDownvote} />
    : <BsHandThumbsDown className={downvoteStyle} onClick={handleDownvote} />

  return (
    <div className={style.voter}>
      <div>
        {upvoteIcon}
      </div>
      <div>{upvote}</div>
      <div>
        {downvoteIcon}
      </div>
      <div>{downvote}</div>
    </div>
  )
}

export default SectionAnswerVoter;