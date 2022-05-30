import get from './get';

const invoiceAPI = {
	getPurchaseHistoryByPage: get.getPurchaseHistoryByPage,
	getTransactionHistoryByPage: get.getTransactionHistoryByPage,
};

export default invoiceAPI;
