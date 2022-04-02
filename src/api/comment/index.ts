import deleteAPI from './delete';
import post from './post';
import put from './put';
import get from './get';

const commentAPI = {
	deleteComment: deleteAPI.deleteComment,

	getAllComments: get.getAllComments,

	addNewComment: post.addNewComment,

	updateComment: put.updateComment,
};

export default commentAPI;
