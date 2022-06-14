import { FC, useEffect, useState, ChangeEvent } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import productAPI from '../../api/product/index';

import { getErrorMessage } from '../../app/util/index';
import { ProductList, PageWithNavbar, Paginator, EmptyState } from '../../components';
import style from './ProductListPage.module.css';
import Sidebar from './Sidebar';
import { Button } from 'react-bootstrap';

const ITEMS_PER_PAGE = 20;

interface Props {
  intl: IntlShape;
}

const ProductListPage: FC<Props> = props => {
  const { intl } = props;
  const { id } = useParams();

  const searchResultMessage = (
    <FormattedMessage
      id="ProductListPage.searchResultMessage"
      defaultMessage="Showing search results for "
    />
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<Array<any>>([]);

  const fetchPaginatedData = async (
    pageNumber: number,
    itemPerPage: number,
    category?: string | null,
    filter?: string | null,
    sort?: string | null,
  ) => {
    if (category) {
      try {
        return await productAPI.getCategoryProductsByPageNumber(
          pageNumber,
          itemPerPage,
          category!,
          filter,
          sort,
        );
      } catch (error) {
        throw error;
      }
    } else {
      try {
        return await productAPI.getAllProductsByPageNumber(
          pageNumber,
          itemPerPage,
          filter,
          sort,
        );
      } catch (error) {
        throw error;
      }
    }
  };

  const mapDataToView = (page: number, products: any[], totalPages: number) => {
    setCurrentPage(page);
    setProducts(products);
    setTotalPages(totalPages);
  };

  useEffect(() => {
    getSearchProducts();

    window.scrollTo(0, 0);

    async function getSearchProducts() {
      setIsLoading(true);
      try {
        const data: any = await fetchPaginatedData(
          1,
          ITEMS_PER_PAGE,
          id!,
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
  }, [searchParams, id]);

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
      <Container fluid>
        <Row>
          <Col className={`p-0`} md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            {searchKeyword ? (
              <Row className={`mt-3`}>
                <h5>
                  {searchResultMessage} "
                  <span className={style.searchQuery}>{searchKeyword}</span>"
                </h5>
              </Row>
            ) : null}

            {isLoading ? (
              <Row className={`mt-5 d-flex justify-content-center`}>
                <Spinner animation="border" />
              </Row>
            ) : products && products.length > 0 ? (
              <ProductList productList={products} />
            ) : (
              <EmptyState
                img="error-nothing"
                messageId="ProductListPage.noItems"
                btn={true}
                btnMessageId="PurchaseHistoryPage.continueShoppingMessage"
                btnDestination="/products"
              />
            )}

            <Paginator
              totalNumberOfPages={totalPages}
              currentPage={currentPage}
              handleClickGoToPage={(number: number) => goToPage(number)}
            />
          </Col>
        </Row>
      </Container>
    </PageWithNavbar>
  );
};

export default injectIntl(ProductListPage);

/* Filter & sort bar */
/* <Row className={`${style.contentControlBar} pt-3 pb-1 w-100`}>
              <Col lg={{ span: 3 }} className={`d-flex align-items-center`}>
                <h6 className="text-nowrap me-3 p-0 m-0">{sortBySelectLabel} </h6>
                <Form.Select name="sort" onChange={e => handleContentControlChange(e)}>
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col lg={{ span: 3 }} className={`d-flex align-items-center`}>
                <h6 className="text-nowrap me-3 p-0 m-0">Price range: </h6>
                <Form.Select name="filter" onChange={e => handleContentControlChange(e)}>
                  {filterOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row> */
