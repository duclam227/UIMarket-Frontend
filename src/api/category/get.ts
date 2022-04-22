import axiosClient from '..';

const CATEGORY_ENDPOINT = 'api/v1/category';

class Get {
	getAllCategories = () => {
		return axiosClient.get(`${CATEGORY_ENDPOINT}`);
	};
}

export default new Get();
