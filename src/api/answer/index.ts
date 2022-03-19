import post from './post';
import get from './get';

const answerAPI = {
	getAnswersByPageNumber: get.getAllAnswersByPageNumber,

	addNewAnswer: post.addAnswer,
};

export default answerAPI;
