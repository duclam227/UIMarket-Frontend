import get from './get';
import post from './post';

const reviewAPI = {
	addReview: post.addReview,
	getReviewsOfProductByPage: get.getReviewsOfProductByPage,
};

export default reviewAPI;
