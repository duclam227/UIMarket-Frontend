import post from './post';
import get from './get';

const answerAPI = {
	getAnswersByPageNumber: get.getAllAnswersByPageNumber,

	addNewAnswer: post.addAnswer,
	addNewComment: post.addComment,
};

export default answerAPI;
