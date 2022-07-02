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
  AdminRefundDetailPage,
  AdminDashboardPage,
  AdminUserDetailPage,
} from '../../pages';

const AdminRoutes = () => {
  const currentUser = useSelector((state: State) => state.auth.user);
  return (
    <PageWithNavbar branch="admin">
      <Routes>
        <Route path="/refunds/:id" element={<AdminRefundDetailPage />} />
        <Route path="/refunds" element={<AdminRefundPage />} />
        <Route path="/shop-management" element={<AdminShopManagementPage />} />
        <Route path="/reports/:id" element={<AdminReportDetailPage />} />
        <Route path="/reports" element={<AdminReportPage />} />
        <Route path="/user-management/*" element={<AdminUserManagementPage />} />
        <Route path="/user-management/:id/*" element={<AdminUserDetailPage />} />
        <Route path="/user-management/:id" element={<Navigate to="marketplace" replace />} />
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </PageWithNavbar>
  );
};

export default AdminRoutes;
