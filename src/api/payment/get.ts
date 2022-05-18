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
			`${PAYMENT_ENDPOINT}/capture-order?token=${token}&invoiceId=${invoiceId}`,
			config,
		);
	};
}

export default new Get();
