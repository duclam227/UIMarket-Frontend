import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = '/api/v1/admin';

class Get {
	getAllUsers = (pageNumber: number | string, itemsPerPage: number) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.get(
			`${API_ENDPOINT}/users?page=${pageNumber}&limit=${itemsPerPage}`,
			config,
		);
	};
	getAllShops = (pageNumber: number | string, itemsPerPage: number) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.get(
			`${API_ENDPOINT}/shops?page=${pageNumber}&limit=${itemsPerPage}`,
			config,
		);
	};
	getAllReports = (pageNumber: number | string, itemsPerPage: number) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.get(
			`${API_ENDPOINT}/report/list/All?page=${pageNumber}&limit=${itemsPerPage}`,
			config,
		);
	};
	getReportDetails = (id: string, pageNumber?: number | string, itemsPerPage?: number) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.get(
			`${API_ENDPOINT}/report/detail/${id}?page=${pageNumber}&limit=${itemsPerPage}`,
			config,
		);
	};
	getAllRefunds = (
		pageNumber: number | string,
		itemsPerPage: number,
		filter?: string | null,
		sort?: string | null,
	) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.get(
			`${API_ENDPOINT}/refund?filter=${filter}&sort=${sort}&page=${pageNumber}&limit=${itemsPerPage}`,
			config,
		);
	};
	getRefundDetails = (refundId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.get(`${API_ENDPOINT}/refund/${refundId}`, config);
	};
	getUserDetails = (userId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.get(`${API_ENDPOINT}/users/${userId}`, config);
	};
	getShopOrders = (userId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.get(`${API_ENDPOINT}/users/${userId}`, config);
	};
}

export default new Get();
