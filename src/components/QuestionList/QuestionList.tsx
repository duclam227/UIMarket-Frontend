import { FC } from 'react';
import { Link } from 'react-router-dom';

import style from './QuestionList.module.css';

interface Props {
  questionsList: Array<any>
}

const QuestionList: FC<Props> = (props) => {
  const { questionsList } = props;

  console.log(questionsList);

  if (!questionsList || questionsList.length < 1) {
    return null;
  }

  const renderAuthor = (author: any) => {
    return (
      <div className={style.authorName}>{author.customerName}</div>
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

    if (displayTag.length > 3) {
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
            <div>{q.totalUpvote - q.totalDownvote} votes</div>
            <div>{q.totalAnswer} answers</div>
            <div>{q.totalView} views</div>
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
