import axiosClient from '..';

class Get {
	getQuestionByPageNumber = (pageNumber: number, itemsPerPage: number) => {
		return axiosClient.get('api/v1/questions?page=' + pageNumber + '&limit=' + itemsPerPage);
	};
}

export default new Get();
