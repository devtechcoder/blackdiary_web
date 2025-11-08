import React from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../../components/layout/publicLayout";
import { Link } from "react-router-dom";
import { EyeInvisibleOutlined, MessageOutlined, TagsOutlined, UserSwitchOutlined } from "@ant-design/icons";

const privacyOptions = [
  {
    icon: <EyeInvisibleOutlined className="text-3xl text-indigo-500" />,
    title: "Private Account",
    description: "When your account is private, only followers you approve can see your posts, stories, and diary entries. This gives you complete control over your audience.",
    link: "/account/privacy-account",
    linkText: "Go to Privacy Settings",
  },
  {
    icon: <MessageOutlined className="text-3xl text-indigo-500" />,
    title: "Story Replies & Sharing",
    description:
      "Choose who can reply to your stories and whether others can share your posts to their own stories. You can allow replies from everyone, people you follow, or turn them off completely.",
    link: "/account/privacy-account",
    linkText: "Manage Story Settings",
  },
  {
    icon: <TagsOutlined className="text-3xl text-indigo-500" />,
    title: "Mentions",
    description: "Decide who can mention you in their posts, comments, or stories. This helps prevent unwanted interactions and keeps your space focused.",
    link: "/account/privacy-account",
    linkText: "Control Mentions",
  },
  {
    icon: <UserSwitchOutlined className="text-3xl text-indigo-500" />,
    title: "Activity Status",
    description: "Choose whether to show your activity status (e.g., 'Active now') to other accounts. When turned off, you won't be able to see the activity status of others.",
    link: "/account/privacy-account",
    linkText: "Set Activity Status",
  },
];

const PrivacyTools = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Tools - Black Diary</title>
        <meta name="description" content="Manage your privacy on Black Diary. Control who sees your content, how you're mentioned, and more." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Your Privacy, Your Rules</h1>
              <p className="text-lg text-gray-600">Control your experience and decide what you share on Black Diary.</p>
            </div>

            {/* Privacy Settings List */}
            <div className="space-y-10">
              {privacyOptions.map((option, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0">{option.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{option.title}</h3>
                    <p className="text-gray-700 mt-1 mb-4">{option.description}</p>
                    <Link to={option.link} className="font-semibold text-indigo-600 hover:text-indigo-800">
                      {option.linkText} &rarr;
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

export default PrivacyTools;
