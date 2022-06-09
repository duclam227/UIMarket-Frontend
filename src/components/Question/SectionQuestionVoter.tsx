import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { debounce, throttle } from 'lodash';
import { toast } from "react-toastify";
import { injectIntl, IntlShape } from "react-intl";

import { getErrorMessage } from "../../app/util";
import { customer, voteStatus } from "../../app/util/interfaces";

import {
  BsArrowDownCircle,
  BsArrowDownCircleFill,
  BsArrowUpCircle,
  BsArrowUpCircleFill,
} from 'react-icons/bs';

import voteAPI from "../../api/vote";

import style from './Question.module.css';

interface VoterProps {
  question: any;
  voteStatus: voteStatus | null;
  currentUser: customer | null;
  handleVoteStatus: Function;
  intl: IntlShape;
}

const SectionQuestionVoter: FC<VoterProps> = (props) => {
  const { question, voteStatus, currentUser, intl } = props;
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
      toast.warning(intl.formatMessage({ id: 'Question.authorCantVote' }))
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
    ? <BsArrowUpCircleFill onClick={debounce(handleUpvote, 200)} className={upvoteActiveStyle} />
    : <BsArrowUpCircle onClick={debounce(handleUpvote, 200)} className={upvoteStyle} />

  const downvoteIcon = voteStatus && voteStatus.downvote
    ? <BsArrowDownCircleFill onClick={debounce(handleDownvote, 200)} className={downvoteActiveStyle} />
    : <BsArrowDownCircle onClick={debounce(handleDownvote, 200)} className={downvoteStyle} />

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

export default injectIntl(SectionQuestionVoter);