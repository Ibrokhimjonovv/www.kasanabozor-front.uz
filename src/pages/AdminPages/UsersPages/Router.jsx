import React from 'react';
import { Route } from 'react-router-dom';
import HomemakersPage from './HomemakersPage';


const AdminUsersRoutes = (
  <Route path="users/*">
    <Route path="homemakers/" element={<HomemakersPage />} />
  </Route>
);

export default AdminUsersRoutes;
