import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import { ShowToast, Severty } from "../helper/toast";
import axios from "axios";
import apiPath from "../constants/apiPath";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState({ token: null });
  const [userProfile, setUserProfile] = useState();
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [refreshProfile, setRefreshProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUser = async (user) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(apiPath.baseURL + `/${apiPath.profile}`, {
        headers,
      });
      const result = response.data.data;

      if (result) {
        setIsLoggedIn(true);
        setUserProfile(result);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.status) {
        localStorage.removeItem("token");
        localStorage.removeItem("userProfile");
      }
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) return;

    let user = JSON.parse(localStorage.getItem("userProfile"));
    if (user) {
      fetchUser(user);
    }
    setSession({ token: token });
    setRefreshProfile(false);
  }, [refreshProfile]);

  const login = () => {
    setIsLoggedIn(true);
    return <Navigate to="/login" />;
  };

  const handleLogout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    setIsLoggedIn(false);
    setSession({ token: null });
    setUserProfile(null);
    ShowToast("Logout Successfully", Severty.SUCCESS);
    navigate("/login-diary");
  };

  const refreshUser = () => {
    setRefreshProfile((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        session,
        setSession,
        userProfile,
        setUserProfile,
        refreshUser,
        login,
        logout: (navigate) => handleLogout(navigate),
        isDarkTheme,
        isMobile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
