import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const COMMENTS_ENDPOINT = 'api/v1/comments';

class Put {
	updateComment = (commentContent: string, commentId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.put(
			`${COMMENTS_ENDPOINT}/${commentId}`,
			{
				commentContent,
			},
			config,
		);
	};
}

export default new Put();
