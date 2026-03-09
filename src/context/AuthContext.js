import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import { ShowToast, Severty } from "../helper/toast";
import axios from "axios";
import apiPath from "../constants/apiPath";
import { useDispatch } from "react-redux";
import { setToken, setUser, logout as resetAppAuth } from "../redux/slices/appSlice";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const getStoredUser = () => {
    try {
      const raw = localStorage.getItem("userProfile");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  };
  const storedToken = localStorage.getItem("token");
  const storedUser = getStoredUser();

  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState({ token: storedToken || null });
  const [userProfile, setUserProfile] = useState(storedUser || null);
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

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(apiPath.baseURL + `/${apiPath.profile}`, {
        headers,
      });
      const result = response.data.data;

      if (result) {
        setIsLoggedIn(true);
        setUserProfile(result);
        setSession({ token });
        localStorage.setItem("userProfile", JSON.stringify(result));
        dispatch(setToken(token));
        dispatch(setUser(result));
      }
    } catch (error) {
      console.log(error);
      const statusCode = error?.response?.status;
      const message = error?.response?.data?.message;
      const isUnauthorized = statusCode === 401 || message === "Un-Authorized User";

      // Only clear session for explicit auth failures.
      if (isUnauthorized) {
        localStorage.removeItem("token");
        localStorage.removeItem("userProfile");
        setIsLoggedIn(false);
        setSession({ token: null });
        setUserProfile(null);
        dispatch(resetAppAuth());
      }
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setSession({ token: null });
      setUserProfile(null);
      dispatch(resetAppAuth());
      return;
    }

    const user = getStoredUser();
    setIsLoggedIn(true);
    setSession({ token: token });
    setUserProfile(user || null);
    dispatch(setToken(token));
    if (user) dispatch(setUser(user));

    // Revalidate profile in background and refresh local user data.
    fetchUser();
    setRefreshProfile(false);
  }, [refreshProfile, dispatch]);

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
    dispatch(resetAppAuth());
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
