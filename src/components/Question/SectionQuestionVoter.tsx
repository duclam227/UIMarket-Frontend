import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { debounce, throttle } from 'lodash';
import { toast } from "react-toastify";
import { injectIntl, IntlShape } from "react-intl";

import { getErrorMessage } from "../../app/util";
import { errors as errorCodes } from "../../app/util/errors";
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
  const [voteInProgress, setVoteInProgress] = useState<boolean>(false);
  const navigate = useNavigate();

  const isAuthenticated = !!currentUser;
  const isCurrentUserAuthor = currentUser && currentUser.customerEmail === question.userId.customerEmail;

  const upvoteStyle = classNames(style.voteButton, style.upvote);
  const upvoteActiveStyle = classNames(style.voteButton, style.upvote, style.active);
  const downvoteStyle = classNames(style.voteButton, style.downvote);
  const downvoteActiveStyle = classNames(style.voteButton, style.downvote, style.active);

  const handleUpvote = () => {
    setVoteInProgress(true);

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isCurrentUserAuthor) {
      toast.warning(intl.formatMessage({ id: 'Question.authorCantVote' }));
      setVoteInProgress(false);
      return;
    }


    const oldVoteStatus: any = { ...voteStatus };

    props.handleVoteStatus({
      upvote: !oldVoteStatus.upvote,
      downvote: oldVoteStatus.downvote ? false : oldVoteStatus.downvote
    });
    voteAPI.upvote('Question', question._id, question._id)
      .then((res: any) => {
        switch (res) {
          case 'UPVOTED': {
            if (voteStatus?.downvote) {
              setUpvote(upvote + 2);
            } else {
              setUpvote(upvote + 1);
            }
            break;
          }
          case 'UNVOTED': {
            setUpvote(upvote - 1);
            break;
          }
        }
      })
      .catch((error) => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.voting[errorMsg as keyof typeof errorCodes.voting];
        toast.error(intl.formatMessage({ id: `Vote.${errorCode}` }));
        props.handleVoteStatus({ ...oldVoteStatus });
      })
      .finally(() => {
        setVoteInProgress(false);
      })
  }

  const handleDownvote = () => {
    setVoteInProgress(true);
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isCurrentUserAuthor) {
      toast.warning(intl.formatMessage({ id: 'Question.authorCantVote' }));
      setVoteInProgress(false);
      return;
    }

    const oldVoteStatus: any = { ...voteStatus };

    props.handleVoteStatus({
      upvote: oldVoteStatus.upvote ? false : oldVoteStatus.upvote,
      downvote: !oldVoteStatus.downvote
    });
    voteAPI.downvote('Question', question._id, question._id)
      .then((res: any) => {
        switch (res) {
          case 'DOWNVOTED': {
            if (voteStatus?.upvote) {
              setDownvote(downvote + 2);
            } else {
              setDownvote(downvote + 1);
            }
            break;
          }
          case 'UNVOTED': {
            setDownvote(downvote - 1);
            break;
          }
        }
      })
      .catch((error) => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.voting[errorMsg as keyof typeof errorCodes.voting];
        toast.error(intl.formatMessage({ id: `Vote.${errorCode}` }));
        props.handleVoteStatus({ ...oldVoteStatus });
      })
      .finally(() => {
        setVoteInProgress(false);
      })
  }

  const upvoteIcon = voteStatus && voteStatus.upvote
    ? <BsArrowUpCircleFill onClick={voteInProgress ? () => { } : handleUpvote} className={upvoteActiveStyle} />
    : <BsArrowUpCircle onClick={voteInProgress ? () => { } : handleUpvote} className={upvoteStyle} />

  const downvoteIcon = voteStatus && voteStatus.downvote
    ? <BsArrowDownCircleFill onClick={voteInProgress ? () => { } : handleDownvote} className={downvoteActiveStyle} />
    : <BsArrowDownCircle onClick={voteInProgress ? () => { } : handleDownvote} className={downvoteStyle} />

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