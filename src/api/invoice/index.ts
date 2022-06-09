import get from './get';

const invoiceAPI = {
	getPurchaseHistoryByPage: get.getPurchaseHistoryByPage,
	getTransactionHistoryByPage: get.getTransactionHistoryByPage,
	getInvoiceById: get.getInvoiceById,
};

export default invoiceAPI;
