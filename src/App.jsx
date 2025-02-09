import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { MyContextProvider } from "./context/myContext";
import './createAxiosClient.js';
import './i18n.ts';

import AppContent from "./AppContent";
import NotificationsDisplay from "./components/NotificationsComponent/notification";
import NotificationsProvider from "./context/notifications";


const App = () => {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <NotificationsProvider>
          <AppContent />
          <NotificationsDisplay />
        </NotificationsProvider>
      </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;
