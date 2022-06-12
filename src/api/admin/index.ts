import get from './get';
import put from './put';
import post from './post';
const adminAPI = {
  getAllUsers: get.getAllUsers,
  getAllShops: get.getAllShops,
  getAllReports: get.getAllReports,
  getReportDetails: get.getReportDetails,
  getAllRefunds: get.getAllRefunds,
  getRefundDetails: get.getRefundDetails,

  acceptRefund: post.acceptRefund,
  rejectRefund: post.rejectRefund,
  
  activateUser: put.activateUser,
  deactivateUser: put.deactivateUser,
  activateShop: put.activateShop,
  deactivateShop: put.deactivateShop,
  acceptReport: put.acceptReport,
  rejectReport: put.rejectReport,
};
export default adminAPI;
