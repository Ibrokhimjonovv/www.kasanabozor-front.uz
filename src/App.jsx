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
