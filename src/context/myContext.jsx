import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { usersServerUrl, eCommerseServerUrl, announcementsServerUrl, coursesServerUrl, newsServerUrl } from '../SuperVars.js';

export const MyContext = createContext(null);
export const MyContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newsList, setNewList] = useState([]);
  const [newsCategories, setNewsCategories] = useState([]);
  const [legislativeDoc, setLegislativeDoc] = useState([]);
  const [bussinessDoc, setBussinessDoc] = useState([]);
  const [courseCategories, setCourseCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [services, setServices] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [savedAnnouncements, setSavedAnnouncements] = useState([]);
  const [followedCourses, setFollowedCourses] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("uz");
  const [languages, setLanguages] = useState(["ru", "en"]);
  const [isOpen, setIsOpen] = useState(false);
  const [signupSuccess, setSignUpSuccess] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loadStart, setLoadStart] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);

  const uploadUserPhoto = async (image) => {
    const formData = new FormData();
    formData.append('image', image.target.files[0]);
    
    try {
      const response = await axios.post(`${usersServerUrl}profile/photo/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status === "ok" && response.data.result) {
        setUser((prev) => {
          prev.pfp = response.data.result;
          return prev;
        });
      }
    } catch {}
  }

  const loadUserData = async () => {
    try {
      const userResponse = await axios.post(`${usersServerUrl}accounts/get-me/`);
      setUser(userResponse.data.results);
      setIsAuthenticated(userResponse.data.status === 'ok');
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
      return 0;
    }
  }

  const loadContextData = async () => {
    setLoadStart(true);
    setLoadSuccess(false);

    await loadUserData();

    try {
      const productsResponse = await axios.get(`${eCommerseServerUrl}products/popular/`);
      if (productsResponse.data.status === "ok") {
        setProducts(productsResponse.data.results);
      }
    } catch {}

    try {
      const categoriesResponse = await axios.get(`${eCommerseServerUrl}categories/list/`);
      if (categoriesResponse.data.status === "ok") {
        setCategories(categoriesResponse.data.results);
      }
    } catch {}

    try {
      const announcementsResponse = await axios.get(`${announcementsServerUrl}announcements/list/jobs/`);
      if (announcementsResponse.data.status === "ok") {
        setAnnouncements(announcementsResponse.data.results);
      }
    } catch {}

    try {
      const servicesResponse = await axios.get(`${announcementsServerUrl}announcements/list/services/`);
      if (servicesResponse.data.status === "ok") {
        setServices(servicesResponse.data.results);
      }
    } catch {}

    try {
      const ccategoriesResponse = await axios.get(`${coursesServerUrl}categories/list/`);
      if (ccategoriesResponse.data.status === "ok") {
        setCourseCategories(ccategoriesResponse.data.results);
      }
    } catch {}

    try {
      const coursesResponse = await axios.get(`${coursesServerUrl}courses/popular/`);
      if (coursesResponse.data.status === "ok") {
        setCourses(coursesResponse.data.results);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const announcementsResponse = await axios.post(`${announcementsServerUrl}profile/announcements/saved/`);
      if (announcementsResponse.data.status === "ok") {
        setSavedAnnouncements(announcementsResponse.data.results);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const followedCoursesResponse = await axios.get(`${coursesServerUrl}profile/courses/list/`);
      if (followedCoursesResponse.data.status === "ok") {
        setFollowedCourses(followedCoursesResponse.data.results.map((value) => value.id));
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const bdocsResponse = await axios.get(`${newsServerUrl}bussinies/list/`);
      if (bdocsResponse.data.status === "ok") {
        setBussinessDoc(bdocsResponse.data.results);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const ldocsResponse = await axios.get(`${newsServerUrl}legacy/list/`);
      if (ldocsResponse.data.status === "ok") {
        setLegislativeDoc(ldocsResponse.data.results);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const newsResponse = await axios.get(`${newsServerUrl}news/list/`);
      if (newsResponse.data.status === "ok") {
        setNewList(newsResponse.data.results);
      }
    } catch (err) {
      console.error(err);
    }
    
    try {
      const newsCategoriesResponse = await axios.get(`${newsServerUrl}category/list/`);
      if (newsCategoriesResponse.data.status === "ok") {
        setNewsCategories(newsCategoriesResponse.data.results);
      }
    } catch (err) {
      console.error(err);
    }
    
    setLoadStart(false);
    setLoadSuccess(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      loadContextData();
    }, (!loadSuccess && !loadStart) ? 100 : 5000);
    
    return () => {
      clearInterval(interval);
    };
  }); // Ensure usersServerUrl is a dependency if it's dynamic

    return (
    <MyContext.Provider
      value={{
        products,
        newsList,
        newsCategories,
        legislativeDoc,
        bussinessDoc,
        courses,
        courseCategories,
        isAuthenticated,
        setIsAuthenticated,
        followedCourses,
        setFollowedCourses,
        announcements,
        savedAnnouncements,
        services,
        selectedLanguage,
        setSelectedLanguage,
        languages,
        setLanguages,
        isOpen,
        setIsOpen,
        signupSuccess,
        setSignUpSuccess,
        categories,
        user,
        loadUserData,
        uploadUserPhoto
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
