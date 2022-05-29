import React, { FC, useEffect, useState } from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { BsSearch, BsChevronDown } from 'react-icons/bs';

import { PageWithNavbar, Paginator } from '../../components';
import style from './AdminUserManagementPage.module.css';
import { customer } from '../../app/util/interfaces';
import adminAPI from '../../api/admin';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 5;

interface Props {
  intl: IntlShape;
}

const AdminUserManagementPage: FC<Props> = props => {
  const { intl } = props;
  const searchBarPlaceholder = intl.formatMessage({
    id: 'CommonNavbar.searchBarPlaceholder',
    defaultMessage: 'Search',
  });

  const [users, setUsers] = useState<customer[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res: any = await adminAPI.getAllUsers(1, ITEMS_PER_PAGE);
        const { users, totalPages, page } = res;
        console.log(users);
        setUsers(users);
        setCurrentPage(page);
        setTotalPages(totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  const goToPage = async (pageNumber: number) => {
    setUsers(null);
    try {
      const res: any = await adminAPI.getAllUsers(pageNumber, ITEMS_PER_PAGE);
      const { users, totalPages } = res;
      setUsers(users);
      setCurrentPage(pageNumber);
      setTotalPages(totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeactivateUser = async (userId: string) => {
    const prevUsers = users!;

    const newUsers = users!.map(user =>
      userId === user._id ? { ...user, customerStatus: -1 } : { ...user },
    );
    try {
      setUsers(newUsers);
      await adminAPI.deactivateUser(userId);
      toast.success('Action completed successfully');
    } catch (error) {
      setUsers(prevUsers);
      toast.error('An unknown error occurred');
    }
  };
  const onActivateUser = async (userId: string) => {
    const prevUsers = users!;

    const newUsers = users!.map(user =>
      userId === user._id ? { ...user, customerStatus: 1 } : { ...user },
    );
    try {
      setUsers(newUsers);
      await adminAPI.activateUser(userId);
      toast.success('Action completed successfully');
    } catch (error) {
      setUsers(prevUsers);
      toast.error('An unknown error occurred');
    }
  };
  const thBstrapClass = 'fw-bold text-muted';
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

        <table className="w-100 mt-3">
          <colgroup>
            <col span={1} style={{ width: '10%' }} />
            <col span={1} style={{ width: '20%' }} />
            <col span={1} style={{ width: '50%' }} />
            <col span={1} style={{ width: '20%' }} />
          </colgroup>
          <thead className={`${style.thead}`}>
            <tr>
              <th scope="col" className={` ${style.th}`}>
                <Form.Check />
              </th>
              <th scope="col" className={`${thBstrapClass} ${style.th}`}>
                NAME
              </th>
              <th scope="col" className={`${thBstrapClass} ${style.th}`}>
                EMAIL
              </th>
              <th
                scope="col"
                className={`${thBstrapClass} ${style.th} d-flex justify-content-end`}
              >
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {!users ? (
              <tr>
                <td colSpan={4} className={`text-center ${style.td}`}>
                  <Spinner animation="border" />
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id}>
                  <td className={`${style.td}`}>
                    <Form.Check />
                  </td>
                  <td className={`fw-bold ${style.td}`}>{user.customerName}</td>
                  <td className={`${style.td}`}>{user.customerEmail}</td>
                  <td className={`${style.td} d-flex justify-content-end`}>
                    <div className="dropdown">
                      <div
                        id="settingsMenuDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className={`${style.actionBtn}`}
                      >
                        <span className={`me-2`}>Actions</span>
                        <BsChevronDown style={{ color: '#5c5c5c' }} />
                      </div>
                      <ul
                        className="dropdown-menu position-absolute mt-1"
                        aria-labelledby="settingsMenuDropdown"
                      >
                        <li>
                          {user.customerStatus >= 0 ? (
                            <span
                              onClick={() => onDeactivateUser(user._id)}
                              className="dropdown-item"
                            >
                              Deactivate
                            </span>
                          ) : (
                            <span
                              onClick={() => onActivateUser(user._id)}
                              className="dropdown-item"
                            >
                              Activate
                            </span>
                          )}
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Paginator
          totalNumberOfPages={totalPages}
          currentPage={currentPage}
          handleClickGoToPage={(number: number) => goToPage(number)}
        />
      </Container>
  );
};

export default injectIntl(AdminUserManagementPage);
