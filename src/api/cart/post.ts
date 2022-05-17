import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const CART_ENDPOINT = 'api/v1/carts';

class Post {
	addToCart = (productId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		const data = {
			product: productId,
		};
		return axiosClient.post(`${CART_ENDPOINT}`, data, config);
	};
}

export default new Post();
