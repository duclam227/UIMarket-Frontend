import get from './get';
import post from './post';

const profileAPI = {
  getUserActivityById: get.getUserActivityById,
  getUserProfileInfoById: get.getUserProfileInfoById,
  updateUserProfile: post.updateUserProfile,
  updateUserInfo: post.updateUserInfo,
  updateUserAvatar: post.updateUserAvatar,
};

export default profileAPI;
