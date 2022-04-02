import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const COMMENTS_ENDPOINT = 'api/v1/comments';
const jwt = getJwt();

class Get {
	getAllComments = (answerId: string | undefined) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(`${COMMENTS_ENDPOINT}/${answerId}`, config);
	};
}

export default new Get();
