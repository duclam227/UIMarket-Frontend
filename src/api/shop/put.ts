import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const SHOP_ENDPOINT = '/api/v1/shop';

class Put {
  updateShop = (shopInfo: any) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    return axiosClient.put(`${SHOP_ENDPOINT}/`, shopInfo, config);
  };
}

export default new Put();
