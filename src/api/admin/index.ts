import get from './get';
import put from './put';
const adminAPI = {
  getAllUsers: get.getAllUsers,
  getAllShops: get.getAllShops,

  activateUser: put.activateUser,
  deactivateUser: put.deactivateUser,
  activateShop: put.activateShop,
  deactivateShop: put.deactivateShop,
};
export default adminAPI;
