import get from './get';
import post from './post';
import put from './put';

const shopAPI = {
  getAllProductsOfShop: get.getAllProductsOfShop,
  getShopInfo: get.getShopInfo,
  createShop: post.createShop,
  updateShop: put.updateShop,
};

export default shopAPI;
