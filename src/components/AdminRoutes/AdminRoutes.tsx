import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { State } from '../../redux/store';
import { PageWithNavbar } from '../';
import {
  AdminReportDetailPage,
  AdminReportPage,
  AdminShopManagementPage,
  AdminUserManagementPage,
  AdminRefundPage,
} from '../../pages';

const AdminRoutes = () => {
  const currentUser = useSelector((state: State) => state.auth.user);
  // console.log(currentUser);
  // if (!currentUser || !currentUser.isAdmin) return <Navigate to="/forbidden" replace />;
  // if (!(params.tab! in ADMIN_TAB)) return <Navigate to="/not-found" replace />;
  // else
  return (
    <PageWithNavbar branch="admin">
      <Routes>
        <Route path="/refunds" element={<AdminRefundPage />} />
        <Route path="/shop-management" element={<AdminShopManagementPage />} />
        <Route path="/reports/:id" element={<AdminReportDetailPage />} />
        <Route path="/reports" element={<AdminReportPage />} />
        <Route path="/user-management" element={<AdminUserManagementPage />} />
        <Route path="/" element={<Navigate to="/user-management" replace />} />
      </Routes>
    </PageWithNavbar>
  );
};

export default AdminRoutes;
