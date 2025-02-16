import React from 'react';
import { Route } from 'react-router-dom';

import ProfileLayout from './Layout.jsx';

import HomePage from './HomePage/index.jsx';
import UploadProductsPage from './UploadProductsPage/index.jsx';


const ProfileRoutes = (
  <Route path="/profile/*" element={<ProfileLayout />}>
    <Route path="overview/" element={<HomePage />} />
    <Route path="upload/products/" element={<UploadProductsPage />} />
  </Route>
);

export default ProfileRoutes;
