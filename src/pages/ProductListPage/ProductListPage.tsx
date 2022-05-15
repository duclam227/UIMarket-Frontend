import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import productAPI from '../../api/product/index';

import { getErrorMessage } from '../../app/util/index';
import { ProductList, PageWithNavbar, Paginator } from '../../components';
import style from './ProductListPage.module.css';

const ITEMS_PER_PAGE = 20;

const ProductListPage: FC = () => {
  const searchResultMessage = (
    <FormattedMessage
      id="ProductListPage.searchResultMessage"
      defaultMessage="Showing search results for "
    />
  );

  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<Array<any>>([]);

  const fetchPaginatedData = async (
    pageNumber: number,
    itemPerPage: number,
    keyword?: string | null,
    filter?: string | null,
    sort?: string | null,
  ) => {
    if (keyword)
      try {
        return await productAPI.searchProducts(
          keyword,
          pageNumber,
          itemPerPage,
          filter,
          sort,
        );
      } catch (error) {
        return error;
      }
    try {
      return await productAPI.getAllProductsByPageNumber(pageNumber, itemPerPage);
    } catch (error) {
      return error;
    }
  };

  const mapDataToView = (page: number, products: any[], totalPages: number) => {
    setCurrentPage(page);
    setProducts(products);
    setTotalPages(totalPages);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPaginatedData(1, ITEMS_PER_PAGE)
      .then((res: any) => {
        console.log(res);
        const { totalPages, products, page } = res;
        mapDataToView(page, products, totalPages);
        setIsLoading(false);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        setError(errorMsg);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getSearchProducts();

    async function getSearchProducts() {
      setIsLoading(true);
      try {
        const data: any = await fetchPaginatedData(
          1,
          ITEMS_PER_PAGE,
          searchKeyword,
          searchParams.get('filter'),
          searchParams.get('sort'),
        );
        const { totalPages, products, page } = data;
        mapDataToView(page, products, totalPages);
        setIsLoading(false);
      } catch (error) {
        const errorMsg = getErrorMessage(error);
        setError(errorMsg);
        setIsLoading(false);
      }
    }
  }, [searchParams]);

  const goToPage = (pageNumber: number) => {
    setIsLoading(true);
    fetchPaginatedData(pageNumber, ITEMS_PER_PAGE)
      .then((res: any) => {
        const { totalPages, products, page } = res;
        mapDataToView(page, products, totalPages);
        setIsLoading(false);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        setError(errorMsg);
        setIsLoading(false);
      });
  };
  return (
    <PageWithNavbar>
      <Container>
        {searchKeyword ? (
          <Row className={`mt-3`}>
            <h5>
              {searchResultMessage} "
              <span className={style.searchQuery}>{searchKeyword}</span>"
            </h5>
          </Row>
        ) : null}
        {isLoading ? <p>loading...</p> : <ProductList productList={products} />}

        <Paginator
          totalNumberOfPages={totalPages}
          currentPage={currentPage}
          handleClickGoToPage={(number: number) => goToPage(number)}
        />
      </Container>
    </PageWithNavbar>
  );
};

export default ProductListPage;
