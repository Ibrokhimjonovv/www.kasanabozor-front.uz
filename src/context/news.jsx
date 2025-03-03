import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { newsApi } from "../server";

const NewsContext = createContext();

const NewsProvider = ({ children }) => {
  const [bannerNews, setBannerNews] = useState([]);
  const [weekNews, setWeekNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      axios.get(`${newsApi}home-data/`).then((response) => {
        if (response.status == 200) {
          setBannerNews(response.data.banner);
          setWeekNews(response.data.week);
          setLoading(false);
        }
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <NewsContext.Provider
        value={{
          loading
        }}
      >
        {children}
      </NewsContext.Provider>
    </>
  );
};

export { NewsContext, NewsProvider };
