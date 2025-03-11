import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NavbarLinkActiveClassGeneratorProps } from "@/types/util";

const NavbarLinkActiveClassGenerator = ({
  isActive,
}: NavbarLinkActiveClassGeneratorProps): string => {
  return isActive
    ? "bg-brand px-6 py-1.5 rounded-full text-white font-semibold transition-all duration-300"
    : "text-text text-lg hover:bg-brand px-3 py-1 rounded-full hover:text-white font-normal transition-all duration-300";
};

const NavbarComponent: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <>
      <div
        id="navbar"
        className={`w-full h-auto top-0 left-0 z-50 transition-all duration-300 ${location.pathname === '/' ? "fixed bg-transparent" : "sticky bg-white"}`}
      >
        <div className="container relative mx-auto flex items-center justify-between py-4">
          <Link to="/" className="brand flex relative z-20">
            <img
              src={"/src/assets/logo.svg"}
              alt="Logo"
              className="h-3.5 md:h-5"
            />
          </Link>

          <div className="links absolute w-full h-full top-0 left-0 z-10 flex items-center justify-center space-x-2.5">
            <NavLink
              to="/online-shop/"
              className={NavbarLinkActiveClassGenerator}
            >
              <span className="icon"></span>
              <span className="text">{t("Online shop")}</span>
            </NavLink>
            <NavLink
              to="/announcements/"
              className={NavbarLinkActiveClassGenerator}
            >
              <span className="icon"></span>
              <span className="text">{t("Announcements")}</span>
            </NavLink>
            <NavLink to="/news/" className={NavbarLinkActiveClassGenerator}>
              <span className="icon"></span>
              <span className="text">{t("News")}</span>
            </NavLink>
            <NavLink to="/courses/" className={NavbarLinkActiveClassGenerator}>
              <span className="icon"></span>
              <span className="text">{t("Courses")}</span>
            </NavLink>
          </div>

          <div className="actions relative z-10">
            <Link
              to={"/auth/sign-in/"}
              className="text-brand text-lg font-medium py-2 px-3 hover:bg-brand hover:text-white transition-all duration-300 ease-out rounded-full"
            >
              {t("Login")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;
