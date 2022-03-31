import deleteAPI from './delete';
import get from './get';
import post from './post';
import put from './put';

const questionAPI = {
	deleteQuestion: deleteAPI.deleteQuestion,

	getAllQuestionsByPageNumber: get.getAllQuestionsByPageNumber,
	getPopularQuestionsByPageNumber: get.getPopularQuestionsByPageNumber,
	getBountiedQuestionsByPageNumber: get.getBountiedQuestionsByPageNumber,
	getQuestionById: get.getQuestionById,

	updateQuestion: put.updateQuestion,

	addNewQuestion: post.add,
};

export default questionAPI;
