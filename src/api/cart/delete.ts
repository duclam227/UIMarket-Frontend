import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const CART_ENDPOINT = 'api/v1/carts';

const jwt = getJwt();

class Delete {
  removeSingleProduct = (productId: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.delete(`${CART_ENDPOINT}/${productId}`, config);
  };
}

export default new Delete();
