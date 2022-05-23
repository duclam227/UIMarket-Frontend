import React, { FC, ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import style from './ProductListPage.module.css';

interface Props {
  intl: IntlShape;
}

const Sidebar: FC<Props> = props => {
  const { intl } = props;
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
  const priceFilterSelectLabel = (
    <FormattedMessage id="ProductListPage.priceFilterSelectLabel" />
  );
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
    { value: '', label: priceFilterOptionAllLabel },
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    searchParams.set(name, value);
    setSearchParams(searchParams.toString());
  };

  return (
    <div className={`${style.sidebarWrapper} py-3 px-3`}>
      
      <p className={`fw-bold mb-1`}> {sortBySelectLabel} </p>
      {sortOptions.map(option => (
        <div
          className="d-flex justify-content-between align-items-center ps-3"
          key={option.value}
        >
          <span id={option.value}>{option.label}</span>
          <Form.Check
            id={option.value}
            type={'radio'}
            name="sort"
            value={option.value}
            onChange={e => handleChange(e)}
          />
        </div>
      ))}

      <p className={`fw-bold mt-3 mb-1`}>{priceFilterSelectLabel}</p>
      {filterOptions.map(option => (
        <div
          className="d-flex justify-content-between align-items-center ps-3"
          key={option.value}
        >
          <span id={option.value}>{option.label}</span>
          <Form.Check
            id={option.value}
            type={'radio'}
            name="filter"
            value={option.value}
            onChange={e => handleChange(e)}
          />
        </div>
      ))}
    </div>
  );
};

export default injectIntl(Sidebar);
