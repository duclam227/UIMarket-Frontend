import get from './get';
import post from './post';
import deleteClass from './delete';
import put from './put';

const productAPI = {
  //get
  getProductById: get.getProductById,
  getAllProductsByPageNumber: get.getAllProductsByPageNumber,
  getTrendingProducts: get.getTrendingProducts,
	searchProducts: get.searchProduct,
  
  //post
  addNewProduct: post.addNewProduct,

	editProduct: put.editProduct,
  activateProduct: put.activateProduct,
  deactivateProduct: put.deactivateProduct,

  //delete
  //deleteClass bcuz delete is a reserved keyword
  deleteProduct: deleteClass.deleteProduct,
};

export default productAPI;
