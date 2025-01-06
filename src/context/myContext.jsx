import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { usersServerUrl, eCommerseServerUrl } from '../SuperVars.js';

export const MyContext = createContext(null);
export const MyContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newsList] = useState([]);
  const [documents] = useState([]);
  const [courses] = useState([]);
  const [announcements] = useState([]);
  const [followedCourses, setFollowedCourses] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("UZ");
  const [languages, setLanguages] = useState(["RU", "EN"]);
  const [isOpen, setIsOpen] = useState(false);
  const [signupSuccess, setSignUpSuccess] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loadContextData = async () => {
    try {
      const userResponse = await axios.post(`${usersServerUrl}accounts/get-me/`);
      setIsAuthenticated(userResponse.data.status === 'ok');
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
      return 0;
    }

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
  };

  useEffect(() => {
    let isMounted = true; // To prevent setting state on unmounted component

    const loadData = async () => {
      if (isMounted) {
        await loadContextData();
      }
    };

    loadData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [usersServerUrl]); // Ensure usersServerUrl is a dependency if it's dynamic

    return (
    <MyContext.Provider
      value={{
        products,
        newsList,
        documents,
        courses,
        isAuthenticated,
        setIsAuthenticated,
        followedCourses,
        setFollowedCourses,
        announcements,
        selectedLanguage,
        setSelectedLanguage,
        languages,
        setLanguages,
        isOpen,
        setIsOpen,
        signupSuccess,
        setSignUpSuccess,
        categories
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
