import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppContextProvider } from "./context/AppContext";
import React, { Suspense } from "react";

import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import Header from "./components/layout/Header";
import PrivateRoute from "./components/PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { publicRoutes, privateRoutes } from "./routes";
import { Analytics } from "@vercel/analytics/react";
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />;

window.Buffer = window.Buffer || require("buffer").Buffer;
function App() {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Loader />}>
            <BrowserRouter>
              <ScrollToTop />
              <ToastContainer closeOnClick={false} />
              <AppRoutes />
              <Analytics />
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
