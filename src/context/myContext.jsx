import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { usersServerUrl, eCommerseServerUrl, announcementsServerUrl, coursesServerUrl } from '../SuperVars.js';

export const MyContext = createContext(null);
export const MyContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newsList] = useState([]);
  const [documents] = useState([]);
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
    console.log(image);
    const formData = new FormData();
    formData.append('image', image.target.files[0]);
    console.log(image);
    
    try {
      const response = await axios.post(`${usersServerUrl}profile/photo/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response, "Upload photo");

      if (response.data.status === "ok" && response.data.result) {
        setUser((prev) => {
          prev.pfp = response.data.result;
          return prev;
        });
      }
    } catch (err) {
      console.error(err);
    }
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
    } catch (err) {
      console.error(err);
    }

    try {
      const categoriesResponse = await axios.get(`${eCommerseServerUrl}categories/list/`);
      if (categoriesResponse.data.status === "ok") {
        setCategories(categoriesResponse.data.results);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const announcementsResponse = await axios.get(`${announcementsServerUrl}announcements/list/jobs/`);
      console.log(announcementsResponse, "jobs");
      if (announcementsResponse.data.status === "ok") {
        setAnnouncements(announcementsResponse.data.results);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const servicesResponse = await axios.get(`${announcementsServerUrl}announcements/list/services/`);
      console.log(servicesResponse, "services");
      if (servicesResponse.data.status === "ok") {
        setServices(servicesResponse.data.results);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const ccategoriesResponse = await axios.get(`${coursesServerUrl}categories/list/`);
      console.log(ccategoriesResponse, "ccategories");
      if (ccategoriesResponse.data.status === "ok") {
        setCourseCategories(ccategoriesResponse.data.results);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const coursesResponse = await axios.get(`${coursesServerUrl}courses/popular/`);
      console.log(coursesResponse, "courses");
      if (coursesResponse.data.status === "ok") {
        setCourses(coursesResponse.data.results);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const announcementsResponse = await axios.post(`${announcementsServerUrl}profile/announcements/saved/`);
      console.log(announcementsResponse, "saved announcements");
      if (announcementsResponse.data.status === "ok") {
        setSavedAnnouncements(announcementsResponse.data.results);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const followedCoursesResponse = await axios.get(`${coursesServerUrl}profile/courses/list/`);
      console.log(followedCoursesResponse, "following courses");
      if (followedCoursesResponse.data.status === "ok") {
        setFollowedCourses(followedCoursesResponse.data.results.map((value) => value.id));
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
        documents,
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
