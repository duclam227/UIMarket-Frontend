import axiosClient from '..';
import { ProfileInfo } from '../../pages/EditProfilePage/EditProfilePage';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = 'api/v1/profile/info';

class Post {
  //I don't postfix with ById because you can only update your own profile so ById would be redundant
  updateUserProfileInfo = (profileInfo: ProfileInfo) => {
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
}

export default new Post();
