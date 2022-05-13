import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const CART_ENDPOINT = 'api/v1/carts';

class Get {
  getAllCartProducts = () => {
    const jwt = getJwt();
    const config = {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    };
    return axiosClient.get(`${CART_ENDPOINT}`, config);
  };
}

export default new Get();
