import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';
import { product } from '../../app/util/interfaces';

const SHOP_ENDPOINT = '/api/v1/shop';

class Put {
  activateProduct = (id: string) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.put(
      `${SHOP_ENDPOINT}/product/active/${id}`,
      null,
      config,
    );
  };
  deactivateProduct = (id: string) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.put(
      `${SHOP_ENDPOINT}/product/deactive/${id}`,
      null,
      config,
    );
  };
}

export default new Put();
