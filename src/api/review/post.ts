import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = '/api/v1/reviews';

interface Review {
	invoiceId: string;
	productId: string;
	productReview: string;
	productRating: number;
	productImages: Array<string>;
}

class Post {
	addReview = (review: Review) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		const { invoiceId, productId, ...data } = review;

		return axiosClient.post(`${API_ENDPOINT}/${invoiceId}/${productId}`, data, config);
	};
}

export default new Post();
