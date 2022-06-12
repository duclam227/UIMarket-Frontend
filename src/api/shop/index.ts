import get from './get';
import post from './post';
import put from './put';

const shopAPI = {
	getAllProductsOfShop: get.getAllProductsOfShop,
	createShop: post.createShop,
	updateShop: put.updateShop,
	getShopById: get.getShopById,
	searchProduct: get.searchProduct,
};

export default shopAPI;
