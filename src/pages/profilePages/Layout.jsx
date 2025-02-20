import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import "./layout.scss";

import ProfileSideBar from "../../components/ProfileSidebarComponent/index";

import { UserContext } from "../../context/user";

const Layout = () => {
  const { isAuthenticated, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated, loading);
    
    if (!isAuthenticated && !loading) {
      navigate("/auth/sign-in/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="profile-container">
      <div className="breadcrumb"></div>
      <div className="content">
        <div className="content-aside">
          <ProfileSideBar />
        </div>
        <div className="content-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

`
<div className="to-back profile-to-back">
          <div className="backInner">
            <Link to="/">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 18.3334V10H12.5V18.3334M2.5 7.50002L10 1.66669L17.5 7.50002V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1578 16.2754 18.3334 15.8333 18.3334H4.16667C3.72464 18.3334 3.30072 18.1578 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.50002Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <Link to="/profile/overview/" className="desktop-back-link">
              Shaxsiy kabinet
            </Link>
            <Link to="/profile/menus" className="mobile-back-link">
              Shaxsiy kabinet
            </Link>
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Shaxsiy ma'lumotlarim</span>
          </div>
        </div>
        <div className="profile-inner">
          <div className="left profile-left">
            <ProfileSideBar />
          </div>
          <div className="right own-datas">
            <Outlet />
          </div>
        </div>
        <div className="edit-profile-mobile">
          <Link to="/profile/edit-profile">
            Tahrirlash
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1423_19081)">
                <path
                  d="M7.33398 2.66665H2.66732C2.3137 2.66665 1.97456 2.80713 1.72451 3.05718C1.47446 3.30723 1.33398 3.64637 1.33398 3.99999V13.3333C1.33398 13.6869 1.47446 14.0261 1.72451 14.2761C1.97456 14.5262 2.3137 14.6667 2.66732 14.6667H12.0007C12.3543 14.6667 12.6934 14.5262 12.9435 14.2761C13.1935 14.0261 13.334 13.6869 13.334 13.3333V8.66665M12.334 1.66665C12.5992 1.40144 12.9589 1.25244 13.334 1.25244C13.7091 1.25244 14.0688 1.40144 14.334 1.66665C14.5992 1.93187 14.7482 2.29158 14.7482 2.66665C14.7482 3.04173 14.5992 3.40144 14.334 3.66665L8.00065 9.99999L5.33398 10.6667L6.00065 7.99999L12.334 1.66665Z"
                  stroke="#757575"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1423_19081">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
`;
