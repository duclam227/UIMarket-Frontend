import React, { FC, useEffect, useState } from "react";
import { FormattedMessage, injectIntl, IntlShape } from "react-intl";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getErrorMessage } from "../../app/util";
import { errors as errorCodes } from "../../app/util/errors";
import { customer } from "../../app/util/interfaces";
import profileAPI from "../../api/profile";

import { Nav, Spinner } from "react-bootstrap";
import SectionUserPanel from "./SectionUserPanel";

import style from './AdminUserDetailPage.module.css';
import adminAPI from "../../api/admin";
import classNames from "classnames";
import SectionUserQuestions from "./SectionUserQuestions";
import SectionUserAnswers from "./SectionUserAnswers";
import SectionUserOrders from "./SectionUserOrders";

interface IProps {
  intl: IntlShape;
}

const AdminUserDetailPage: FC<IProps> = (props) => {
  const { intl } = props;
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<customer | null>(null);
  const [activity, setActivity] = useState<any>(null);
  const [productBought, setProductBought] = useState<any>(null);
  const [orders, setOrders] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);

    const getUserProfile = () => {
      profileAPI.getUserProfileInfoById(id!)
        .then((res: any) => {
          const { user } = res;
          setUser(user);
        })
    }

    const getUserActivity = () => {
      profileAPI.getUserActivityById(id!)
        .then((res: any) => {
          setActivity({ ...res });
        })
    }

    const getProductBought = () => {
      adminAPI.getUserDetails(id!)
        .then((res: any) => {
          setProductBought(res.productBought);
        })
    }

    const getOrders = () => {
      adminAPI.getShopOrders(id!)
        .then((res: any) => {
          setOrders(res.products);
        })
    }

    try {
      getUserProfile();
      getUserActivity();
      getProductBought();
      getOrders();
      setIsLoading(false);
    }
    catch (error) {
      const errorMsg = getErrorMessage(error);
      const errorCode: any =
        errorCodes.profile[errorMsg as keyof typeof errorCodes.profile];
      toast.error(intl.formatMessage({ id: `Profile.${errorCode}` }));
    }

  }, [id])

  return (
    <div className={style.container}>
      {isLoading
        ? <Spinner animation="border" />
        : <>
          <SectionUserPanel user={user!} activity={{ ...activity, productBought }} />
          <div className={style.branchDetail}>
            <div className={style.tabRow}>
              <NavLink
                className={
                  ({ isActive }: { isActive: any }) => isActive ? classNames(style.tabButton, style.active) : style.tabButton
                }
                to='marketplace'
              >
                <FormattedMessage id='AdminUserDetailPage.Marketplace' />
              </NavLink>
              <NavLink
                className={
                  ({ isActive }: { isActive: any }) => isActive ? classNames(style.tabButton, style.active) : style.tabButton
                }
                to='forum'
              >
                <FormattedMessage id='AdminUserDetailPage.Forum' />
              </NavLink>
            </div>

            <div className={style.tabContent}>
              <Routes>
                <Route path='marketplace' element={<>
                  <section className={style.section}>
                    <SectionUserOrders orders={orders!} />
                  </section>
                </>}
                />
                <Route path='forum' element={<>
                  <section className={style.section}>
                    <SectionUserQuestions questions={activity?.questions!} />
                  </section>
                  <section className={style.section}>
                    <SectionUserAnswers answers={activity?.answers!} />
                  </section>
                </>}
                />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
};

export default injectIntl(AdminUserDetailPage);