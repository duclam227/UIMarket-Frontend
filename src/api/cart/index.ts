import get from './get';
import post from './post';
import deleteAPI from './delete';

const cartAPI = {
	getAllCartProducts: get.getAllCartProducts,
	removeSingleProduct: deleteAPI.removeSingleProduct,
	addToCart: post.addToCart,
};

export default cartAPI;
