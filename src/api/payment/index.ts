import post from './post';
import get from './get';

const paymentAPI = {
	confirmOrder: get.confirmOrder,
	checkout: post.checkoutCart,
};

export default paymentAPI;
