import get from './get';
import post from './post';

const questionAPI = {
	getQuestionByPageNumber: get.getQuestionByPageNumber,
	getQuestionById: get.getQuestionById,

	addNewQuestion: post.add,
};

export default questionAPI;
