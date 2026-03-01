import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppContextProvider } from "./context/AppContext";
import React, { Suspense, useEffect } from "react";

import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { publicRoutes, privateRoutes } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import apiPath from "./constants/apiPath";
import { useRequest } from "./hooks/useReduxRequest";
import { setUser } from "./redux/slices/appSlice";
import { setAllPageHeadings, setGeneralSettings, setSocialSettings } from "./redux/slices/masterDataSlice";

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />;

window.Buffer = window.Buffer || require("buffer").Buffer;
function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const pageHeadings = useSelector((state) => state.masterData.allPageHeadings);
  const socialSettings = useSelector((state) => state.masterData.socialSettings);
  const generalSettings = useSelector((state) => state.masterData.generalSettings);

  const { response: data } = useRequest(`${apiPath.profile}`, {
    // skip: !userId,
  });

  // Load profile into redux
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
      const list = allPageHeadings?.data;
      dispatch(setAllPageHeadings(list));
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

  return (
    <AuthProvider>
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Loader />}>
            <BrowserRouter>
              <ScrollToTop />
              <ToastContainer closeOnClick={false} />
              <AppRoutes />
              {/* <Analytics /> */}
            </BrowserRouter>
          </Suspense>
        </QueryClientProvider>
      </AppContextProvider>
    </AuthProvider>
  );
}

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Auth Routes */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}

        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          {privateRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

const Layout = () => {
  return (
    <>
      {" "}
      <Outlet />{" "}
    </>
  );
};

export default App;
