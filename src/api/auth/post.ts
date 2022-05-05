import axiosClient from '..';
import { authCredentials } from '../../app/util/interfaces';

class Post {
	logIn = (credentials: authCredentials) => {
		return axiosClient.post('/api/v1/auth/login', {
			...credentials,
		});
	};

	logInWithGoogle = (tokenId: string) => {
		return axiosClient.post('/api/v1/auth/login-google', {
			tokenId,
		});
	};

	signUp = (credentials: authCredentials) => {
		return axiosClient.post('/api/v1/auth/register', {
			...credentials,
		});
	};
}

export default new Post();
