import { Layout, Button, Row, Col, Typography, Form, Input, Switch, Modal, Select, Checkbox } from "antd";
import React, { useContext, useState } from "react";
import logo from "../../assets/images/icon/logo.png";
import { Link, useNavigate } from "react-router-dom";
import apiPath from "../../constants/apiPath";
import encryptDecrypt from "../../helper/encryptDecrypt";
import lang from "../../helper/langHelper";
import { ShowToast, Severty } from "../../helper/toast";
import { AuthContext } from "../../context/AuthContext";
import useRequest from "../../hooks/useRequest";
import { EmailInputBox, EmailOrUserNameInputBox, PasswordInputBox, PhoneNumberInputBox } from "../../components/InputField";
import ShowLoginAccModal from "../../modals/ShowLoginAccModal";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../constants/seo";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import GoogleLogin from "./googleLogin";
export default function Login() {
  const { request } = useRequest();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState([]);
  const [showAccount, setShowAccount] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

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
      email_or_username: email_or_username,
      auth_type: !!isPhoneVerify ? "Phone" : authType,
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
        <title>{SEO.login.primary.title}</title>
        <meta name="description" content={SEO.login.primary.description} />
        <meta name="keywords" content={SEO.login.primary.keywords} />

        {/* 🔹 Open Graph (for Facebook, WhatsApp, etc.) */}
        <meta property="og:title" content={SEO.login.openGraph.title} />
        <meta property="og:description" content={SEO.login.openGraph.description} />
        <meta property="og:image" content={SEO.login.openGraph.image} />
        <meta property="og:url" content={SEO.login.openGraph.url} />
        <meta property="og:type" content={SEO.login.openGraph.type} />
        <meta property="og:site_name" content={SEO.login.openGraph.site_name} />

        {/* 🔹 Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.login.twitter.title} />
        <meta name="twitter:description" content={SEO.login.twitter.description} />
        <meta name="twitter:image" content={SEO.login.twitter.image} />
        <meta name="twitter:url" content={SEO.login.twitter.url} />
        <meta name="twitter:type" content={SEO.login.twitter.type} />
        <meta name="twitter:site_name" content={SEO.login.twitter.site_name} />

        {/* 🔹 Canonical & Language Tags */}
        <link rel="canonical" href={SEO.common.url} />
        <meta name="robots" content={SEO.common.robots} />
        <meta name="language" content={SEO.common.language} />
        <meta name="author" content={SEO.common.author} />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900 flex items-center justify-center px-4">
        <div className="bg-neutral-950 w-full max-w-md rounded-lg p-8 text-white shadow-lg">
          <div className="text-center mb-8">
            <img src={logo} alt="Spotify Logo" className="h-10 mx-auto mb-4 cursor-pointer" onClick={() => navigate("/")} />
            <h1 className="text-2xl font-bold text-white">Log in to Diary</h1>
          </div>

          {/* Social Buttons */}
          <div className="space-y-4 mb-8">
            <GoogleLogin />
            <button className="w-full border border-gray-600 rounded-full py-2 flex items-center justify-center gap-3 hover:bg-neutral-800">
              <FaFacebookF className="text-xl" /> Continue with Facebook
            </button>
            <button className="w-full border border-gray-600 rounded-full py-2 flex items-center justify-center hover:bg-neutral-800" onClick={() => setIsPhoneVerify((prev) => !prev)}>
              Continue with {!isPhoneVerify ? `Phone number` : "Email or Username"}
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 mb-6"></div>

          {/* Login Form */}
          <Form form={form} onFinish={getLoginAccount} onFinishFailed={(err) => ShowToast(err, Severty.ERROR)} layout="vertical" className="custom-form">
            {!!isPhoneVerify ? (
              <PhoneNumberInputBox span={24} cover={{ md: 24 }} name="mobile" placeholder={"Mobile Number"} number={mobileNumber?.mobile_number} onChange={handleChange} rules={true} />
            ) : (
              <EmailOrUserNameInputBox
                onChange={(e, info) => {
                  setAuthType(info.type); // "Email", "UserName", or "invalid"
                }}
                cover={{ md: 24, xl: 24, span: 24 }}
                name="email_or_username"
                placeholder={"Email or Username"}
                rules={true}
              />
            )}
            <PasswordInputBox
              cover={{ md: 24 }}
              name="password"
              placeholder={"Password"}
              rules={[
                {
                  required: true,
                  message: lang("Please enter your password!"),
                },
              ]}
            />

            <Form.Item>
              <Button
                htmlType="submit"
                loading={loading}
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-md transition-all duration-300 h-auto text-base transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/40"
              >
                {lang("Continue")}
              </Button>
            </Form.Item>
          </Form>
          <p className="text-sm text-center text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link to={"/signup"} className="text-white underline">
              Sign up for Diary
            </Link>
          </p>
        </div>
      </div>
      {showAccount && <ShowLoginAccModal show={showAccount} hide={() => setShowAccount(false)} data={account} />}
    </>
  );
}
