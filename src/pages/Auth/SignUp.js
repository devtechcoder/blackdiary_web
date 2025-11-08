import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import logo from "../../assets/images/icon/logo.png";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { EmailInputBox, FullNameInputBox, PasswordInputBox, PhoneNumberInputBox, UserNameInputBox } from "../../components/InputField";
import { Button, Col, Form, Row } from "antd";
import useRequest from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import { Severty, ShowToast } from "../../helper/toast";
import { Helmet } from "react-helmet-async";

import { SEO } from "../../constants/seo";
import lang from "../../helper/langHelper";
export default function SignUp() {
  const [form] = Form.useForm();
  const { request } = useRequest();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isPhoneSignUp, setIsPhoneSignup] = useState(false);
  const [mobileNumber, setMobileNumber] = useState({
    mobile_number: "",
    country_code: "",
  });

  const onCreate = (values) => {
    setLoading(true);
    const payload = {
      ...values,
      signup_type: !!isPhoneSignUp ? "Phone" : "Email",
    };
    payload.mobile_number = mobileNumber.mobile_number;
    payload.country_code = mobileNumber.country_code;

    request({
      url: `${apiPath.signup}`,
      method: "POST",
      data: payload,
      onSuccess: ({ data, status, message }) => {
        setLoading(false);
        if (status) {
          ShowToast(message, Severty.SUCCESS);
          console.log(data, "data++++");
          navigate(`/signUp-otp/${data?.data?._id}`);
        } else {
          ShowToast(message, Severty.ERROR);
        }
      },
      onError: (error) => {
        ShowToast(error?.response?.data?.message, Severty.ERROR);
        setLoading(false);
      },
    });
  };

  const handleChange = (value, data) => {
    var country_code = data.dialCode;
    setMobileNumber({
      country_code: country_code,
      mobile_number: value.slice(data.dialCode.length),
    });
  };

  return (
    <>
      <Helmet>
        {/* 🔹 Primary Meta Tags */}
        <title>{SEO.signup.primary.title}</title>
        <meta name="description" content={SEO.signup.primary.description} />
        <meta name="keywords" content={SEO.signup.primary.keywords} />

        {/* 🔹 Open Graph (for Facebook, WhatsApp, etc.) */}
        <meta property="og:title" content={SEO.signup.openGraph.title} />
        <meta property="og:description" content={SEO.signup.openGraph.description} />
        <meta property="og:image" content={SEO.signup.openGraph.image} />
        <meta property="og:url" content={SEO.signup.openGraph.url} />
        <meta property="og:type" content={SEO.signup.openGraph.type} />
        <meta property="og:site_name" content={SEO.signup.openGraph.site_name} />

        {/* 🔹 Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.signup.twitter.title} />
        <meta name="twitter:description" content={SEO.signup.twitter.description} />
        <meta name="twitter:image" content={SEO.signup.twitter.image} />
        <meta name="twitter:url" content={SEO.signup.twitter.url} />
        <meta name="twitter:type" content={SEO.signup.twitter.type} />
        <meta name="twitter:site_name" content={SEO.signup.twitter.site_name} />

        {/* 🔹 Canonical & Language Tags */}
        <link rel="canonical" href={SEO.common.url} />
        <meta name="robots" content={SEO.common.robots} />
        <meta name="language" content={SEO.common.language} />
        <meta name="author" content={SEO.common.author} />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white flex items-center justify-center px-4 py-10">
        <div className="bg-neutral-950 w-full max-w-md rounded-lg p-8 text-white shadow-lg animate-fade-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <img src={logo} alt="diary" className="h-20 mx-auto mb-4 cursor-pointer" onClick={() => navigate("/")} />

            {/* Headline */}
            <h1 className="text-2xl font-bold text-white">Sign up to explore soulful shayaris</h1>
          </div>

          {/* Form */}
          <Form id="create" form={form} onFinish={onCreate} layout="vertical" className="custom-form space-y-4">
            <Row gutter={[16, 0]}>
              <Col span={24}>
                {isPhoneSignUp ? (
                  <PhoneNumberInputBox span={24} cover={{ md: 24 }} name="mobile" placeholder={"Mobile Number"} number={mobileNumber?.mobile_number} onChange={handleChange} rules={true} />
                ) : (
                  <EmailInputBox span={24} cover={{ md: 24 }} name="email" placeholder={"shayar@domain.com"} rules={true} />
                )}
                <p className="text-green-500 text-sm cursor-pointer hover:underline text-center mt-2" onClick={() => setIsPhoneSignup((prev) => !prev)}>
                  Use {isPhoneSignUp ? "email" : "phone number"} instead.
                </p>
              </Col>
              <Col span={24}>
                <PasswordInputBox
                  cover={{ md: 24 }}
                  name="password"
                  placeholder={"Password"}
                  rules={[
                    {
                      required: true,
                      message: lang("Please enter your password!"),
                    },
                    {
                      pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/),
                      message:
                        "New password at least contain 8 characters, at least contain one capital letter, at least contain one small letter, at  least contain one digit, atleast contain one special character",
                    },

                    {
                      max: 250,
                      message: lang("Password must not be more than 250 characters!"),
                    },
                  ]}
                />
              </Col>
              <Col span={24}>
                <FullNameInputBox cover={{ md: 24 }} name="name" placeholder={"Full Name"} rules={true} />
              </Col>
              <Col span={24}>
                <UserNameInputBox cover={{ md: 24 }} name="user_name" placeholder={"User Name"} rules={true} />
              </Col>
            </Row>
            <Form.Item className="mb-0">
              <Button
                htmlType="submit"
                loading={loading}
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-md transition-all duration-300 h-auto text-base transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/40"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-2 my-6">
            <div className="flex-grow border-t border-gray-700" />
            <span className="text-neutral-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-700" />
          </div>

          {/* Social Buttons */}
          <div className="space-y-4">
            <button className="w-full flex items-center gap-3 justify-center border border-gray-600 py-2 rounded-full hover:bg-neutral-800 transition">
              <FaGoogle className="text-xl" /> Sign up with Google
            </button>
            <button className="w-full flex items-center gap-3 justify-center border border-gray-600 py-2 rounded-full hover:bg-neutral-800 transition">
              <FaFacebookF className="text-xl" /> Sign up with Facebook
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-neutral-400">
              Already have an account?{" "}
              <Link to={"/login"} className="text-white underline cursor-pointer hover:text-green-500 cursor-pointer">
                Log in here.
              </Link>
            </p>
            <p className="text-xs text-neutral-500 mt-4">
              This site is protected by reCAPTCHA and the Google
              <br />
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
