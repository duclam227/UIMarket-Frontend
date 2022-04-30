import axiosClient from '..';
import { UserProfile } from '../../pages/EditProfilePage/EditProfilePage';
import { UserInfo } from '../../pages/EditPersonalInfoPage/EditPersonalInfoPage';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = 'api/v1/profile/info';

class Post {
  //I don't postfix with ById because you can only update your own profile so ById would be redundant
  updateUserProfile = (profileInfo: UserProfile) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const data = {
      customerName: profileInfo.name,
      customerBio: profileInfo.bio,
    };
    return axiosClient.post(API_ENDPOINT, data, config);
  };

  updateUserInfo = (userInfo: UserInfo) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const data = {
      customerEmail: userInfo.email,
      customerDOB: userInfo.dob,
      customerPhone: userInfo.phone,
    };
    return axiosClient.post(API_ENDPOINT, data, config);
  };
  updateUserAvatar = (avatarUrl: string) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const data = {
      customerAvatar: avatarUrl,
    };
    return axiosClient.post(API_ENDPOINT, data, config);
  };
}

export default new Post();
