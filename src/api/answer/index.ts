import deleteAPI from './delete';
import post from './post';
import put from './put';
import get from './get';

const answerAPI = {
	deleteAnswer: deleteAPI.deleteAnswer,

	getAnswersByPageNumber: get.getAllAnswersByPageNumber,

	updateAnswer: put.updateAnswer,
	markBestAnswer: put.markBestAnswer,

	addNewAnswer: post.addAnswer,
};

export default answerAPI;
