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
  const [isLoading, setIsLoading] = useState(true);

  const uploadUserPhoto = async (image) => {
    const formData = new FormData();
    formData.append('image', image.target.files[0]);

    try {
      const response = await axios.post(`${usersServerUrl}profile/photo/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.status === "ok" && response.data.result) {
        setUser((prev) => ({ ...prev, pfp: response.data.result }));
      }
    } catch (err) {
      console.error("Error uploading photo:", err);
    }
  };

  const loadUserData = async () => {
    try {
      const userResponse = await axios.post(`${usersServerUrl}accounts/get-me/`);
      setUser(userResponse.data.results);
      setIsAuthenticated(userResponse.data.status === 'ok');
    } catch {
      setUser({});
      setIsAuthenticated(false);
    }
  };

  const loadContextData = async () => {
    setLoadStart(true);
    setLoadSuccess(false);
    if (isLoading) { setIsLoading(true); }

    await loadUserData(); // Load user data before everything else.

    const doRequest = async (url, method) => {
      try {
        return await axios.request({url: url, method: method});
      } catch {
        return {};
      }
    }

    // Prepare multiple fetch requests concurrently using Promise.all
    const fetchRequests = [
      doRequest(`${eCommerseServerUrl}products/popular/`, 'GET'),
      doRequest(`${eCommerseServerUrl}categories/list/`, 'GET'),
      doRequest(`${announcementsServerUrl}announcements/list/jobs/`, 'GET'),
      doRequest(`${announcementsServerUrl}announcements/list/services/`, 'GET'),
      doRequest(`${coursesServerUrl}categories/list/`, 'GET'),
      doRequest(`${coursesServerUrl}courses/popular/`, 'GET'),
      doRequest(`${announcementsServerUrl}profile/announcements/saved/`, 'POST'),
      doRequest(`${coursesServerUrl}profile/courses/list/`, 'GET'),
      doRequest(`${newsServerUrl}bussinies/list/`, 'GET'),
      doRequest(`${newsServerUrl}legacy/list/`, 'GET'),
      doRequest(`${newsServerUrl}news/list/`, 'GET'),
      doRequest(`${newsServerUrl}category/list/`, 'GET'),
    ];

    try {
      const [
        productsResponse, categoriesResponse, announcementsResponse, servicesResponse,
        ccategoriesResponse, coursesResponse, savedAnnouncementsResponse, followedCoursesResponse,
        bdocsResponse, ldocsResponse, newsResponse, newsCategoriesResponse
      ] = await Promise.all(fetchRequests);

      if (productsResponse.data.status === "ok") setProducts(productsResponse.data.results);
      if (categoriesResponse.data.status === "ok") setCategories(categoriesResponse.data.results);
      if (announcementsResponse.data.status === "ok") setAnnouncements(announcementsResponse.data.results);
      if (servicesResponse.data.status === "ok") setServices(servicesResponse.data.results);
      if (ccategoriesResponse.data.status === "ok") setCourseCategories(ccategoriesResponse.data.results);
      if (coursesResponse.data.status === "ok") setCourses(coursesResponse.data.results);
      if (savedAnnouncementsResponse.data.status === "ok") setSavedAnnouncements(savedAnnouncementsResponse.data.results);
      if (followedCoursesResponse.data.status === "ok") setFollowedCourses(followedCoursesResponse.data.results.map(value => value.id));
      if (bdocsResponse.data.status === "ok") setBussinessDoc(bdocsResponse.data.results);
      if (ldocsResponse.data.status === "ok") setLegislativeDoc(ldocsResponse.data.results);
      if (newsResponse.data.status === "ok") setNewList(newsResponse.data.results);
      if (newsCategoriesResponse.data.status === "ok") setNewsCategories(newsCategoriesResponse.data.results);
    } catch (err) {
      console.error("Error loading context data:", err);
    }

    setLoadStart(false);
    setLoadSuccess(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      loadContextData();
    }, (!loadSuccess && !loadStart) ? 100 : 15000);
    
    return () => clearInterval(interval);
  }, [loadSuccess, loadStart]);

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
        uploadUserPhoto,
        isLoading
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
