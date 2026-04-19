"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import { ShowToast, Severty } from "../helper/toast";
import axios from "axios";
import apiPath from "../constants/apiPath";
import { useDispatch } from "react-redux";
import { setToken, setUser, logout as resetAppAuth } from "../redux/slices/appSlice";
import { clearAuthState, hydrateAuthState, setAuthState } from "../redux/slices/authSlice";
import { clearPendingAuthAction, closeAuthModal } from "../redux/slices/modalSlice";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const hasWindow = typeof window !== "undefined";

  const getStoredUser = () => {
    if (!hasWindow) return null;
    try {
      const raw = localStorage.getItem("userProfile");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  };
  const storedToken = hasWindow ? localStorage.getItem("token") : null;
  const storedUser = getStoredUser();

  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState({ token: storedToken || null });
  const [userProfile, setUserProfile] = useState(storedUser || null);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [refreshProfile, setRefreshProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(hasWindow ? window.innerWidth < 768 : false);

  const clearAuthSession = () => {
    if (!hasWindow) return;

    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    setIsLoggedIn(false);
    setSession({ token: null });
    setUserProfile(null);
    dispatch(resetAppAuth());
    dispatch(clearAuthState());
    dispatch(clearPendingAuthAction());
    dispatch(closeAuthModal());
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    if (!hasWindow) return undefined;
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
        dispatch(setAuthState({ user: result }));
      }
    } catch (error) {
      console.log(error);
      const statusCode = error?.response?.status;
      const message = error?.response?.data?.message;
      const statusText = error?.response?.data?.statusText;
      const isUnauthorized =
        statusCode === 401 ||
        statusCode === 403 ||
        message === "Un-Authorized User" ||
        message === "jwt expired" ||
        message === "JWT_EXPIRED" ||
        statusText === "JWT_EXPIRED";

      // Only clear session for explicit auth failures.
      if (isUnauthorized) {
        clearAuthSession();
      }
    }
  };

  useEffect(() => {
    if (!hasWindow) return;

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
    dispatch(hydrateAuthState({ isAuthenticated: true, user: user || null }));

    // Revalidate profile in background and refresh local user data.
    fetchUser();
    setRefreshProfile(false);
  }, [refreshProfile, dispatch]);

  const login = () => {
    setIsLoggedIn(true);
    return <Navigate to="/login" />;
  };

  const handleLogout = (navigateOrOptions, maybeOptions = {}) => {
    const isNavigateFn = typeof navigateOrOptions === "function";
    const navigate = isNavigateFn ? navigateOrOptions : maybeOptions.navigate;
    const options = isNavigateFn ? maybeOptions : navigateOrOptions || {};
    const { redirect = true, showToast = true, syncWithServer = true } = options;
    const token = localStorage.getItem("token");
    if (hasWindow && syncWithServer && token) {
      fetch(`${apiPath.baseURL}/app/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        keepalive: true,
      }).catch(() => {});
    }

    clearAuthSession();
    if (showToast) {
      ShowToast("Logout Successfully", Severty.SUCCESS);
    }

    if (redirect && typeof navigate === "function") {
      navigate("/login-diary");
    } else if (redirect && hasWindow) {
      window.location.href = "/login-diary";
    }
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
        logout: handleLogout,
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
