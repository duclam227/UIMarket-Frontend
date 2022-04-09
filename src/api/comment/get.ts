import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const COMMENTS_ENDPOINT = 'api/v1/comments';
const jwt = getJwt();

class Get {
	getCommentsByPageNumber = (
		answerId: string | undefined,
		pageNumber: number,
		itemPerPage: number,
	) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(
			`${COMMENTS_ENDPOINT}/${answerId}?page=${pageNumber}&limit=${itemPerPage}`,
			config,
		);
	};
}

export default new Get();
