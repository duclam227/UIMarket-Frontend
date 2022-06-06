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

	requestRefund = (
		invoiceId: string,
		licenseIds: Array<string>,
		refundReason: string,
		refundEvidences: Array<string>,
	) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		const data = {
			invoiceId,
			licenseIds,
			refundReason,
			refundEvidences,
		};
		return axiosClient.post(`${PAYMENT_ENDPOINT}/request/refund`, data, config);
	};
}

export default new Post();
