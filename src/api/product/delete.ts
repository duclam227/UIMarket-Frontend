import axiosClient from '..';
import { product } from '../../app/util/interfaces';
import { getJwt } from '../../app/util/authHelpers';
const SHOP_ENDPOINT = '/api/v1/shop';

class Delete {
  deleteProduct = (id: string) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    return axiosClient.delete(`${SHOP_ENDPOINT}/product/${id}`, config);
  };
}

export default new Delete();
