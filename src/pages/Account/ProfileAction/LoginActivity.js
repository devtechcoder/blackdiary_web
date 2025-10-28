import { useState } from "react";
import { Card, Collapse, Typography, Tag, Divider } from "antd";
import { ArrowLeftOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Main from "../../../components/layout/Main";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../../constants/seo";
const { Panel } = Collapse;
const { Title, Text } = Typography;

const sessionData = [
  {
    location: "Jaipur, Rajasthan",
    time: "Active now",
    device: "This Windows",
    isActive: true,
    mapImage: "/map-preview.png",
  },
  {
    location: "Jaipur, Rajasthan",
    time: "17 minutes ago",
    device: "This Windows",
    isActive: false,
    mapImage: "/map-preview.png",
  },
  {
    location: "Jaipur, Rajasthan",
    time: "12 hours ago",
    device: "Samsung SM-A047F",
    isActive: false,
  },
  {
    location: "Jaipur, Rajasthan",
    time: "7 days ago",
    device: "Windows",
    isActive: false,
  },
];

const SessionItem = ({ session, index }) => {
  return (
    <Collapse bordered={false} className="bg-white rounded-md shadow-md">
      <Panel
        header={
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <EnvironmentOutlined className="text-lg text-blue-600" />
                <Text strong>{session.location}</Text>
                {session.isActive ? (
                  <Tag color="green">Active now</Tag>
                ) : (
                  <Text type="secondary" className="text-sm ml-2">
                    {session.time}
                  </Text>
                )}
              </div>
              <Text type="secondary" className="text-sm">
                {session.device}
              </Text>
            </div>
          </div>
        }
        key={index}
      >
        {session.mapImage && <img src={session.mapImage} alt="Map Preview" className="w-full rounded-md mt-2" />}
      </Panel>
    </Collapse>
  );
};

const LoginActivity = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <div className="max-w-3xl mx-auto p-6">
        {/* <Card bordered={false} className="mb-6 border-b border-gray-300 pb-4 shadow-xl"> */}
        <div className="flex items-center gap-2 mb-4 cursor-pointer hover:text-blue-400 transition">
          <ArrowLeftOutlined className="text-white text-lg hover:scale-110 duration-200" onClick={() => navigate(-1)} />
          <Title level={4} className="!mb-0 text-white">
            Where You're Logged in
          </Title>
        </div>
        <Divider className="my-4" />
        <div className="space-y-4 mb-6 border-b border-gray-300 pb-4">
          {sessionData.map((session, idx) => (
            <SessionItem key={idx} session={session} index={idx} />
          ))}
        </div>
        {/* </Card> */}
      </div>
    </Main>
  );
};

export default LoginActivity;
