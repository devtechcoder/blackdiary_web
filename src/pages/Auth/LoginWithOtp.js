import React, { useEffect, useState } from "react";
import { Input, Button, Form } from "antd";
import useRequest, { useGetApi } from "../../hooks/useRequest";
import { useNavigate, useParams } from "react-router";
import apiPath from "../../constants/apiPath";
import { Severty, ShowToast } from "../../helper/toast";
import Main from "../../components/layout/Main";
import Loader from "../../components/Loader";
import { maskEmail, maskPhone } from "../../helper/functions";
import OtpInput from "react-otp-input";
import { useAuthContext } from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../constants/seo";
const LoginWithOtp = () => {
  const { setIsLoggedIn, setUserProfile } = useAuthContext();
  const [otp, setOtp] = useState("");
  const [form] = Form.useForm();
  const { request } = useRequest();
  const [loading, setLoading] = useState(false);
  const [reSendloading, setReSendLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [error, setError] = useState("");

  const {
    data,
    isLoading,
    isError,
    error: getUserError,
    refetch,
  } = useGetApi({
    queryKey: "userData",
    endpoint: `${apiPath.getOneUser}/${userId}`,
    enabled: userId ? true : false,
  });

  useEffect(() => {
    if (data?.status) setUserData(data?.data);
  }, [data]);
  useEffect(() => {
    if (userId) refetch();
  }, [userId]);

  const verifyOtp = (values) => {
    if (otp.length !== 6 || otp.includes(" ")) {
      return setError("Please enter all 6 digits.");
    }
    setReSendLoading(true);
    const payload = { type: userData?.signup_type, user_name: userData?.user_name, otp: otp };
    payload.email = userData.email;
    payload.mobile_number = userData.mobile_number;
    payload.country_code = userData.country_code;

    request({
      url: `${apiPath.verifyOtp}`,
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        setReSendLoading(false);
        if (data.status) {
          setIsLoggedIn(true);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("userProfile", JSON.stringify(data.data.user));

          setUserProfile(data.data.user);
          ShowToast(data.message, Severty.SUCCESS);
          setTimeout(() => navigate("/"), 200);
        } else {
          ShowToast(data.message, Severty.ERROR);
        }
      },
      onError: (error) => {
        ShowToast(error?.response?.data?.message, Severty.ERROR);
        setReSendLoading(false);
      },
    });
  };

  const reSendOtp = () => {
    setReSendLoading(true);
    const payload = { type: userData?.signup_type, user_name: userData?.user_name };
    payload.email = userData.email;
    payload.mobile_number = userData.mobile_number;
    payload.country_code = userData.country_code;

    request({
      url: `${apiPath.sendOtp}`,
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        setReSendLoading(false);
        if (data.status) {
          ShowToast(data.message, Severty.SUCCESS);
        } else {
          ShowToast(data.message, Severty.ERROR);
        }
      },
      onError: (error) => {
        ShowToast(error?.response?.data?.message, Severty.ERROR);
        setReSendLoading(false);
      },
    });
  };

  if (isLoading) return <Loader />;
  return (
    <>
      <Helmet>
        {/* 🔹 Primary Meta Tags */}
        <title>{SEO.LoginWithOtp.primary.title}</title>
        <meta name="description" content={SEO.LoginWithOtp.primary.description} />
        <meta name="keywords" content={SEO.LoginWithOtp.primary.keywords} />

        {/* 🔹 Open Graph (for Facebook, WhatsApp, etc.) */}
        <meta property="og:title" content={SEO.LoginWithOtp.openGraph.title} />
        <meta property="og:description" content={SEO.LoginWithOtp.openGraph.description} />
        <meta property="og:image" content={SEO.LoginWithOtp.openGraph.image} />
        <meta property="og:url" content={SEO.LoginWithOtp.openGraph.url} />
        <meta property="og:type" content={SEO.LoginWithOtp.openGraph.type} />
        <meta property="og:site_name" content={SEO.LoginWithOtp.openGraph.site_name} />

        {/* 🔹 Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.LoginWithOtp.twitter.title} />
        <meta name="twitter:description" content={SEO.LoginWithOtp.twitter.description} />
        <meta name="twitter:image" content={SEO.LoginWithOtp.twitter.image} />
        <meta name="twitter:url" content={SEO.LoginWithOtp.twitter.url} />
        <meta name="twitter:type" content={SEO.LoginWithOtp.twitter.type} />
        <meta name="twitter:site_name" content={SEO.LoginWithOtp.twitter.site_name} />

        {/* 🔹 Canonical & Language Tags */}
        <link rel="canonical" href={SEO.common.url} />
        <meta name="robots" content={SEO.common.robots} />
        <meta name="language" content={SEO.common.language} />
        <meta name="author" content={SEO.common.author} />
      </Helmet>
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center space-y-6 w-full max-w-sm">
          <h2 className="text-2xl font-bold">
            Enter the 6-digit code sent to <br /> you at{" "}
            <span className="text-gray-400"> {userData?.signup_type === "Email" ? maskEmail(userData?.email) : `+${userData?.country_code}-${maskPhone(userData?.mobile_number)}`}</span>
          </h2>

          <div className="flex justify-center">
            <OtpInput
              value={otp}
              onChange={(val) => {
                setOtp(val);
                setError(""); // clear error on change
              }}
              numInputs={6}
              inputType="number"
              shouldAutoFocus
              containerStyle="flex gap-2"
              renderInput={(props) => <input {...props} className="otp-input" />}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button loading={reSendloading} disabled={reSendloading} className="border border-white px-4 py-1 rounded-full hover:bg-white hover:text-black" onClick={reSendOtp}>
            Resend code
          </button>

          <Button className="bg-green-500 w-full py-2 rounded-full hover:bg-green-600 text-black text-lg font-bold" onClick={verifyOtp}>
            Submit
          </Button>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <div className="flex-grow border-t border-gray-600" />
            <span>or</span>
            <div className="flex-grow border-t border-gray-600" />
          </div>

          <div className="text-gray-500 hover:text-white cursor-pointer" onClick={() => navigate("/login-diary")}>
            Log in with a password
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginWithOtp;
