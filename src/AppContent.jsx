import { Routes } from "react-router-dom";
import OnlineShopRoutes from "./pages/OnlineShopPages/Routers";

import Header from "./components/HeaderComponent/Header";
import Footer from "./components/FooterComponent/Footer";

const AppContent = () => {
  return (
    <>
      <Header></Header>

      <Routes>
        { OnlineShopRoutes }
      </Routes>

      <Footer></Footer>
    </>
  );
}


export default AppContent;
