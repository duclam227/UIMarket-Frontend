import post from './post';
import get from './get';

const authAPI = {
	//get
	getUserFromToken: get.getUserFromToken,

	//post
	logIn: post.logIn,
	logInWithGoogle: post.logInWithGoogle,
	signUp: post.signUp,
};

export default authAPI;
