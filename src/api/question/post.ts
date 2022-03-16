import axiosClient from '..';
import { question } from '../../app/util/interfaces';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = '/api/v1/questions';

class Post {
  add = (question: question) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const { title, body, tags, bounty } = question;
    const questionBounty = +bounty > 0 ? +bounty : -1;
    const data = {
      questionTitle: title,
      questionContent: body,
      questionTag: tags,
      questionBounty,
    };
    return axiosClient.post(API_ENDPOINT, data, config);
  };
}

export default new Post();
