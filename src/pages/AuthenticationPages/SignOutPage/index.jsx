import React, { useContext, useEffect } from "react";
import { UserContext } from '../../../context/user.jsx';
import { useNavigate } from "react-router-dom";

const SignOutPage = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();

    navigate('/auth/sign-in/');
  });

  return (
    <>
      <p>Loggin out the account</p>
    </>
  );
};

export default SignOutPage;
