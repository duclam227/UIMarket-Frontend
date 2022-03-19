import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const ANSWERS_ENDPOINT = '/api/v1/answers';

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
}

export default new Post();
