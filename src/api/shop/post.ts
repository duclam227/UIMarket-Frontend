import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';
import { product } from '../../app/util/interfaces';

const SHOP_ENDPOINT = '/api/v1/shop';

class Post {
	addNewProduct = (product: product | null) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.post(`${SHOP_ENDPOINT}/product`, product, config);
	};
}

export default new Post();
