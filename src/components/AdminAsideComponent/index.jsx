import { NavLink } from "react-router-dom";

import Logo from "../../assets/admin/logo.svg";

import UsersIcon from "../../assets/admin/users.svg";
import OnlineshopIcon from "../../assets/admin/onlineshop.svg";
import CoursesIcon from "../../assets/admin/courses.svg";
import AnnouncementsIcon from "../../assets/admin/announcements.svg";
import NewsIcon from "../../assets/admin/news.svg";

// import StatisticsIcon from "../../assets/admin/statistics.svg";
// import FeedbacksIcon from "../../assets/admin/feedbacks.svg";
// import DashboardIcon from "../../assets/admin/dashboard.svg";

import { DashboardIcon } from "../icons/admin";

import "./index.scss";

const generateAdminAsideLinkClass = ({ isActive }) => {
  if (isActive) {
    return "admin-aside-link active";
  } else {
    return "admin-aside-link";
  }
};

const AdminAsideComponent = () => {
  return (
    <>
      <div className="admin-aside">
        <div className="admin-logo">
          <img src={Logo} alt="Logo" />
        </div>

        <div className="admin-aside-links">
          <div className="seperate">
            <span>Asosiy</span>
          </div>

          <div className="admin-aside-link-container">
            <NavLink
              className={generateAdminAsideLinkClass}
              to={"/admin/dashboard/"}
            >
              {({ isActive }) => (
                <>
                  <span className="admin-aside-link-icon">
                    <DashboardIcon color={isActive ? "#41A58D" : "#767676"} />
                  </span>
                  <span className="admin-aside-link-text">Dashboard</span>
                </>
              )}
            </NavLink>
          </div>

          <div className="admin-aside-link-container">
            <NavLink
              className={generateAdminAsideLinkClass}
              to={"/admin/users/"}
            >
              <span className="admin-aside-link-icon">
                <img src={UsersIcon} alt="D" />
              </span>
              <span className="admin-aside-link-text">Foydalanuvchilar</span>
            </NavLink>

            <div className="admin-aside-links-content">
              <NavLink
                className={(e) => "content-" + generateAdminAsideLinkClass(e)}
                to={"/admin/users/all/"}
              >
                <span className="admin-aside-link-text">Foydalanuvchilar</span>
              </NavLink>
              <NavLink
                className={(e) => "content-" + generateAdminAsideLinkClass(e)}
                to={"/admin/users/homemakers/"}
              >
                <span className="admin-aside-link-text">Kasanachilar</span>
              </NavLink>
              <NavLink
                className={(e) => "content-" + generateAdminAsideLinkClass(e)}
                to={"/admin/users/admins/"}
              >
                <span className="admin-aside-link-text">Adminlar</span>
              </NavLink>
              <NavLink
                className={(e) => "content-" + generateAdminAsideLinkClass(e)}
                to={"/admin/users/mods/"}
              >
                <span className="admin-aside-link-text">Moderatorlar</span>
              </NavLink>
            </div>
          </div>

          <div className="admin-aside-link-container">
            <NavLink
              className={generateAdminAsideLinkClass}
              to={"/admin/products/"}
            >
              <span className="admin-aside-link-icon">
                <img src={OnlineshopIcon} alt="D" />
              </span>
              <span className="admin-aside-link-text">Mahsulotlar</span>
            </NavLink>
          </div>

          <div className="admin-aside-link-container">
            <NavLink
              className={generateAdminAsideLinkClass}
              to={"/admin/courses/"}
            >
              <span className="admin-aside-link-icon">
                <img src={CoursesIcon} alt="D" />
              </span>
              <span className="admin-aside-link-text">Kurslar</span>
            </NavLink>
          </div>

          <div className="admin-aside-link-container">
            <NavLink
              className={generateAdminAsideLinkClass}
              to={"/admin/announcements/"}
            >
              <span className="admin-aside-link-icon">
                <img src={AnnouncementsIcon} alt="D" />
              </span>
              <span className="admin-aside-link-text">E'lonlar</span>
            </NavLink>
          </div>

          <div className="admin-aside-link-container">
            <NavLink
              className={generateAdminAsideLinkClass}
              to={"/admin/news/"}
            >
              <span className="admin-aside-link-icon">
                <img src={NewsIcon} alt="D" />
              </span>
              <span className="admin-aside-link-text">Yangiliklar</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAsideComponent;
