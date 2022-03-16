import axiosClient from '..';

const QUESTIONS_ENDPOINT = 'api/v1/questions';

class Get {
	getQuestionByPageNumber = (pageNumber: number | string, itemsPerPage: number) => {
		return axiosClient.get(
			QUESTIONS_ENDPOINT + '?page=' + pageNumber + '&limit=' + itemsPerPage,
		);
	};

	getQuestionById = (id: string) => {
		return axiosClient.get(QUESTIONS_ENDPOINT + '/' + id);
	};
}

export default new Get();
