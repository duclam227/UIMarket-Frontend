import { FC, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import productAPI from '../../api/product/index';

import { getErrorMessage } from '../../app/util/index';
import { ProductList, PageWithNavbar, Paginator } from '../../components';



const ITEMS_PER_PAGE = 20;

const ProductListPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<Array<any>>([]);

  useEffect(() => {
    setIsLoading(true);
    productAPI
      .getAllProductsByPageNumber(1, ITEMS_PER_PAGE)
      .then((res: any) => {
        console.log(res);
        const { totalPages, products, page } = res;
        setCurrentPage(page);
        setProducts(products);
        setTotalPages(totalPages);
        setIsLoading(false);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        setError(errorMsg);
        setIsLoading(false);
      });
  }, []);

  const goToPage = (pageNumber: number) => {
    setIsLoading(true);
    productAPI
      .getAllProductsByPageNumber(pageNumber, ITEMS_PER_PAGE)
      .then((res: any) => {
        const { totalPages, products, page } = res;
        setCurrentPage(page);
        setProducts(products);
        setTotalPages(totalPages);
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
