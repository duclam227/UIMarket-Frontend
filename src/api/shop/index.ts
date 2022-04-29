import get from './get';
import post from './post';

const shopAPI = {
	getAllProductsOfShop: get.getAllProductsOfShop,

	createShop: post.createShop,
};

export default shopAPI;
