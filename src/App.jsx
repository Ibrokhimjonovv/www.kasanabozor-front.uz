import "./App.css";
import { BrowserRouter } from "react-router-dom";
import "./createAxiosClient.js";
import "./i18n.ts";

import AppContent from "./AppContent";
import NotificationsDisplay from "./components/NotificationsComponent/notification";
import NotificationsProvider from "./context/notifications";
import { OnlineShopProvider } from "./context/onlineshop.jsx";
import { UserProvider } from "./context/user.jsx";

const App = () => {
  return (
    <BrowserRouter
      futureFlags={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <NotificationsProvider>
        <UserProvider>
          <OnlineShopProvider>
            <AppContent />
            <NotificationsDisplay />
          </OnlineShopProvider>
        </UserProvider>
      </NotificationsProvider>
    </BrowserRouter>
  );
};

export default App;
