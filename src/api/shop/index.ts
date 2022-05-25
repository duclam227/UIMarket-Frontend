import get from './get';
import post from './post';

const shopAPI = {
	getAllProductsOfShop: get.getAllProductsOfShop,
	getShopById: get.getShopById,

	createShop: post.createShop,
};

export default shopAPI;
