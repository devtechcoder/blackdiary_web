import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import apiPath from "../constants/apiPath";
import axios from "axios";

export const AppStateContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [pageHeading, setPageHeading] = useState("Heading");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [categories, setcategories] = useState([]);
  const [subCategories, setsubCategories] = useState([]);

  const { userProfile } = useAuthContext();
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState({
    country_id: undefined,
    currency: undefined,
    data: undefined,
  });

  useEffect(() => {
    let lang = localStorage.getItem("languageSet");
    setLanguage(lang);
  }, []);

  const getCategories = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(apiPath.baseURL + `/common/categories`, {
        headers,
      });
      const data = response.data.data;
      if (data) {
        setcategories(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSubCategories = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(apiPath.baseURL + `app/sub-category`, {
        headers,
      });
      const data = response?.data?.data?.docs;
      if (data) {
        setsubCategories(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getSubCategories();
    if (!userProfile) return;
  }, [userProfile]);

  return (
    <AppStateContext.Provider
      value={{
        pageHeading,
        setPageHeading,
        setCountry,
        country,
        language,
        setLanguage,
        cities,
        categories,
        subCategories,
      }}
    >
      {loading ? null : children}
    </AppStateContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppStateContext);
};
