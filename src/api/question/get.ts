import axiosClient from '..';

const QUESTIONS_ENDPOINT = 'api/v1/questions';

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
		return axiosClient.get(`${QUESTIONS_ENDPOINT}/${id}`);
	};
}

export default new Get();
