import deleteAPI from './delete';
import get from './get';
import post from './post';

const questionAPI = {
	deleteQuestion: deleteAPI.deleteQuestion,

	getAllQuestionsByPageNumber: get.getAllQuestionsByPageNumber,
	getPopularQuestionsByPageNumber: get.getPopularQuestionsByPageNumber,
	getBountiedQuestionsByPageNumber: get.getBountiedQuestionsByPageNumber,
	getQuestionById: get.getQuestionById,

	addNewQuestion: post.add,
};

export default questionAPI;
