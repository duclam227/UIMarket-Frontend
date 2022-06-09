import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const PRODUCT_ENDPOINT = 'api/v1/products';

class Get {
	getProductById = (id: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(`${PRODUCT_ENDPOINT}/info/${id}`, config);
	};

	getAllProductsByPageNumber = (
		pageNumber: number | string,
		itemsPerPage: number,
		filter?: string | null,
		sort?: string | null,
	) => {
		return axiosClient.get(
			`${PRODUCT_ENDPOINT}?page=${pageNumber}&limit=${itemsPerPage}${filter
				? `&filter=${filter}`
				: ''}${sort ? `&sort=${sort}` : ''}`,
		);
	};

	getTrendingProducts = (pageNumber: number | string, itemsPerPage: number) => {
		return axiosClient.get(
			`${PRODUCT_ENDPOINT}?page=${pageNumber}&limit=${itemsPerPage}&sort=sort-des`,
		);
	};

	searchProduct = (
		query: string,
		pageNumber: number | string,
		itemsPerPage: number,
		filter?: string | null,
		sort?: string | null,
	) => {
		return axiosClient.get(
			`${PRODUCT_ENDPOINT}/search/${query}?page=${pageNumber}&limit=${itemsPerPage}${filter
				? `&filter=${filter}`
				: ''}${sort ? `&sort=${sort}` : ''}`,
		);
	};

	getShopProductsByPageNumber = (
		shopId: string,
		pageNumber: number | string,
		itemsPerPage: number,
	) => {
		return axiosClient.get(
			`${PRODUCT_ENDPOINT}/shop/${shopId}?page=${pageNumber}&limit=${itemsPerPage}`,
		);
	};

	getCategoryProductsByPageNumber = (
		pageNumber: number | string,
		itemsPerPage: number,
		category: string,
		filter?: string | null,
		sort?: string | null,
	) => {
		return axiosClient.get(
			`${PRODUCT_ENDPOINT}/category/${category}?page=${pageNumber}&limit=${itemsPerPage}${filter
				? `&filter=${filter}`
				: ''}${sort ? `&sort=${sort}` : ''}`,
		);
	};
}

export default new Get();
