import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const ANSWERS_ENDPOINT = 'api/v1/answers';
const jwt = getJwt();

class Put {
	updateAnswer = (answerContent: string, answerId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.put(
			`${ANSWERS_ENDPOINT}/${answerId}`,
			{
				answerContent,
			},
			config,
		);
	};
}

export default new Put();
