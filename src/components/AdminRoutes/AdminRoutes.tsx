import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { State } from '../../redux/store';
import { PageWithNavbar } from '../';
import { AdminShopManagementPage, AdminUserManagementPage } from '../../pages';
const ADMIN_TAB = {
  'user-management': <AdminUserManagementPage />,
  'shop-management': <AdminShopManagementPage />,
};

const AdminRoutes = () => {
  const params = useParams();
  const currentUser = useSelector((state: State) => state.auth.user);
  // console.log(currentUser);
  // if (!currentUser || !currentUser.isAdmin) return <Navigate to="/forbidden" replace />;
  if (!(params.tab! in ADMIN_TAB)) return <Navigate to="/not-found" replace />;
  else
    return (
      <PageWithNavbar branch="admin">
        {params.tab ? (
          ADMIN_TAB[params.tab as keyof typeof ADMIN_TAB]
        ) : (
          <Navigate to="admin/user-management" replace />
        )}
      </PageWithNavbar>
    );
};

export default AdminRoutes;
