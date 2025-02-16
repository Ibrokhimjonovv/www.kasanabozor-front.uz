import React from "react";
import { Route } from "react-router-dom";

import HomePage from "./HomePage/index.jsx";
import DetailPage from "./DetailPage/index.jsx";
import CategoriesPage from './CategoriesPage/index.jsx';
import CategoryPage from "./CategoryPage/index.jsx";

import NotFoundPage from "../NotFoundPage/index.jsx";


const OnlineShopRoutes = (
  <Route path="/online-shop/*">
    <Route path="" element={<HomePage />} />
    <Route path="categories" element={<CategoriesPage />} />
    <Route path="categories/:category" element={<CategoryPage />}/>
    <Route path="details/:meta" element={<DetailPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

export default OnlineShopRoutes;
