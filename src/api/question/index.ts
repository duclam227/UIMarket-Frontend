import get from './get';
import post from './post';

const questionAPI = {
	getQuestionByPageNumber: get.getQuestionByPageNumber,
	addNewQuestion: post.add,
};

export default questionAPI;
