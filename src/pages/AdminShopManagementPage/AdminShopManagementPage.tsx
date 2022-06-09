import React, { FC, useEffect, useState } from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { toast } from 'react-toastify';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import { BsSearch } from 'react-icons/bs';

import { Paginator } from '../../components';
import style from './AdminShopManagementPage.module.css';
import adminAPI from '../../api/admin';
import { shop } from '../../app/util/interfaces';
import ShopsTable from './ShopsTable';

const ITEMS_PER_PAGE = 5;

interface Props {
  intl: IntlShape;
}

const AdminShopManagementPage: FC<Props> = props => {
  const { intl } = props;
  const searchBarPlaceholder = intl.formatMessage({
    id: 'CommonNavbar.searchBarPlaceholder',
    defaultMessage: 'Search',
  });

  const [shops, setShops] = useState<shop[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const getAllShops = async () => {
      try {
        const res: any = await adminAPI.getAllShops(1, ITEMS_PER_PAGE);
        const { shops, totalPages, page } = res;
        setShops(shops);
        setCurrentPage(page);
        setTotalPages(totalPages);
      } catch (error) {
        toast.error('Cannot get data! An error has occurred');
        console.log(error);
      }
    };
    getAllShops();
  }, []);
  const goToPage = async (pageNumber: number) => {
    setShops(null);
    try {
      const res: any = await adminAPI.getAllShops(pageNumber, ITEMS_PER_PAGE);
      const { shops, totalPages } = res;
      setShops(shops);
      setCurrentPage(pageNumber);
      setTotalPages(totalPages);
    } catch (error) {
      toast.error('Cannot get data! An error has occurred');
      console.log(error);
    }
  };
  const handleDeactivateShop = async (shopId: string) => {
    const prevShops = shops!;

    const newShops = shops!.map(shop =>
      shopId === shop._id ? { ...shop, shopStatus: 0 } : { ...shop },
    );
    try {
      setShops(newShops);
      await adminAPI.deactivateShop(shopId);
      toast.success('Action completed successfully');
    } catch (error) {
      setShops(prevShops);
      toast.error('An unknown error occurred');
    }
  };
  const handleActivateShop = async (shopId: string) => {
    const prevShops = shops!;

    const newShops = shops!.map(shop =>
      shopId === shop._id ? { ...shop, shopStatus: 1 } : { ...shop },
    );
    try {
      setShops(newShops);
      await adminAPI.activateShop(shopId);
      toast.success('Action completed successfully');
    } catch (error) {
      setShops(prevShops);
      toast.error('An unknown error occurred');
    }
  };
  return (
    <Container className={`bg-white w-75 py-4 px-4 mt-3 rounded ${style.container}`}>
      <Form className={style.searchBarWrapper}>
        <div className={style.searchBar}>
          <BsSearch className={style.searchIcon} />
          <Form.Control
            type="text"
            placeholder={searchBarPlaceholder}
            // onChange={e => handleChange(e as any)}
          />
        </div>
      </Form>
      <ShopsTable
        shops={shops}
        onDeactivateShop={handleDeactivateShop}
        onActivateShop={handleActivateShop}
      />
      <Paginator
        totalNumberOfPages={totalPages}
        currentPage={currentPage}
        handleClickGoToPage={(number: number) => goToPage(number)}
      />
    </Container>
  );
};

export default injectIntl(AdminShopManagementPage);
