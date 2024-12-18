import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { usersServerUrl, eCommerseServerUrl } from "../SuperVars";


export const MyContext = createContext(null);

export const MyContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newsList] = useState([]);
  const [documents] = useState([]);
  const [courses] = useState([]);
  const [announcements] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [followedCourses, setFollowedCourses] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("UZ"); // Boshlang'ich til
  const [languages, setLanguages] = useState(["RU", "EN"]); // Dropdowndagi boshqa tillar
  const [isOpen, setIsOpen] = useState(false);
  const [signupSuccess, setSignUpSuccess] = useState("");

  const loadContextData = async () => {
    try {
      const userResponse = await axios.post(`${usersServerUrl}accounts/get-me/`);
      setIsAuthenticated(userResponse.data.status === 'ok');
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
    }

    try {
      const productsResponse = await axios.get(`${eCommerseServerUrl}products/popular/`);
      if (productsResponse.data.status === "ok") {
        setProducts(productsResponse.data.results);
        console.log(productsResponse.data);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const categoriesResponse = await axios.get(`${eCommerseServerUrl}categories/list/`);
      if (categoriesResponse.data.status === "ok") {
        setCategories(categoriesResponse.data.results);
	console.log(categoriesResponse.data);
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
