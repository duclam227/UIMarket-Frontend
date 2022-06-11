import post from './post';
import get from './get';

const paymentAPI = {
	confirmOrder: get.confirmOrder,
	checkout: post.checkoutCart,
	withdrawMoney: post.withdrawMoney,
	requestRefund: post.requestRefund,
	getBuyerFee: get.getBuyerFee,
	getSellerFee: get.getSellerFee,
	checkOrder: post.checkOrder,
};

export default paymentAPI;
