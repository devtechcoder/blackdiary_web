import {
  Home,
  LoginWithOtp,
  PoetDetails,
  ViewAllPoet,
  ViewAllOccasion,
  OccasionDetails,
  SubCategoryDetails,
  ViewAllSubCategory,
  LoginPage,
  SignUpPage,
  Profile,
  EditProfile,
  QRCodeDownload,
  LoginActivity,
  NotificationPermission,
  BlockAccount,
  AccountPrivacy,
  ManageAccount,
  PersonalDetails,
  DiaryByType,
} from "./pages/Index";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppContextProvider } from "./context/AppContext";
import React, { Suspense, useState } from "react";

import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import Header from "./components/layout/Header";
import PrivateRoute from "./components/PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Analytics } from "@vercel/analytics/react";
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
              {/* <Analytics /> */}
            </BrowserRouter>
          </Suspense>
        </QueryClientProvider>
      </AppContextProvider>
    </AuthProvider>
  );
}

const AppRoutes = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <Routes>
        {/* Auth Routes */}

        <Route path="/login-diary" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signUp-diary" element={<SignUpPage />} />
        <Route path="/signUp-otp/:id?" element={<LoginWithOtp />} />

        <Route path="/" element={<Home />} />
        <Route path="/poets/details/:slug?/:id?" element={<PoetDetails />} />
        <Route path="/poets" element={<ViewAllPoet />} />
        {/* Occasion Page */}
        <Route path="/occasion" element={<ViewAllOccasion />} />
        <Route path="/occasion/details/:slug?/:id?" element={<OccasionDetails />} />
        {/* SubCategory Page */}
        <Route path="/sub-category/details/:slug?/:id?" element={<SubCategoryDetails />} />
        <Route path="/search/sub-category" element={<ViewAllSubCategory />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          {/* Profile */}
          <Route path="/profile/:username?/:id?" element={<Profile />} />
          <Route path="account/edit-profile/:username?/:id?" element={<EditProfile />} />
          <Route path="account/qr-code/:username?/:id?" element={<QRCodeDownload />} />
          <Route path="account/login-activity/:username?/:id?" element={<LoginActivity />} />
          <Route path="account/notification-permission/:username?/:id?" element={<NotificationPermission />} />
          <Route path="account/block-account/:username?/:id?" element={<BlockAccount />} />
          <Route path="account/privacy-account/:username?/:id?" element={<AccountPrivacy />} />
          <Route path="account/manage-account/:username?/:id?" element={<ManageAccount />} />
          <Route path="account/personal-details/:username?/:id?" element={<PersonalDetails />} />
          {/* Diary by type - like | recently | browse all */}
          <Route path="/diary-by-type/:type?" element={<DiaryByType />} />
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
