import get from './get';
import post from './post';
import put from './put';

const shopAPI = {
  getAllProductsOfShop: get.getAllProductsOfShop,
  createShop: post.createShop,
  updateShop: put.updateShop,
	getAllProductsOfShop: get.getAllProductsOfShop,
	getShopById: get.getShopById,
	createShop: post.createShop,
};

export default shopAPI;
