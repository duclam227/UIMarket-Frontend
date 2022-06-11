import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const PAYMENT_ENDPOINT = 'api/v1/payment';

class Get {
	confirmOrder = (token: string, invoiceId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(
			`${PAYMENT_ENDPOINT}/capture-order/paypal?token=${token}&invoiceId=${invoiceId}`,
			config,
		);
	};

	getBuyerFee = () => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(
			`${PAYMENT_ENDPOINT}/buyer-fee`,
			config,
		)
	}

	getSellerFee = () => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(
			`${PAYMENT_ENDPOINT}/seller-fee`,
			config,
		)
	}
}

export default new Get();
