import axiosClient from '..';

class Get {
	getUserFromToken = (jwt: string) => {
		return axiosClient.get('/api/v1/auth/login', {
			headers: { Authorization: `Bearer ${jwt}` },
		});
	};
}

export default new Get();
