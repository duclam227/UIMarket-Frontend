import axiosClient from '..';
import { authCredentials } from '../../app/util/interfaces';

class Post {
	logIn = (credentials: authCredentials) => {
		console.log(credentials);
		return axiosClient.post('/api/v1/auth', {
			...credentials,
		});
	};
}

export default new Post();
