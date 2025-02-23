import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import "./layout.scss";

import AdminAsideComponent from "../../components/AdminAsideComponent/index.jsx";

import { UserContext } from "../../context/user";

const AdminLayout = () => {
  const { isAuthenticated, loading, role } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/auth/sign-in/");
    }
    if (role !== "admin" && !loading) {
      navigate("/profile/overview/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="admin-container">
      <div className="content">
        <div className="content-aside">
          <AdminAsideComponent />
        </div>
        <div className="content-main">
          <div className="data">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
