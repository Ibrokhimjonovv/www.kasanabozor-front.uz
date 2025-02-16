import React from "react";
import { Route } from "react-router-dom";

import HomePage from "./HomePage/index.jsx";
import DetialsPage from "./DetailsPage/index.jsx";
import CategoryDetailsPage from "./CategoryDetailsPage/index.jsx";
import DocumentsPage from "./DocumentsPage/index.jsx";
import DocumentDetailsPage from "./DocumentDetailsPage/index.jsx";


const NewsRoutes = (
  <Route path="/news/*">
    <Route path="" element={<HomePage />} />
    <Route path="_/details/:id/" element={<DetialsPage />} />
    <Route path="categories/details/:category/" element={<CategoryDetailsPage />} />
    <Route path="documents/:type/" element={<DocumentsPage />}/>
    <Route path="documents/details/:id/" element={<DocumentDetailsPage />}/>
  </Route>
);

export default NewsRoutes;
