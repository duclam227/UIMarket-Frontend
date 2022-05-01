import get from './get';
import post from './post';

const productAPI = {
	getProductById: get.getProductById,

	addNewProduct: post.addNewProduct,
};

export default productAPI;
