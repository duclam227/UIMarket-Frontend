import { FC, useEffect, useState, ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import productAPI from '../../api/product/index';

import { getErrorMessage } from '../../app/util/index';
import { ProductList, PageWithNavbar, Paginator } from '../../components';
import style from './ProductListPage.module.css';

const ITEMS_PER_PAGE = 20;

interface Props {
  intl: IntlShape;
}

const ProductListPage: FC<Props> = props => {
  const { intl } = props;

  const searchResultMessage = (
    <FormattedMessage
      id="ProductListPage.searchResultMessage"
      defaultMessage="Showing search results for "
    />
  );

  //Sort
  const sortBySelectLabel = <FormattedMessage id="ProductListPage.sortBySelectLabel" />;
  const sortOptionNameAscLabel = intl.formatMessage({
    id: 'ProductListPage.sortOptionNameAsc',
  });
  const sortOptionNameDesLabel = intl.formatMessage({
    id: 'ProductListPage.sortOptionNameDes',
  });
  const sortOptionPriceAscLabel = intl.formatMessage({
    id: 'ProductListPage.sortOptionPriceAsc',
  });
  const sortOptionPriceDesLabel = intl.formatMessage({
    id: 'ProductListPage.sortOptionPriceDes',
  });
  //Filter
  const priceFilterSelectLabel = <FormattedMessage id="ProductListPage.priceFilterSelectLabel" />;
  const priceFilterOptionAllLabel = intl.formatMessage({
    id: 'ProductListPage.priceFilterOptionAll',
  });
  const priceFilterOptionFreeLabel = intl.formatMessage({
    id: 'ProductListPage.priceFilterOptionFree',
  });
  const priceFilterOption019Label = intl.formatMessage({
    id: 'ProductListPage.priceFilterOption019',
  });
  const priceFilterOption2039Label = intl.formatMessage({
    id: 'ProductListPage.priceFilterOption2039',
  });
  const priceFilterOption4059Label = intl.formatMessage({
    id: 'ProductListPage.priceFilterOption4059',
  });
  const priceFilterOption6079Label = intl.formatMessage({
    id: 'ProductListPage.priceFilterOption6079',
  });
  const priceFilterOption80Label = intl.formatMessage({
    id: 'ProductListPage.priceFilterOption80',
  });

  const sortOptions = [
    { value: 'name-asc', label: sortOptionNameAscLabel },
    { value: 'name-des', label: sortOptionNameDesLabel },
    { value: 'money-asc', label: sortOptionPriceAscLabel },
    { value: 'money-des', label: sortOptionPriceDesLabel },
  ];

  const filterOptions = [
    { value: '', label: priceFilterOptionAllLabel },
    { value: 'money-free', label: priceFilterOptionFreeLabel },
    { value: 'money-0-19', label: priceFilterOption019Label },
    { value: 'money-20-39', label: priceFilterOption2039Label },
    { value: 'money-40-59', label: priceFilterOption4059Label },
    { value: 'money-60-79', label: priceFilterOption6079Label },
    { value: 'money-80', label: priceFilterOption80Label },
  ];

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
    keyword?: string | null,
    filter?: string | null,
    sort?: string | null,
  ) => {
    if (keyword) {
      try {
        return await productAPI.searchProducts(
          keyword,
          pageNumber,
          itemPerPage,
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

    async function getSearchProducts() {
      setIsLoading(true);
      try {
        const data: any = await fetchPaginatedData(
          1,
          ITEMS_PER_PAGE,
          searchParams.get('keyword'),
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
  const handleContentControlChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    searchParams.set(name, value);
    setSearchParams(searchParams.toString());
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

        {/* Filter & sort bar */}
        <Row className={`${style.contentControlBar} pt-3 pb-1 w-100`}>
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
        </Row>
        {isLoading ? (
          <Row className={`mt-5 d-flex justify-content-center`}>
            <Spinner animation="border" />
          </Row>
        ) : (
          <ProductList productList={products} />
        )}

        <Paginator
          totalNumberOfPages={totalPages}
          currentPage={currentPage}
          handleClickGoToPage={(number: number) => goToPage(number)}
        />
      </Container>
    </PageWithNavbar>
  );
};

export default injectIntl(ProductListPage);
