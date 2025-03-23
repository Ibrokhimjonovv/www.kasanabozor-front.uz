import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useUserContext } from "../../context/user";
import ProfileSideBarComponent from "@/components/Widgets/Profile/aside";

const Layout: React.FC = () => {
  const { isAuthenticated, loading } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated, loading);

    if (!isAuthenticated && !loading) {
      navigate("/auth/sign-in/");
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="profile-container bg-[#F5F5F5]">
      <div className="container mx-auto">
        <div className="breadcrumb"></div>
        <div className="content flex items-start justify-start gap-x-4">
          <div className="content-aside min-w-3/12 max-w-3/12">
            <ProfileSideBarComponent />
          </div>
          <div className="content-main w-full bg-white rounded-lg p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
