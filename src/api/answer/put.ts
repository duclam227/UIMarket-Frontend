import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const ANSWERS_ENDPOINT = 'api/v1/answers';
const QUESTIONS_ENDPOINT = 'api/v1/questions';

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

	markBestAnswer = (questionId: string, answerId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.put(`${QUESTIONS_ENDPOINT}/${questionId}/${answerId}`, null, config);
	};
}

export default new Put();
