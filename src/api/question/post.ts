import axiosClient from '..';
import { question } from '../../app/util/interfaces';

class Post {
  add = (question: question) => {
    let { title, body, tags, bounty } = question;
    let questionBounty = +bounty > 0 ? +bounty : -1;
    let data = {
      questionTitle: title,
      questionContent: body,
      questionTag: tags,
      questionBounty,
    };
    // return axiosClient.post();
  };
}

export default new Post();
