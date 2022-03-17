import get from './get';
import post from './post';

const questionAPI = {
	getAllQuestionsByPageNumber: get.getAllQuestionsByPageNumber,
	getQuestionById: get.getQuestionById,

	addNewQuestion: post.add,
};

export default questionAPI;
