import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';
import { question } from '../../app/util/interfaces';

const API_ENDPOINT = 'api/v1/questions';
const jwt = getJwt();

class Put {
  updateQuestion = (question: any, questionId: string) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.put(
      `${API_ENDPOINT}/update/${questionId}`,
      {
        questionTitle: question.title,
        questionContent: question.body,
        questionTag: question.tags,
        questionBounty: question.bounty,
        bountyDueDate: question.bountyDueDate,
      },
      config,
    );
  };
}

export default new Put();
