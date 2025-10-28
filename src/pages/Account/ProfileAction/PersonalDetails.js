import React from "react";
import { Card, Typography, Divider } from "antd";
import { ArrowLeftOutlined, RightOutlined } from "@ant-design/icons";
import AccountSideNav from "../AccountSideNav";
import Main from "../../../components/layout/Main";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../../constants/seo";
const { Title, Text } = Typography;

const PersonalDetails = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <div className="flex min-h-screen bg-black text-white">
        {/* Sidebar */}
        <div className="w-80 p-4 border-r border-gray-800">
          <AccountSideNav />
        </div>
        <div className="min-h-screen bg-[#191414] flex items-center justify-center p-4">
          <Card className="w-full max-w-md rounded-2xl shadow-lg" style={{ backgroundColor: "#121212", color: "white", border: "none" }}>
            {/* <Title level={3} style={{ color: "#1DB954" }}>
              Personal details
            </Title> */}
            <div className="flex items-center gap-2 mb-4 cursor-pointer hover:text-blue-400 transition text-[#1DB954]">
              <ArrowLeftOutlined className="text-[#1DB954] text-lg hover:scale-110 duration-200" onClick={() => navigate(-1)} />
              <Title level={4} style={{ color: "#1DB954" }} className="!mb-0 text-[#1DB954]">
                Personal details
              </Title>
            </div>
            <Text className="text-gray-300">Meta uses this information to verify your identity and to keep our community safe. You decide what personal details you make visible to others.</Text>

            <Divider style={{ backgroundColor: "#333" }} />

            <div className="hover:bg-[#1DB95422] rounded-lg p-3 flex justify-between items-center cursor-pointer">
              <div>
                <Text className="text-white font-semibold block">Contact info</Text>
                <Text className="text-gray-400 text-sm block">+918875382004</Text>
              </div>
              <RightOutlined className="text-white" />
            </div>

            <Divider style={{ backgroundColor: "#333" }} />

            <div className="hover:bg-[#1DB95422] rounded-lg p-3 flex justify-between items-center cursor-pointer">
              <div>
                <Text className="text-white font-semibold block">Birthday</Text>
                <Text className="text-gray-400 text-sm block">December 24, 2004</Text>
              </div>
              <RightOutlined className="text-white" />
            </div>

            <Divider style={{ backgroundColor: "#333" }} />

            <div className="hover:bg-[#1DB95422] rounded-lg p-3 flex justify-between items-center cursor-pointer">
              <div>
                <Text className="text-white font-semibold block">Account ownership and control</Text>
                <Text className="text-gray-400 text-sm block">Manage your data, modify your legacy contact, deactivate or delete your accounts and profiles.</Text>
              </div>
              <RightOutlined className="text-white" />
            </div>
          </Card>
        </div>
      </div>
    </Main>
  );
};

export default PersonalDetails;
