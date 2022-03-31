import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = 'api/v1/answers';

class Delete {
	deleteAnswer = (answerId: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.delete(`${API_ENDPOINT}/${answerId}`, config);
	};
}

export default new Delete();
