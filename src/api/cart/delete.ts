import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const CART_ENDPOINT = 'api/v1/carts';

class Delete {
  removeSingleProduct = (productId: string) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.delete(`${CART_ENDPOINT}/${productId}`, config);
  };
}

export default new Delete();
