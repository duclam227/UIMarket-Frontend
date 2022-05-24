import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const REVIEW_ENDPOINT = 'api/v1/reviews';

class Get {
	getReviewsOfProductByPage (productId: string, pageNumber: number, perPage: number) {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.get(
			`${REVIEW_ENDPOINT}/${productId}?page=${pageNumber}&limit=${perPage}`,
			config,
		);
	}

	getReviewsOfUserByPage (pageNumber: number, perPage: number) {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.get(
			`${REVIEW_ENDPOINT}/user/list?page=${pageNumber}&limit=${perPage}`,
			config,
		);
	}
}

export default new Get();
