import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const SHOP_ENDPOINT = 'api/v1/shop';

class Get {
	getAllProductsOfShop (shopId: string) {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.get(`${SHOP_ENDPOINT}/product`, config);
	}

	getShopById (id: string) {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(`${SHOP_ENDPOINT}/info/${id}`, config);
	}
}

export default new Get();
