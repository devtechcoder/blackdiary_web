import React, { useState } from "react";
import { Radio, Typography } from "antd";
import Main from "../../../components/layout/Main";
import { ArrowLeftOutlined, BackwardOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import AccountSideNav from "../AccountSideNav";

const { Title, Text } = Typography;

const emailOptions = [
  {
    title: "Feedback emails",
    desc: "Give feedback on Instagram",
  },
  {
    title: "Reminder emails",
    desc: "Get notifications you may have missed.",
  },
  {
    title: "Product emails",
    desc: "Get tips and resources about Instagram’s tools.",
  },
  {
    title: "News emails",
    desc: "Learn about new Instagram features.",
  },
  {
    title: "Promotional emails",
    desc: "Learn more about offers and features for Instagram professional accounts.",
  },
  {
    title: "Support emails",
    desc: "Get updates on reports and violations of our Community Standards.",
  },
];

const NotificationPermission = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    "Feedback emails": true,
    "Reminder emails": true,
    "Product emails": true,
    "News emails": true,
    "Promotional emails": false,
    "Support emails": true,
  });

  const handleChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Main>
      <div className="flex min-h-screen bg-black text-white">
        {/* Sidebar */}
        <div className="w-80 p-4 border-r border-gray-800">
          <AccountSideNav />
        </div>
        <div className="max-w-3xl mx-auto p-6">
          <div className="flex items-center gap-2 mb-4 cursor-pointer hover:text-blue-400 transition">
            <ArrowLeftOutlined className="text-white text-lg hover:scale-110 duration-200" onClick={() => navigate(-1)} />
            <Title level={4} className="!mb-0 text-white">
              Email Notifications
            </Title>
          </div>
          {emailOptions.map((item) => (
            <div key={item.title} className="mb-6 border-b border-gray-300 pb-4">
              <Text className="block font-semibold mb-1 text-white">{item.title}</Text>
              <Radio.Group onChange={(e) => handleChange(item.title, e.target.value)} value={preferences[item.title]} className="mb-1">
                <Radio value={false} className="text-gray-300 text-sm">
                  Off
                </Radio>
                <Radio value={true} className="text-gray-300 text-sm">
                  On
                </Radio>
              </Radio.Group>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Main>
  );
};

export default NotificationPermission;
