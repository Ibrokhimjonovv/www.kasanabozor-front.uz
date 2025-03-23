import React, { createContext, useState, ReactNode } from "react";

// Notification type
export interface NotificationItem {
  id: number;
  title: string;
  comment: string;
  type: string;
  closed: boolean;
}

// Context type
interface NotificationsContextType {
  notifications: NotificationItem[];
  addNotification: (title: string, comment: string, type: string) => void;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
}

// Context init
const Notifications = createContext<NotificationsContextType | undefined>(undefined);

interface NotificationsProviderProps {
  children: ReactNode;
}

const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = (title: string, comment: string, type: string): void => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        id: (prevNotifications[prevNotifications.length - 1]?.id || 0) + 1,
        title,
        comment,
        type,
        closed: false,
      },
    ]);
  };

  return (
    <Notifications.Provider
      value={{
        notifications,
        addNotification,
        setNotifications,
      }}
    >
      {children}
    </Notifications.Provider>
  );
};

export const useNotifications = (): NotificationsContextType => {
  const context = React.useContext(Notifications);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};

export default NotificationsProvider;
export { Notifications };
