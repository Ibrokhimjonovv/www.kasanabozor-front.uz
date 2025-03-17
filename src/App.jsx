import "./App.css";
import { BrowserRouter } from "react-router-dom";
import "./client.ts";
import "./i18n.ts";

import AppContent from "./AppContent";
import NotificationsDisplay from "./components/NotificationsComponent/notification";
import NotificationsProvider from "./context/notifications";

import { OnlineShopProvider } from "./context/onlineshop";
import { UserProvider } from "./context/user.jsx";
import { ChatProvider } from "./context/messenger.jsx";
import { AnnouncementsProvider } from "./context/announcements.jsx";
import { NewsProvider } from "./context/news.jsx";
import { CoursesProvider } from "./context/courses.jsx";

import "swiper/css";
import "swiper/css/free-mode";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Providers = ({ children }) => {
  return (
    <NotificationsProvider>
      <UserProvider>
        <ChatProvider>
          <OnlineShopProvider>
            <AnnouncementsProvider>
              <NewsProvider>
                <CoursesProvider>{children}</CoursesProvider>
              </NewsProvider>
            </AnnouncementsProvider>
          </OnlineShopProvider>
        </ChatProvider>
      </UserProvider>
    </NotificationsProvider>
  );
};

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 650, delay: 500 });
  }, []);

  return (
    <BrowserRouter
      futureFlags={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Providers>
        <AppContent />
        <NotificationsDisplay />
      </Providers>
    </BrowserRouter>
  );
};

export default App;
