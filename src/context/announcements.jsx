import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { announcementsApi } from "../SuperVars";

const AnnouncementsContext = createContext();

const AnnouncementsProvider = ({ children }) => {
  const [serviceAnnouncements, setServiceAnnouncements] = useState([]);
  const [workAnnouncement, setWorkAnnouncement] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      axios.get(`${announcementsApi}home-data/`).then((response) => {
        if (response.status == 200) {
          setServiceAnnouncements(response.data.service_announcement);
          setWorkAnnouncement(response.data.work_announcement);
          setLoading(false);
        }
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <AnnouncementsContext.Provider
        value={{
          serviceAnnouncements,
          workAnnouncement,
          loading
        }}
      >
        {children}
      </AnnouncementsContext.Provider>
    </>
  );
};

export { AnnouncementsContext, AnnouncementsProvider };
