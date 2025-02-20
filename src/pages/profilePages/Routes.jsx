import React from 'react';
import { Route } from 'react-router-dom';

import ProfileLayout from './Layout.jsx';

import HomePage from './HomePage/index.jsx';
import UploadProductsPage from './UploadProductsPage/index.jsx';
import EditProfilePage from './EditProfilePage/index.jsx';


const ProfileRoutes = (
  <Route path="/profile/*" element={<ProfileLayout />}>
    <Route path="overview/" element={<HomePage />} />
    <Route path="upload/products/" element={<UploadProductsPage />} />
    <Route path="edit/" element={<EditProfilePage />} />
  </Route>
);

export default ProfileRoutes;
