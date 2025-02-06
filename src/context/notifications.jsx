import { createContext, useState } from "react";


const Notifications = createContext([]);
const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (title, comment, type) => {
        setNotifications((prevNotifications) => [...prevNotifications, {id: prevNotifications[prevNotifications.length-1]?.id + 1 || 1, title: title, comment: comment, type: type, closed: false }]);
    }

    return <Notifications.Provider value={{ notifications, addNotification, setNotifications }}>
        { children }
    </Notifications.Provider>
}

export default NotificationsProvider;
export { Notifications };
