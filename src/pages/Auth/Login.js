import { Button, Form } from "antd";
import React, { useState } from "react";
import sideLogo from "../../assets/images/brand/login-logo.png";
import { Link } from "react-router-dom";
import apiPath from "../../constants/apiPath";
import lang from "../../helper/langHelper";
import { ShowToast, Severty } from "../../helper/toast";
import useRequest from "../../hooks/useRequest";
import { EmailOrUserNameInputBox, PasswordInputBox, PhoneNumberInputBox } from "../../components/InputField";
import ShowLoginAccModal from "../../modals/ShowLoginAccModal";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../constants/seo";
import { FaFacebookF } from "react-icons/fa";
import GoogleLogin from "./googleLogin";

export default function Login() {
  const { request } = useRequest();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState([]);
  const [showAccount, setShowAccount] = useState(false);
  const [form] = Form.useForm();

  const [isPhoneVerify, setIsPhoneVerify] = useState(false);
  const [authType, setAuthType] = useState("Email");
  const [mobileNumber, setMobileNumber] = useState({
    mobile_number: "",
    country_code: "",
  });

  const getLoginAccount = (values) => {
    const { email_or_username, password } = values;

    const payload = {
      password,
      mobile_number: mobileNumber.mobile_number,
      country_code: mobileNumber.country_code,
      email_or_username,
      auth_type: isPhoneVerify ? "Phone" : authType,
    };

    setLoading(true);
    request({
      url: apiPath.getLoginAccount,
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        setLoading(false);
        if (data.status) {
          setShowAccount(true);
          setAccount(data?.data?.account);
        } else {
          ShowToast(data.message, Severty.ERROR);
        }
      },
      onError: (error) => {
        ShowToast(error?.response?.data?.message, Severty.ERROR);
        setLoading(false);
      },
    });
  };

  const handleChange = (value, data) => {
    setMobileNumber({
      country_code: data.dialCode,
      mobile_number: value.slice(data.dialCode.length),
    });
  };

  return (
    <>
      <Helmet>
        <title>{SEO.login.primary.title}</title>
        <meta name="description" content={SEO.login.primary.description} />
        <meta name="keywords" content={SEO.login.primary.keywords} />

        <meta property="og:title" content={SEO.login.openGraph.title} />
        <meta property="og:description" content={SEO.login.openGraph.description} />
        <meta property="og:image" content={SEO.login.openGraph.image} />
        <meta property="og:url" content={SEO.login.openGraph.url} />
        <meta property="og:type" content={SEO.login.openGraph.type} />
        <meta property="og:site_name" content={SEO.login.openGraph.site_name} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.login.twitter.title} />
        <meta name="twitter:description" content={SEO.login.twitter.description} />
        <meta name="twitter:image" content={SEO.login.twitter.image} />
        <meta name="twitter:url" content={SEO.login.twitter.url} />
        <meta name="twitter:type" content={SEO.login.twitter.type} />
        <meta name="twitter:site_name" content={SEO.login.twitter.site_name} />

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
              <img src={sideLogo} alt="Black Diary Shayari logo" className="relative w-24 max-w-[230px] object-contain drop-shadow-[0_0_38px_rgba(212,175,55,0.35)] sm:w-32 lg:w-44" />
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
                <h1 className="mb-2 text-left text-2xl font-semibold text-[#f8f8f8]">Welcome!</h1>
                <p className="mb-5 max-w-sm text-sm leading-relaxed text-[#b9b9b9] sm:text-[15px]">
                  Sign in to your Black Diary and express your feelings.
                </p>
              </div>

              <div className="space-y-3">
                <GoogleLogin className="flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-[#323232] bg-[#0b0b0b] px-4 text-sm font-medium text-[#f0f0f0] transition-all duration-300 hover:border-[#D4AF37]/70 hover:text-[#D4AF37]" />
                <button
                  type="button"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-[#323232] bg-[#0b0b0b] px-4 text-sm font-medium text-[#f0f0f0] transition-all duration-300 hover:border-[#D4AF37]/70 hover:text-[#D4AF37]"
                >
                  <FaFacebookF className="text-base" /> Continue with Facebook
                </button>
                <button
                  type="button"
                  className="flex h-11 w-full items-center justify-center rounded-[10px] border border-[#323232] bg-[#0b0b0b] px-4 text-sm font-medium text-[#f0f0f0] transition-all duration-300 hover:border-[#D4AF37]/70 hover:text-[#D4AF37]"
                  onClick={() => setIsPhoneVerify((prev) => !prev)}
                >
                  Continue with {!isPhoneVerify ? "Phone number" : "Email or Username"}
                </button>
              </div>

              <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#383838] to-transparent" />

              <Form
                form={form}
                onFinish={getLoginAccount}
                onFinishFailed={(err) => ShowToast(err, Severty.ERROR)}
                layout="vertical"
                className="[&_.ant-form-item]:mb-4 [&_.ant-form-item-explain-error]:text-xs [&_.ant-form-item-explain-error]:text-red-400 [&_.ant-input]:h-11 [&_.ant-input]:rounded-[10px] [&_.ant-input]:border-[#303030] [&_.ant-input]:bg-[#0d0d0d] [&_.ant-input]:text-[#f2f2f2] [&_.ant-input-affix-wrapper]:h-11 [&_.ant-input-affix-wrapper]:rounded-[10px] [&_.ant-input-affix-wrapper]:border-[#303030] [&_.ant-input-affix-wrapper]:bg-[#0d0d0d] [&_.ant-input-affix-wrapper-focused]:border-[#D4AF37] [&_.ant-input-affix-wrapper:hover]:border-[#D4AF37]/70 [&_.ant-input-password-icon]:text-[#8e8e8e] [&_.ant-input::placeholder]:text-[#757575] [&_.custom-ant-input:hover]:border-[#D4AF37]/70 [&_.react-tel-input_.form-control]:!h-11 [&_.react-tel-input_.form-control]:!w-full [&_.react-tel-input_.form-control]:!rounded-[10px] [&_.react-tel-input_.form-control]:!border-[#303030] [&_.react-tel-input_.form-control]:!bg-[#0d0d0d] [&_.react-tel-input_.form-control]:!text-[#f2f2f2] [&_.react-tel-input_.selected-flag]:!rounded-l-[10px] [&_.react-tel-input_.selected-flag]:!bg-[#0d0d0d] [&_.react-tel-input_.flag-dropdown]:!rounded-l-[10px] [&_.react-tel-input_.flag-dropdown]:!border-[#303030] [&_.react-tel-input_.flag-dropdown]:!bg-[#0d0d0d]"
              >
                {isPhoneVerify ? (
                  <PhoneNumberInputBox span={24} cover={{ md: 24 }} name="mobile" placeholder="Phone number" number={mobileNumber?.mobile_number} onChange={handleChange} rules />
                ) : (
                  <EmailOrUserNameInputBox
                    onChange={(e, info) => {
                      setAuthType(info.type);
                    }}
                    cover={{ md: 24, xl: 24, span: 24 }}
                    name="email_or_username"
                    placeholder="Email or Username"
                    rules
                  />
                )}

                <PasswordInputBox
                  cover={{ md: 24 }}
                  name="password"
                  placeholder="Password"
                  rules={[
                    {
                      required: true,
                      message: lang("Please enter your password!"),
                    },
                  ]}
                />

                <Form.Item className="!mb-1 !mt-2">
                  <Button
                    htmlType="submit"
                    loading={loading}
                    disabled={loading}
                    className="!h-11 !w-full !rounded-[10px] !border-0 !bg-[#D4AF37] !text-base !font-semibold !text-[#131313] shadow-[0_12px_28px_rgba(212,175,55,0.22)] transition-all duration-300 hover:!bg-[#e1bd4f] hover:shadow-[0_16px_32px_rgba(212,175,55,0.3)]"
                  >
                    {lang("Continue")}
                  </Button>
                </Form.Item>
              </Form>

              <p className="mt-5 text-center text-sm text-[#b6b6b6]">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="font-medium text-[#D4AF37] transition-colors duration-200 hover:text-[#e7c75e]">
                  Sign up
                </Link>
              </p>
            </article>
          </section>
        </main>
      </div>

      {showAccount && <ShowLoginAccModal show={showAccount} hide={() => setShowAccount(false)} data={account} />}
    </>
  );
}
