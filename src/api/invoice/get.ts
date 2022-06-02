import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const INVOICE_ENDPOINT = 'api/v1/invoices';

class Get {
	getPurchaseHistoryByPage = (pageNumber: string | number, perPage: string | number) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(
			`${INVOICE_ENDPOINT}/history?page=${pageNumber}&limit=${perPage}`,
			config,
		);
	};

	getTransactionHistoryByPage = (pageNumber: string | number, perPage: string | number) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(
			`${INVOICE_ENDPOINT}/transaction?page=${pageNumber}&limit=${perPage}`,
			config,
		);
	};
}

export default new Get();
