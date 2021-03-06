import axiosClient from '..';
import { question } from '../../app/util/interfaces';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = '/api/v1/questions';

class Delete {
	deleteQuestion = (questionId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.delete(`${API_ENDPOINT}/${questionId}`, config);
	};
}

export default new Delete();
