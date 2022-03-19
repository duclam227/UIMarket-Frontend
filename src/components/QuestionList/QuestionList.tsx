import { FC } from 'react';
import { Alert } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import style from './QuestionList.module.css';

interface Props {
  questionsList: Array<any>
}

const QuestionList: FC<Props> = (props) => {
  const { questionsList } = props;

  if (!questionsList || questionsList.length < 1) {
    return null;
  }

  const renderAuthor = (author: any) => {
    return (
      <div className={style.authorName}>
        <FormattedMessage id="QuestionList.postedBy" />
        {author.customerName}
      </div>
    )
  }

  const renderTags = (tags: Array<any>) => {
    if (tags.length < 1) {
      return null;
    }

    const displayTag: Array<any> = [];
    for (let i = 0; i < tags.length; i++) {
      if (i > tags.length) {
        break;
      }
      displayTag.push(
        (<>
          <div key={tags[i].tagName} className={style.tag}>{tags[i].tagName}</div>
        </>)
      )
    }

    if (tags.length > 4) {
      displayTag.push(
        (<>
          <div key='seemore' className={style.tag}>...</div>
        </>))
    }

    return displayTag;
  }

  const renderQuestions = () => {
    return questionsList.map((q: any, i: number) => {
      const qLink = '/question/' + q._id;
      return (
        <div key={q._id} className={style.questionContainer}>
          <div className={style.sideContent}>
            <div><FormattedMessage id="QuestionList.numberOfVotes" values={{ count: q.totalUpvote - q.totalDownvote }} /></div>
            <div className={style.answersCount}><FormattedMessage id="QuestionList.numberOfAnswers" values={{ count: q.totalAnswer }} /></div>
            <div className={style.viewsCount}><FormattedMessage id="QuestionList.numberOfViews" values={{ count: q.totalView }} /></div>
            {q.questionBounty > 0
              ? <Alert variant='warning' className={style.bountyTag}>
                <div><b>{q.questionBounty}</b></div>
              </Alert>
              : null}
          </div>
          <div className={style.mainContent}>
            <Link to={qLink} className={style.title}>{q.questionTitle}</Link>
            <div className={style.mainFooter}>
              <div className={style.tagsContainer}>{renderTags(q.questionTag)}</div>
              <div className={style.authorContainer}>{renderAuthor(q.userId)}</div>
            </div>
          </div>
        </div>
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
