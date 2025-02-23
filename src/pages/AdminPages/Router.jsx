import React from 'react';
import { Route } from 'react-router-dom';

import AdminLayout from './Layout.jsx';
import DashboardPage from './DashboardPage/index.jsx';
import AdminUsersRoutes from './UsersPages/Router.jsx';


const AdminRoutes = (
  <Route path="/admin/*" element={<AdminLayout />}>
    <Route path='dashboard/' element={<DashboardPage />}/>
    {AdminUsersRoutes}
  </Route>
);

export default AdminRoutes;
