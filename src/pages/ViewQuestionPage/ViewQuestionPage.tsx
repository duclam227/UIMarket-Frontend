import { useParams, useSearchParams } from "react-router-dom";

import { PageWithNavbar } from "../../components";

import style from './ViewQuestionPage.module.css';

const ViewQuestionPage = () => {
  const { id } = useParams();
  const questionId = id || '';

  return (
    <PageWithNavbar>
      <div className={style.container}>
        {questionId}
      </div>
    </PageWithNavbar>
  )
}

export default ViewQuestionPage;