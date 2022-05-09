import { FC, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { getErrorMessage } from '../../app/util/index';
import { ProductList, PageWithNavbar, Paginator } from '../../components';

const ProductListPage: FC = () => {
  return (
    <PageWithNavbar>
      <Container>
        <ProductList></ProductList>
      </Container>
    </PageWithNavbar>
  );
};

export default ProductListPage;
