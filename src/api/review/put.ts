import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = '/api/v1/reviews';

interface Review {
	_id: string;
	productReview: string;
	productRating: number;
	reviewPictures: Array<string>;
}

class Put {
	editReview = (review: Review) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		const { _id, ...data } = review;

		return axiosClient.put(`${API_ENDPOINT}/${_id}`, data, config);
	};
}

export default new Put();
