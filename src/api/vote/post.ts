import axiosClient from '..';

import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = '/api/v1/voting';

class Post {
	upvote = (type: string, questionId: string, objectId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.post(
			`${API_ENDPOINT}/upvote`,
			{
				type,
				questionId,
				objectId,
			},
			config,
		);
	};

	downvote = (type: string, questionId: string, objectId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.post(
			`${API_ENDPOINT}/downvote`,
			{
				type,
				questionId,
				objectId,
			},
			config,
		);
	};
}

export default new Post();
