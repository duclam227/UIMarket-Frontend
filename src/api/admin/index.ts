import get from './get';
import put from './put';
const adminAPI = {
  getAllUsers: get.getAllUsers,
  getAllShops: get.getAllShops,
  getAllReports: get.getAllReports,

  activateUser: put.activateUser,
  deactivateUser: put.deactivateUser,
  activateShop: put.activateShop,
  deactivateShop: put.deactivateShop,
};
export default adminAPI;
