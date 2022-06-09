import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const INVOICE_ENDPOINT = 'api/v1/invoices';

class Get {
	getPurchaseHistoryByPage = (
		pageNumber: string | number,
		perPage: string | number,
		query: string | null,
	) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(
			`${INVOICE_ENDPOINT}/history${query
				? '/' + query
				: ''}?page=${pageNumber}&limit=${perPage}`,
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

	getInvoiceById = (id: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(`${INVOICE_ENDPOINT}/detail/${id}`, config);
	};
}

export default new Get();
