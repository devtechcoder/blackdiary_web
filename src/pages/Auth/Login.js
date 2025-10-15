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
import { EmailInputBox, EmailOrUserNameInputBox, PhoneNumberInputBox } from "../../components/InputField";
import ShowLoginAccModal from "../../modals/ShowLoginAccModal";
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
      <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900 flex items-center justify-center px-4">
        <div className="bg-neutral-950 w-full max-w-md rounded-lg p-8 text-white shadow-lg">
          <div className="text-center mb-8">
            <img src={logo} alt="Spotify Logo" className="h-10 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white">Log in to Diary</h1>
          </div>

          {/* Social Buttons */}
          <div className="space-y-4 mb-8">
            <button className="w-full border border-gray-600 rounded-full py-2 flex items-center justify-center hover:bg-neutral-800">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" className="h-5 w-5 mr-2" />
              Continue with Google
            </button>
            <button className="w-full border border-gray-600 rounded-full py-2 flex items-center justify-center hover:bg-neutral-800">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" className="h-5 w-5 mr-2" />
              Continue with Facebook
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
              <PhoneNumberInputBox name="mobile" placeholder={"Mobile Number"} number={mobileNumber?.mobile_number} onChange={handleChange} rules={true} />
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

            <Form.Item
              className="password"
              // label={lang("Password")}
              name="password"
              rules={[
                {
                  max: 255,
                  message: lang("Password should contain more then 255 characters!"),
                },
                {
                  required: true,
                  message: lang("Please enter your password!"),
                },
              ]}
            >
              <Input.Password onCut={(e) => e.preventDefault()} onCopy={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()} autoComplete="off" placeholder={lang("Password")} />
            </Form.Item>
            <Form.Item>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition duration-200" type="primary" htmlType="submit" loading={loading}>
                {lang("Continue")}
              </Button>
            </Form.Item>
          </Form>
          <p className="text-sm text-center text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link to={"/signUp-diary"} className="text-white underline">
              Sign up for Diary
            </Link>
          </p>
        </div>
      </div>
      {showAccount && <ShowLoginAccModal show={showAccount} hide={() => setShowAccount(false)} data={account} />}
    </>
  );
}
