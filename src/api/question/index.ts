import get from './get';
import post from './post';

const questionAPI = {
	get,
  addNewQuestion: post.add,
};

export default questionAPI;
