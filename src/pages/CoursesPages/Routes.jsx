import React from "react";
import { Route } from "react-router-dom";

import HomePage from "./HomePage/index.jsx";


const CoursesRoutes = (
  <Route path="/courses/*">
    <Route path="" element={<HomePage />} />
  </Route>
);

export default CoursesRoutes;
