import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const COMMENTS_ENDPOINT = '/api/v1/comments';

class Post {
	addNewComment = (
		commentContent: string,
		questionId: string,
		rootId: string,
		rootType: string,
	) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		const data = {
			commentContent,
			rootType,
			rootId,
			questionId,
		};
		return axiosClient.post(`${COMMENTS_ENDPOINT}`, data, config);
	};
}

export default new Post();
