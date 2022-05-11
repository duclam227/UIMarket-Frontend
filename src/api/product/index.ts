import get from './get';
import post from './post';

const productAPI = {
  getProductById: get.getProductById,
  getAllProductsByPageNumber: get.getAllProductsByPageNumber,

  addNewProduct: post.addNewProduct,
};

export default productAPI;
