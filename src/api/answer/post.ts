import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const ANSWERS_ENDPOINT = '/api/v1/answers';
const COMMENTS_ENDPOINT = '/api/v1/comments';

class Post {
	addAnswer = (answerContent: string, questionId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		const data = {
			answerContent,
		};
		return axiosClient.post(`${ANSWERS_ENDPOINT}/${questionId}`, data, config);
	};

	addComment = (commentContent: string, answerId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		const data = {
			commentContent,
		};
		return axiosClient.post(`${COMMENTS_ENDPOINT}/${answerId}`, data, config);
	};
}

export default new Post();
