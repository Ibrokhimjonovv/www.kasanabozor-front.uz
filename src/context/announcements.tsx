import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FC
} from "react";
import { announcementsApi } from "../server";

// === TYPES ===
interface Announcement {
  id: number;
  title: string;
  description: string;
  // Add more fields based on your API response
}

interface AnnouncementsContextType {
  serviceAnnouncements: Announcement[];
  workAnnouncement: Announcement[];
  loading: boolean;
}

// === CONTEXT ===
const AnnouncementsContext = createContext<AnnouncementsContextType | undefined>(undefined);

interface AnnouncementsProviderProps {
  children: ReactNode;
}

// === PROVIDER ===
const AnnouncementsProvider: FC<AnnouncementsProviderProps> = ({ children }) => {
  const [serviceAnnouncements, setServiceAnnouncements] = useState<Announcement[]>([]);
  const [workAnnouncement, setWorkAnnouncement] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${announcementsApi}home-data/`);
        if (response.status === 200) {
          setServiceAnnouncements(response.data.service_announcement);
          setWorkAnnouncement(response.data.work_announcement);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AnnouncementsContext.Provider
      value={{
        serviceAnnouncements,
        workAnnouncement,
        loading
      }}
    >
      {children}
    </AnnouncementsContext.Provider>
  );
};

const useAnnouncements = (): AnnouncementsContextType => {
  const context = useContext(AnnouncementsContext);
  if (!context) {
    throw new Error("useAnnouncements must be used within an AnnouncementsProvider");
  }
  return context;
};

export {
  AnnouncementsProvider,
  useAnnouncements,
  AnnouncementsContext
};
