import axiosClient from '..';

const PRODUCT_ENDPOINT = 'api/v1/products';

class Get {
  getProductById = (id: string) => {
    return axiosClient.get(`${PRODUCT_ENDPOINT}/info/${id}`);
  };

  getAllProductsByPageNumber = (
    pageNumber: number | string,
    itemsPerPage: number,
    filter?: string | null,
    sort?: string | null,
  ) => {
    return axiosClient.get(
      `${PRODUCT_ENDPOINT}?page=${pageNumber}&limit=${itemsPerPage}${
        filter ? `&filter=${filter}` : ''
      }${sort ? `&sort=${sort}` : ''}`,
    );
  };

  getTrendingProducts = (pageNumber: number | string, itemsPerPage: number) => {
    return axiosClient.get(
      `${PRODUCT_ENDPOINT}?page=${pageNumber}&limit=${itemsPerPage}&sort=sort-des`,
    );
  };

  searchProduct = (
    query: string,
    pageNumber: number | string,
    itemsPerPage: number,
    filter?: string | null,
    sort?: string | null,
  ) => {
    return axiosClient.get(
      `${PRODUCT_ENDPOINT}/search/${query}?page=${pageNumber}&limit=${itemsPerPage}${
        filter ? `&filter=${filter}` : ''
      }${sort ? `&sort=${sort}` : ''}`,
    );
  };
}

export default new Get();
