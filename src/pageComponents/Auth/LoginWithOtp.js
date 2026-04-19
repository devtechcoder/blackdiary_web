"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useRequest, { useGetApi } from "../../hooks/useRequest";
import { useNavigate, useParams } from "react-router";
import apiPath from "../../constants/apiPath";
import { Severty, ShowToast } from "../../helper/toast";
import Loader from "../../components/Loader";
import { maskEmail, maskPhone } from "../../helper/functions";
import { useAuthContext } from "../../context/AuthContext";
import sideLogo from "../../assets/images/brand/login-logo.png";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/slices/appSlice";
import { setAuthState } from "../../redux/slices/authSlice";
import { getPostLoginRedirectPath } from "../../utils/authRedirect";
const LoginWithOtp = () => {
  const { setIsLoggedIn, setUserProfile } = useAuthContext();
  const [otp, setOtp] = useState("");
  const otpRefs = useRef([]);
  const { request } = useRequest();
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const {
    data,
    isLoading,
    refetch,
  } = useGetApi({
    queryKey: "userData",
    endpoint: `${apiPath.getOneUser}/${userId}`,
    enabled: userId ? true : false,
  });

  const focusOtpInput = (index) => {
    const nextIndex = Math.max(0, Math.min(5, index));
    otpRefs.current[nextIndex]?.focus();
    otpRefs.current[nextIndex]?.select?.();
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const otpChars = otp.padEnd(6, "").split("");
    otpChars[index] = digit || "";
    const nextOtp = otpChars.join("").slice(0, 6);

    setOtp(nextOtp);
    setError("");

    if (digit && index < 5) {
      focusOtpInput(index + 1);
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      focusOtpInput(index - 1);
    }
  };

  const handleOtpPaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    setOtp(pasted);
    setError("");
    focusOtpInput(Math.min(pasted.length, 6) - 1);
  };

  useEffect(() => {
    if (data?.status) setUserData(data?.data);
  }, [data]);
  useEffect(() => {
    if (userId) refetch();
  }, [userId]);

  const verifyOtp = () => {
    if (!/^\d{6}$/.test(otp)) {
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
          dispatch(setToken(data.data.token));
          dispatch(setUser(data.data.user));
          dispatch(setAuthState({ user: data.data.user }));
          ShowToast(data.message, Severty.SUCCESS);
          const redirectTo = getPostLoginRedirectPath();
          setTimeout(() => navigate(redirectTo), 200);
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
      <div className="min-h-screen bg-black text-white lg:h-screen lg:overflow-hidden">
        <main className="h-full lg:grid lg:grid-cols-[45%_55%]">
          <section className="relative hidden items-center justify-center bg-gradient-to-br from-[#000000] via-[#030303] to-[#0a0a0a] px-6 py-8 lg:flex lg:px-12">
            <div className="relative flex flex-col items-center justify-center text-center">
              <div className="absolute h-52 w-52 rounded-full bg-[#D4AF37]/20 blur-[88px]" aria-hidden="true" />
              <Image
                onClick={() => navigate("/")}
                src={sideLogo}
                alt="Black Diary Shayari logo"
                width={176}
                height={176}
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
                <div className="otp-input-row">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        otpRefs.current[index] = el;
                      }}
                      value={otp[index] || ""}
                      onChange={(event) => handleOtpChange(index, event.target.value)}
                      onKeyDown={(event) => handleOtpKeyDown(index, event)}
                      onPaste={handleOtpPaste}
                      maxLength={1}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      autoFocus={index === 0}
                      className="otp-input otp-input-gold"
                      aria-label={`OTP digit ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              {error && <p className="mb-3 text-center text-sm text-red-400">{error}</p>}

              <button
                type="button"
                onClick={reSendOtp}
                disabled={resendLoading || verifyLoading}
                className="!mb-4 !h-11 !w-full !rounded-[10px] !border !border-[#4a4a4a] !bg-[#0b0b0b] !text-base !font-medium !text-[#f0f0f0] transition-all duration-300 hover:!border-[#D4AF37]/70 hover:!text-[#D4AF37]"
              >
                {resendLoading ? "Sending..." : "Resend code"}
              </button>

              <button
                type="button"
                onClick={verifyOtp}
                disabled={verifyLoading || resendLoading}
                className="!h-11 !w-full !rounded-[10px] !border-0 !bg-[#D4AF37] !text-base !font-semibold !text-[#131313] shadow-[0_12px_28px_rgba(212,175,55,0.22)] transition-all duration-300 hover:!bg-[#e1bd4f] hover:shadow-[0_16px_32px_rgba(212,175,55,0.3)]"
              >
                {verifyLoading ? "Submitting..." : "Submit"}
              </button>

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
