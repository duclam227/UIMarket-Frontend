import axiosClient from '..';

const PRODUCT_ENDPOINT = 'api/v1/products';

class Get {
	getProductById = (id: string) => {
		return axiosClient.get(`${PRODUCT_ENDPOINT}/info/${id}`);
	};
}

export default new Get();
