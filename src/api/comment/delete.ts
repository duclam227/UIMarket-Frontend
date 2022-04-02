import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = 'api/v1/comments';

class Delete {
	deleteComment = (commentId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.delete(`${API_ENDPOINT}/${commentId}`, config);
	};
}

export default new Delete();
