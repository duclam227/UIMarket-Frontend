import axiosClient from '..';

const PRODUCT_ENDPOINT = 'api/v1/products';

class Get {
	getProductById = (id: string) => {
		return axiosClient.get(`${PRODUCT_ENDPOINT}/info/${id}`);
	};

	getAllProductsByPageNumber = (pageNumber: number | string, itemsPerPage: number) => {
		return axiosClient.get(`${PRODUCT_ENDPOINT}?page=${pageNumber}&limit=${itemsPerPage}`);
	};
}

export default new Get();
