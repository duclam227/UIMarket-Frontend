import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = '/api/v1/file';

class Get {
	getSignedUrl = (folder: string) => {
		let isPrivate: boolean = false;
		if (folder === 'products') {
			isPrivate = true;
		}

		const imageUploadApiEndpoint = `${API_ENDPOINT}/upload?folder=${folder}&isPrivate=${isPrivate}`;
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(imageUploadApiEndpoint, config);
	};

	downloadFile = (folder: string, isPrivate: boolean, id: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		const folderInLink = `${folder}/${id}`;

		return axiosClient.get(
			`${API_ENDPOINT}/download?folder=${folderInLink}&isPrivate=${isPrivate}`,
			config,
		);
	};
}

export default new Get();
