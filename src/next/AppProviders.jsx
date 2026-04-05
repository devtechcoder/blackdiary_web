"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { message, unstableSetRender } from "antd";
import { createRoot } from "react-dom/client";

import { store } from "../redux/store/index.jsx";
import { AuthProvider } from "../context/AuthContext";
import { AppContextProvider } from "../context/AppContext";
import ScrollToTop from "../components/ScrollToTop";
import apiPath from "../constants/apiPath";
import { useRequest } from "../hooks/useReduxRequest";
import { setUser } from "../redux/slices/appSlice";
import { setAllPageHeadings, setGeneralSettings, setSocialSettings } from "../redux/slices/masterDataSlice";
import Loader from "../components/Loader";
import ChatBot from "../../components/ChatBot";

if (typeof window !== "undefined") {
  window.Buffer = window.Buffer || require("buffer").Buffer;
  unstableSetRender((node, container) => {
    const root = createRoot(container);
    root.render(node);

    return () => {
      root.unmount();
    };
  });
}

const BootstrapData = ({ children }) => {
  const dispatch = useDispatch();
  const pageHeadings = useSelector((state) => state.masterData.allPageHeadings);
  const socialSettings = useSelector((state) => state.masterData.socialSettings);
  const generalSettings = useSelector((state) => state.masterData.generalSettings);

  const { response: data } = useRequest(`${apiPath.profile}`, {});

  useEffect(() => {
    if (data) {
      const userData = data?.data;
      dispatch(
        setUser({
          loggedIn: true,
          id: userData?.last_nameid,
          name: userData?.name,
          email: userData?.email,
          user_name: userData?.user_name,
          image: userData?.image,
        }),
      );
    }
  }, [data, dispatch]);

  const { response: allPageHeadings } = useRequest(`${apiPath.common.getMasters}/web_page_heading`, {
    skip: Array.isArray(pageHeadings) && pageHeadings.length > 0,
  });

  useEffect(() => {
    if (allPageHeadings) {
      dispatch(setAllPageHeadings(allPageHeadings?.data));
    }
  }, [allPageHeadings, dispatch]);

  const { response: allSocialSettings } = useRequest(`${apiPath.common.getSettings}/social`, {
    skip: Array.isArray(socialSettings) && socialSettings.length > 0,
  });

  useEffect(() => {
    if (allSocialSettings) {
      dispatch(setSocialSettings(allSocialSettings?.data || []));
    }
  }, [allSocialSettings, dispatch]);

  const { response: allGeneralSettings } = useRequest(`${apiPath.common.getSettings}/general`, {
    skip: Array.isArray(generalSettings) && generalSettings.length > 0,
  });

  useEffect(() => {
    if (allGeneralSettings) {
      dispatch(setGeneralSettings(allGeneralSettings?.data || []));
    }
  }, [allGeneralSettings, dispatch]);

  return <>{children}</>;
};

const AppProviders = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    message.config({
      top: 80,
      duration: 2,
      maxCount: 1,
    });
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContextProvider>
          <QueryClientProvider client={queryClient}>
            <BootstrapData>
              <Suspense fallback={<Loader />}>
                <ScrollToTop />
                {children}
              </Suspense>
            </BootstrapData>
            <ChatBot />
          </QueryClientProvider>
        </AppContextProvider>
      </AuthProvider>
    </Provider>
  );
};

export default AppProviders;
