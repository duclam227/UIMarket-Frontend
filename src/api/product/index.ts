import get from './get';
import post from './post';

const productAPI = {
	getProductById: get.getProductById,
	getAllProductsByPageNumber: get.getAllProductsByPageNumber,
	getTrendingProducts: get.getTrendingProducts,
	searchProducts: get.searchProduct,

	addNewProduct: post.addNewProduct,
};

export default productAPI;
