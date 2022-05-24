import get from './get';
import post from './post';
import put from './put';

const reviewAPI = {
	addReview: post.addReview,
	editReview: put.editReview,
	getReviewsOfProductByPage: get.getReviewsOfProductByPage,
	getReviewsOfUserByPage: get.getReviewsOfUserByPage,
};

export default reviewAPI;
