import React from "react";
import { Route } from "react-router-dom";

import ProfileLayout from "./Layout";

import ProfileDetailPage from "./Pages/home";
import ProductsListPage from "./Pages/products";

const ProfileRoutes: React.ReactElement = (
  <Route path="/profile/*" element={<ProfileLayout />}>
    <Route path="overview/" element={<ProfileDetailPage />} />
		<Route path="products/" element={<ProductsListPage />} />
  </Route>
);

export default ProfileRoutes;
