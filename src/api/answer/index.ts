import deleteAPI from './delete';
import post from './post';
import put from './put';
import get from './get';

const answerAPI = {
	deleteAnswer: deleteAPI.deleteAnswer,

	getAnswersByPageNumber: get.getAllAnswersByPageNumber,

	updateAnswer: put.updateAnswer,

	addNewAnswer: post.addAnswer,
	addNewComment: post.addComment,
};

export default answerAPI;
