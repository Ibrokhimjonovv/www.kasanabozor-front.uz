import React from "react";
import { Route } from "react-router-dom";

import SignInPage from "./SignInPage/index.jsx";
import SignUpPage from "./SignUpPages/index.jsx";


const AuthenticationRoutes = (
  <Route path="/auth/*">
    <Route path="sign-in/" element={<SignInPage />} />
    <Route path="sign-up/" element={<SignUpPage />} />
  </Route>
);

export default AuthenticationRoutes;
