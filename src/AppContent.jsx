import { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import OnlineShopRoutes from "./pages/OnlineShopPages/Routes";
import AnnouncementsRoutes from "./pages/AnnouncementPages/Routes";
import NewsRoutes from "./pages/NewsPages/Routes";
import CoursesRoutes from "./pages/CoursesPages/Routes";
import AuthenticationRoutes from "./pages/AuthenticationPages/Router";
import ProfileRoutes from "./pages/ProfilePages/Routes";

import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent/Footer";
import HomePage from "./pages/HomePage/index";
import NotFoundPage from "./pages/NotFoundPage/index";
import Loading from "./components/LoaderComponent/loading";
import Messaging from "./pages/MessengerPage";
import AdminRoutes from "./pages/AdminPages/Router";

const AppContent = () => {
  const isLoading = false;
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return isLoading ? (
    <>
      <Loading />
    </>
  ) : (
    <>
      {!Boolean(
        location.pathname.includes("auth") ||
          location.pathname.includes("admin")
      ) ? (
        <Header></Header>
      ) : (
        <></>
      )}

      <Routes>
        <Route path="" element={<HomePage />} />
        {OnlineShopRoutes}
        {AnnouncementsRoutes}
        {NewsRoutes}
        {CoursesRoutes}
        {AuthenticationRoutes}
        {ProfileRoutes}
        {AdminRoutes}

        <Route path="messaging/" element={<Messaging />}/>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!Boolean(
        location.pathname.includes("auth") ||
          location.pathname.includes("admin")
      ) ? (
        <Footer></Footer>
      ) : (
        <></>
      )}
    </>
  );
};

export default AppContent;
