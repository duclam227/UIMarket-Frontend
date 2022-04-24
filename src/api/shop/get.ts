import axiosClient from '..';

const SHOP_ENDPOINT = 'api/v1/shop';

class Get {
	getAllProductsOfShop (shopId: string) {
		return axiosClient.get(`${SHOP_ENDPOINT}/product`);
	}
}

export default new Get();
