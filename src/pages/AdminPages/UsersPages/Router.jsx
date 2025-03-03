import React from 'react';
import { Route } from 'react-router-dom';

import HomemakersPage from './HomemakersPage';
import ModeratorsPage from './ModeratorsPage';
import AdminsPage from './AdminsPage';
import UsersPage from './UsersPage';
import CreateUserPage from './CreateUserPage';

import Forward from "./Forward";

const AdminUsersRoutes = (
  <Route path="users/*" element={<Forward />}>
    <Route path="all/" element={<UsersPage />} />
    <Route path="admins/" element={<AdminsPage />} />
    <Route path="mods/" element={<ModeratorsPage />} />
    <Route path="homemakers/" element={<HomemakersPage />} />
		<Route path="create/" element={<CreateUserPage />} />
  </Route>
);

export default AdminUsersRoutes;
