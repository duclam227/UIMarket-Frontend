import get from './get';
import post from './post';
import put from './put';

const productAPI = {
	getProductById: get.getProductById,
	getAllProductsByPageNumber: get.getAllProductsByPageNumber,
	getTrendingProducts: get.getTrendingProducts,
	searchProducts: get.searchProduct,

	addNewProduct: post.addNewProduct,

	editProduct: put.editProduct,
};

export default productAPI;
