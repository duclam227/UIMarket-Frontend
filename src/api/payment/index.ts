import post from './post';
import get from './get';

const paymentAPI = {
	confirmOrder: get.confirmOrder,
	checkout: post.checkoutCart,
	withdrawMoney: post.withdrawMoney,
};

export default paymentAPI;
