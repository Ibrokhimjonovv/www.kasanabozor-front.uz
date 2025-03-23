import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NavbarLinkActiveClassGeneratorProps } from "@/types/util";
import { useUserContext } from "@/context/user";

type UserRole = "superadmin" | "admin" | "moderator" | "user" | "";

const AdminRoles: UserRole[] = ["superadmin", "admin"];
const ModeratorRoles: UserRole[] = ["moderator"];

const NavbarLinkActiveClassGenerator = ({
  isActive,
}: NavbarLinkActiveClassGeneratorProps): string =>
  isActive
    ? "bg-brand px-6 py-1.5 rounded-full text-white font-semibold transition-all duration-300"
    : "text-text text-lg hover:bg-brand px-3 py-1 rounded-full hover:text-white font-normal transition-all duration-300";

const UserAccountAction: FC = () => {
  const { t } = useTranslation();
  const { role, isAuthenticated } = useUserContext();

  const userRole = role as UserRole;

  const getRedirectLink = (): string => {
    if (!isAuthenticated) return "/auth/sign-in/";

    if (AdminRoles.includes(userRole) || ModeratorRoles.includes(userRole)) {
      return "/admin/overview/";
    }

    if (userRole === "user") {
      return "/profile/overview/";
    }

    return "/auth/sign-in/";
  };

  const getButtonLabel = (): string => {
    if (!isAuthenticated) return t("Login");

    if (AdminRoles.includes(userRole)) {
      return t("Admin dashboard");
    }

    if (ModeratorRoles.includes(userRole)) {
      return t("Moderator dashboard");
    }

    if (userRole === "user") {
      return t("User dashboard");
    }

    return t("Login");
  };

  return (
    <Link
      to={getRedirectLink()}
      className="text-[16px] text-brand font-semibold py-1.5 px-2 hover:text-white hover:bg-brand rounded-full transition-all duration-150 ease-in"
    >
      {getButtonLabel()}
    </Link>
  );
};

const NavbarComponent: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 75) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, [location]);

  if (
    location.pathname.includes("admin") ||
    location.pathname.includes("auth")
  ) {
    return <></>;
  }

  return (
    <>
      <div
        id="navbar"
        className={`w-full h-auto top-0 left-0 z-50 transition-all duration-300 ${
          location.pathname === "/"
            ? "fixed " + String(scrolled ? "bg-white" : "bg-transparent")
            : "sticky bg-white"
        }`}
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
            <UserAccountAction />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;
