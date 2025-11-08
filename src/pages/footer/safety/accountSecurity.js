import React from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../../components/layout/publicLayout";
import { Link } from "react-router-dom";
import { SafetyCertificateOutlined, KeyOutlined, LaptopOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const securityFeatures = [
  {
    icon: <SafetyCertificateOutlined className="text-3xl text-indigo-500" />,
    title: "Two-Factor Authentication (2FA)",
    description: "Add an extra layer of security to your account. With 2FA enabled, you'll need to provide a code from your phone in addition to your password when logging in from a new device.",
    link: "/account/login-activity", // This should ideally point to a dedicated 2FA setup page
    linkText: "Enable 2FA",
  },
  {
    icon: <KeyOutlined className="text-3xl text-indigo-500" />,
    title: "Strong Password",
    description: "Your password is your first line of defense. Use a unique combination of letters, numbers, and symbols. We recommend changing your password regularly.",
    link: "/account/manage-account", // This should point to a password change page
    linkText: "Change Your Password",
  },
  {
    icon: <LaptopOutlined className="text-3xl text-indigo-500" />,
    title: "Review Login Activity",
    description: "You can see a list of all devices that have recently logged into your account. If you see any suspicious activity, you can log out of those sessions immediately.",
    link: "/account/login-activity",
    linkText: "Check Login Activity",
  },
  {
    icon: <QuestionCircleOutlined className="text-3xl text-indigo-500" />,
    title: "Beware of Phishing",
    description:
      "Black Diary will never ask for your password via email. Be cautious of suspicious emails or messages asking for your personal information. Always log in directly through our official app or website.",
    link: "/safety-support",
    linkText: "Learn More & Report",
  },
];

const AccountSecurity = () => {
  return (
    <>
      <Helmet>
        <title>Account Security - Black Diary</title>
        <meta name="description" content="Learn how to keep your Black Diary account secure with features like Two-Factor Authentication, login reviews, and strong passwords." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Keeping Your Account Secure</h1>
              <p className="text-lg text-gray-600">Your privacy and security are our highest priority. Here are the tools and tips to help you protect your account.</p>
            </div>

            {/* Security Features List */}
            <div className="space-y-10">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-700 mt-1 mb-4">{feature.description}</p>
                    <Link to={feature.link} className="font-semibold text-indigo-600 hover:text-indigo-800">
                      {feature.linkText} &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default AccountSecurity;
