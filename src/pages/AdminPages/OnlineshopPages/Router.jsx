import React from 'react';
import { Route } from 'react-router-dom';

import Forward from "./Forward";
import ProductsPage from './ProductsPages';

const OnlineshopRoutes = (
  <Route path="products/*" element={<Forward />}>
    <Route path="products/" element={<ProductsPage />}/>
  </Route>
);

export default OnlineshopRoutes;
