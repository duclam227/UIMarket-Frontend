import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const ANSWERS_ENDPOINT = 'api/v1/answers';
const jwt = getJwt();

class Get {
	getAllAnswersByPageNumber = (
		pageNumber: number | string,
		itemsPerPage: number,
		questionId: string | undefined,
	) => {
		return axiosClient.get(
			`${ANSWERS_ENDPOINT}/${questionId}?page=${pageNumber}&limit=${itemsPerPage}`,
		);
	};
}

export default new Get();
