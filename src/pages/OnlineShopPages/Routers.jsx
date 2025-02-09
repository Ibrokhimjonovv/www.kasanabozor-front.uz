import React from "react";
import { Route } from "react-router-dom";

import HomePage from "./HomePage/index.jsx";
import DetailPage from "./DetailPage/index.jsx";
import CategoriesPage from './CategoriesPage/index.jsx';
import CategoryPage from "./CategoryPage/Categories.jsx";


const OnlineShopRoutes = (
  <Route path="/online-shop/*">
    <Route path="" element={<HomePage />} />
    <Route path="categories/" element={<CategoriesPage />} />
    <Route path="categories/:category/" element={<CategoryPage />}/>
    <Route path="details/:id/" element={<DetailPage />} />
  </Route>
);

export default OnlineShopRoutes;
