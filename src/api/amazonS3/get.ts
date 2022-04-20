import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = '/api/v1/file/upload';

class Get {
	getSignedUrl = (folder: string) => {
		let isPrivate: boolean = false;
		if (folder === 'products') {
			isPrivate = true;
		}

		const imageUploadApiEndpoint = `${API_ENDPOINT}?folder=${folder}&isPrivate=${isPrivate}`;
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(imageUploadApiEndpoint, config);
	};
}

export default new Get();
