import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';
import { product } from '../../app/util/interfaces';

const SHOP_ENDPOINT = '/api/v1/shop';

class Put {
	editProduct = (product: product | null) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.put(`${SHOP_ENDPOINT}/product/${product?._id}`, product, config);
	};
}

export default new Put();
