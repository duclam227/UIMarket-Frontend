import get from './get';
import deleteAPI from './delete';

const cartAPI = {
  getAllCartProducts: get.getAllCartProducts,
  removeSingleProduct: deleteAPI.removeSingleProduct,
};

export default cartAPI;
