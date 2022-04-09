import deleteAPI from './delete';
import post from './post';
import put from './put';
import get from './get';

const commentAPI = {
	deleteComment: deleteAPI.deleteComment,

	getCommentsByPageNumber: get.getCommentsByPageNumber,

	addNewComment: post.addNewComment,

	updateComment: put.updateComment,
};

export default commentAPI;
