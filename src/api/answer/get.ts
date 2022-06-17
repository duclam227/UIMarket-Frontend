import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const ANSWERS_ENDPOINT = 'api/v1/answers';


class Get {
	getAllAnswersByPageNumber = (
		pageNumber: number | string,
		itemsPerPage: number,
		questionId: string | undefined,
	) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(
			`${ANSWERS_ENDPOINT}/${questionId}?page=${pageNumber}&limit=${itemsPerPage}`,
			config,
		);
	};
}

export default new Get();
