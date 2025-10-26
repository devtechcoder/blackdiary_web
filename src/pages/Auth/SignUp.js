import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import logo from "../../assets/images/icon/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { EmailInputBox, FullNameInputBox, PasswordInputBox, PhoneNumberInputBox, TextInputBox, UserNameInputBox } from "../../components/InputField";
import { Button, Col, Form, Row } from "antd";
import useRequest from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import { Severty, ShowToast } from "../../helper/toast";
import { Helmet } from "react-helmet-async";

import { SEO } from "../../constants/seo";
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md text-center space-y-8">
          {/* Logo */}
          <img src={logo} alt="diary" className="w-12 h-12 mx-auto" />

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl font-bold text-white">Sign up to explore soulful shayaris</h1>

          {/* Email Input */}
          <div className="space-y-2">
            <Form id="create" form={form} onFinish={onCreate} layout="vertical">
              <Row gutter={[16, 0]}>
                <Col span={24} sm={24}>
                  {isPhoneSignUp ? (
                    <PhoneNumberInputBox cover={{ md: 24, xl: 24, span: 24 }} name="mobile" placeholder={"Mobile Number"} number={mobileNumber?.mobile_number} onChange={handleChange} rules={true} />
                  ) : (
                    <EmailInputBox cover={{ md: 24, xl: 24, span: 24 }} name="email" placeholder={"Email"} rules={true} />
                  )}
                  <p className="text-green-500 text-sm cursor-pointer hover:underline" onClick={() => setIsPhoneSignup((prev) => !prev)}>
                    Use {isPhoneSignUp ? "email" : "phone number"} instead.
                  </p>
                </Col>
                <Col span={24} sm={24}>
                  <PasswordInputBox cover={{ md: 24, xl: 24, span: 24 }} name="password" placeholder={"Password"} rules={true} />
                </Col>
                <Col span={24} sm={24}>
                  <FullNameInputBox cover={{ md: 24, xl: 24, span: 24 }} name="name" placeholder={"Full Name"} rules={true} />
                </Col>
                <Col span={24} sm={24}>
                  <UserNameInputBox cover={{ md: 24, xl: 24, span: 24 }} name="user_name" placeholder={"User Name"} rules={true} />
                </Col>
              </Row>
              <Row>
                <Button htmlType="submit" layout="vertical" className="w-full py-2 bg-green-500 text-black font-semibold rounded-full hover:opacity-90 transition">
                  SignUp
                </Button>
              </Row>
            </Form>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <hr className="flex-1 border-neutral-700" />
            <span className="text-neutral-500 text-sm">or</span>
            <hr className="flex-1 border-neutral-700" />
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 justify-center border border-neutral-700 py-2 rounded-full hover:bg-neutral-800 transition">
              <FaGoogle className="text-xl" /> Sign up with Google
            </button>
            <button className="w-full flex items-center gap-3 justify-center border border-neutral-700 py-2 rounded-full hover:bg-neutral-800 transition">
              <FaFacebookF className="text-xl" /> Sign up with Facebook
            </button>
            <button className="w-full flex items-center gap-3 justify-center border border-neutral-700 py-2 rounded-full hover:bg-neutral-800 transition">
              <FaApple className="text-xl" /> Sign up with Apple
            </button>
          </div>

          {/* Footer */}
          <p className="text-sm text-neutral-500">
            Already have an account?{" "}
            <span className="text-white underline cursor-pointer">
              <Link to={"/login-diary"}>Log in here.</Link>
            </span>
          </p>
          <p className="text-xs text-neutral-600 mt-4">
            This site is protected by reCAPTCHA and the Google
            <br />
            <a href="#" className="underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </div>
    </>
  );
}
