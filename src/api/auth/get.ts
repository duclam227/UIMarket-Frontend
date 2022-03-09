import axiosClient from '..';

class Get {
	get = () => {
		return axiosClient.get('/');
	};
}

export default new Get();
