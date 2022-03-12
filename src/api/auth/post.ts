import axiosClient from '..';
import { authCredentials } from '../../app/util/interfaces';

class Post {
	logIn = (credentials: authCredentials) => {
		return axiosClient.post('/api/v1/auth/login', {
			...credentials,
		});
	};

	signUp = (credentials: authCredentials) => {
		return axiosClient.post('/api/v1/auth/register', {
			...credentials,
		});
	};
}

export default new Post();
