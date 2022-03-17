import get from './get';
import post from './post';

const questionAPI = {
	getAllQuestionsByPageNumber: get.getAllQuestionsByPageNumber,
	getPopularQuestionsByPageNumber: get.getPopularQuestionsByPageNumber,
	getBountiedQuestionsByPageNumber: get.getBountiedQuestionsByPageNumber,
	getQuestionById: get.getQuestionById,

	addNewQuestion: post.add,
};

export default questionAPI;
