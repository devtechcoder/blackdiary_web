import React, { useEffect, useState } from "react";
import { Button } from "antd";
import useRequest, { useGetApi } from "../../hooks/useRequest";
import { useNavigate, useParams } from "react-router";
import apiPath from "../../constants/apiPath";
import { Severty, ShowToast } from "../../helper/toast";
import Loader from "../../components/Loader";
import { maskEmail, maskPhone } from "../../helper/functions";
import OtpInput from "react-otp-input";
import { useAuthContext } from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../constants/seo";
import sideLogo from "../../assets/images/brand/login-logo.png";
const LoginWithOtp = () => {
  const { setIsLoggedIn, setUserProfile } = useAuthContext();
  const [otp, setOtp] = useState("");
  const { request } = useRequest();
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [error, setError] = useState("");

  const {
    data,
    isLoading,
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

  const verifyOtp = () => {
    if (otp.length !== 6 || otp.includes(" ")) {
      return setError("Please enter all 6 digits.");
    }
    setVerifyLoading(true);
    const payload = { type: userData?.signup_type, user_name: userData?.user_name, otp: otp };
    payload.email = userData.email;
    payload.mobile_number = userData.mobile_number;
    payload.country_code = userData.country_code;

    request({
      url: `${apiPath.verifyOtp}`,
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        setVerifyLoading(false);
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
        setVerifyLoading(false);
      },
    });
  };

  const reSendOtp = () => {
    setResendLoading(true);
    const payload = { type: userData?.signup_type, user_name: userData?.user_name };
    payload.email = userData.email;
    payload.mobile_number = userData.mobile_number;
    payload.country_code = userData.country_code;

    request({
      url: `${apiPath.sendOtp}`,
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        setResendLoading(false);
        if (data.status) {
          ShowToast(data.message, Severty.SUCCESS);
        } else {
          ShowToast(data.message, Severty.ERROR);
        }
      },
      onError: (error) => {
        ShowToast(error?.response?.data?.message, Severty.ERROR);
        setResendLoading(false);
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
      <div className="min-h-screen bg-black text-white lg:h-screen lg:overflow-hidden">
        <main className="h-full lg:grid lg:grid-cols-[45%_55%]">
          <section className="relative hidden items-center justify-center bg-gradient-to-br from-[#000000] via-[#030303] to-[#0a0a0a] px-6 py-8 lg:flex lg:px-12">
            <div className="relative flex flex-col items-center justify-center text-center">
              <div className="absolute h-52 w-52 rounded-full bg-[#D4AF37]/20 blur-[88px]" aria-hidden="true" />
              <img
                onClick={() => navigate("/")}
                src={sideLogo}
                alt="Black Diary Shayari logo"
                className="relative cursor-pointer w-24 max-w-[230px] object-contain drop-shadow-[0_0_38px_rgba(212,175,55,0.35)] sm:w-32 lg:w-44"
              />
              <div className="mt-5 space-y-1 text-center text-sm text-[#cfb061] sm:text-base">
                <p className="tracking-wide">Read words that understand your feelings.</p>
                <p className="tracking-wide text-[#e2c675]">Welcome to the world of Shayari.</p>
              </div>
              <div className="mt-5 w-44 space-y-2" aria-hidden="true">
                <div className="h-[2px] overflow-hidden rounded-full bg-[#2a2a2a]">
                  <span className="block h-full w-full animate-pulse bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                </div>
                <div className="h-[1px] overflow-hidden rounded-full bg-[#1f1f1f]">
                  <span className="block h-full w-full animate-pulse bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                </div>
              </div>
            </div>
          </section>

          <section className="flex min-h-screen items-center justify-center bg-[#050505] px-4 py-6 sm:px-8 lg:min-h-0 lg:px-12">
            <article className="w-full max-w-md rounded-2xl border border-[#262626] bg-white/[0.02] p-6 shadow-[0_20px_55px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8">
              <div>
                <h1 className="mb-2 text-left text-2xl font-semibold text-[#f8f8f8]">Verify OTP</h1>
                <p className="mb-5 max-w-md text-sm leading-relaxed text-[#b9b9b9] sm:text-[15px]">
                  Enter the 6-digit code sent to{" "}
                  <span className="font-medium text-[#e5e5e5]">{userData?.signup_type === "Email" ? maskEmail(userData?.email) : `+${userData?.country_code}-${maskPhone(userData?.mobile_number)}`}</span>
                </p>
              </div>

              <div className="mb-3 flex justify-center">
                <OtpInput
                  value={otp}
                  onChange={(val) => {
                    setOtp(val);
                    setError("");
                  }}
                  numInputs={6}
                  inputType="number"
                  shouldAutoFocus
                  containerStyle="otp-input-row"
                  renderInput={(props) => <input {...props} className="otp-input otp-input-gold" />}
                />
              </div>
              {error && <p className="mb-3 text-center text-sm text-red-400">{error}</p>}

              <Button
                onClick={reSendOtp}
                loading={resendLoading}
                disabled={resendLoading || verifyLoading}
                className="!mb-4 !h-11 !w-full !rounded-[10px] !border !border-[#4a4a4a] !bg-[#0b0b0b] !text-base !font-medium !text-[#f0f0f0] transition-all duration-300 hover:!border-[#D4AF37]/70 hover:!text-[#D4AF37]"
              >
                Resend code
              </Button>

              <Button
                htmlType="button"
                onClick={verifyOtp}
                loading={verifyLoading}
                disabled={verifyLoading || resendLoading}
                className="!h-11 !w-full !rounded-[10px] !border-0 !bg-[#D4AF37] !text-base !font-semibold !text-[#131313] shadow-[0_12px_28px_rgba(212,175,55,0.22)] transition-all duration-300 hover:!bg-[#e1bd4f] hover:shadow-[0_16px_32px_rgba(212,175,55,0.3)]"
              >
                Submit
              </Button>

              <div className="my-5 flex items-center justify-center gap-2 text-sm text-[#8f8f8f]">
                <div className="flex-grow border-t border-[#3a3a3a]" />
                <span>or</span>
                <div className="flex-grow border-t border-[#3a3a3a]" />
              </div>

              <button type="button" className="w-full text-center text-sm font-medium text-[#bcbcbc] transition-colors duration-200 hover:text-[#D4AF37]" onClick={() => navigate("/login-diary")}>
                Log in with a password
              </button>
            </article>
          </section>
        </main>
      </div>
    </>
  );
};

export default LoginWithOtp;
