import get from './get';
import put from './put';
const adminAPI = {
  getAllUsers: get.getAllUsers,

  activateUser: put.activateUser,
  deactivateUser: put.deactivateUser,
};
export default adminAPI;
