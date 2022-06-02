import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const PAYMENT_ENDPOINT = 'api/v1/payment';

class Post {
	checkoutCart = (productList: any) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		const data = {
			productList,
		};
		return axiosClient.post(`${PAYMENT_ENDPOINT}/create-order`, data, config);
	};

	withdrawMoney = (amountValue: number) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		const data = {
			amountValue,
		};
		return axiosClient.post(`${PAYMENT_ENDPOINT}/withdraw`, data, config);
	};
}

export default new Post();
