import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const QUESTIONS_ENDPOINT = 'api/v1/questions';
const jwt = getJwt();

class Get {
	getAllQuestionsByPageNumber = (pageNumber: number | string, itemsPerPage: number) => {
		return axiosClient.get(`${QUESTIONS_ENDPOINT}?page=${pageNumber}&limit=${itemsPerPage}`);
	};

	getPopularQuestionsByPageNumber = (pageNumber: number | string, itemsPerPage: number) => {
		return axiosClient.get(
			`${QUESTIONS_ENDPOINT}?page=${pageNumber}&limit=${itemsPerPage}&selectWith=popular`,
		);
	};

	getBountiedQuestionsByPageNumber = (pageNumber: number | string, itemsPerPage: number) => {
		return axiosClient.get(
			`${QUESTIONS_ENDPOINT}?page=${pageNumber}&limit=${itemsPerPage}&selectWith=bounty`,
		);
	};

	getQuestionById = (id: string) => {
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.get(`${QUESTIONS_ENDPOINT}/${id}`, config);
	};
}

export default new Get();
