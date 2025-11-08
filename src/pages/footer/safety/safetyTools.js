import React from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../../components/layout/publicLayout";
import { Link } from "react-router-dom";
import { LockOutlined, EyeInvisibleOutlined, UserDeleteOutlined, SafetyCertificateOutlined, NotificationOutlined } from "@ant-design/icons";

const tools = [
  {
    icon: <LockOutlined className="text-3xl text-indigo-500" />,
    title: "Account Security",
    description: "Keep your account secure with features like two-factor authentication and login activity reviews.",
    link: "/account/login-activity",
    linkText: "Manage Security",
  },
  {
    icon: <EyeInvisibleOutlined className="text-3xl text-indigo-500" />,
    title: "Privacy Tools",
    description: "Control who can see your profile and posts. Make your account private to approve followers.",
    link: "/account/privacy-account",
    linkText: "Adjust Privacy",
  },
  {
    icon: <UserDeleteOutlined className="text-3xl text-indigo-500" />,
    title: "Block Accounts",
    description: "Prevent specific accounts from seeing your profile, contacting you, or interacting with your content.",
    link: "/account/block-account",
    linkText: "View Block List",
  },
  {
    icon: <SafetyCertificateOutlined className="text-3xl text-indigo-500" />,
    title: "Manage Your Content",
    description: "You are in control. Edit or delete your posts and diary entries at any time.",
    link: "/profile",
    linkText: "Go to Profile",
  },
  {
    icon: <NotificationOutlined className="text-3xl text-indigo-500" />,
    title: "Notification Controls",
    description: "Customize the notifications you receive to focus on what matters most to you.",
    link: "/account/notification-permission",
    linkText: "Set Preferences",
  },
];

const SafetyTools = () => {
  return (
    <>
      <Helmet>
        <title>Safety Tools - Black Diary</title>
        <meta name="description" content="Explore the safety tools available on Black Diary to control your privacy, manage your content, and secure your account." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Your Safety Toolkit</h1>
              <p className="text-lg text-gray-600">Tools to help you control your experience and stay safe on Black Diary.</p>
            </div>

            {/* Tools Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {tools.map((tool, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    {tool.icon}
                    <h3 className="text-xl font-semibold text-gray-900">{tool.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-4">{tool.description}</p>
                  <Link to={tool.link} className="font-semibold text-indigo-600 hover:text-indigo-800">
                    {tool.linkText} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default SafetyTools;
