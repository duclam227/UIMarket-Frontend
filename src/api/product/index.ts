import get from './get';
import post from './post';
import deleteClass from './delete';

const productAPI = {
  //get
  getProductById: get.getProductById,
  getAllProductsByPageNumber: get.getAllProductsByPageNumber,

  //post
  addNewProduct: post.addNewProduct,

  //delete
  //deleteClass bcuz delete is a reserved keyword
  deleteProduct: deleteClass.deleteProduct,
};

export default productAPI;
