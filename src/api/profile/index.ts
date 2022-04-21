import get from './get';
import post from './post';

const profileAPI = {
  getUserActivityById: get.getUserActivityById,
  getUserProfileInfoById: get.getUserProfileInfoById,
  updateUserProfileInfo: post.updateUserProfileInfo,
};

export default profileAPI;
