import { Switch, Typography } from "antd";
import { useState } from "react";
import Main from "../../../components/layout/Main";
import AccountSideNav from "../AccountSideNav";
import { useNavigate } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../../constants/seo";
const { Title, Text } = Typography;

const AccountPrivacy = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);
  const navigate = useNavigate();

  return (
    <Main>
      <div className="flex min-h-screen bg-black text-white">
        {/* Sidebar */}
        <div className="w-80 p-4 border-r border-gray-800">
          <AccountSideNav />
        </div>
        <div className="min-h-screen bg-[#191414] px-6 py-10 text-white">
          <div className="flex items-center gap-2 mb-6 cursor-pointer hover:text-[#1DB954] transition" onClick={() => navigate(-1)}>
            <ArrowLeftOutlined className="text-lg" />
            <Title level={4} className="!mb-0 text-white">
              Account privacy
            </Title>
          </div>
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 mt-6 space-y-8">
            {/* Private account toggle */}
            <div className="flex justify-between items-start">
              <div className="max-w-xl">
                <Text className="font-semibold text-white block text-base">Private account</Text>
                <Text className="text-[#B3B3B3] text-sm block mt-1">
                  When your account is public, your profile and posts can be seen by anyone, on or off Instagram, even if they don’t have an Instagram account.
                  <br />
                  When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following
                  lists. Certain info on your profile, like your profile picture and username, is visible to everyone on and off Instagram.{" "}
                  <a href="#" className="text-[#1DB954] underline">
                    Learn more
                  </a>
                </Text>
              </div>
              <Switch checked={isPrivate} onChange={setIsPrivate} className="bg-[#555] data-[checked=true]:bg-[#1DB954]" />
            </div>

            {/* Search visibility toggle */}
            <div className="flex justify-between items-start">
              <div className="max-w-xl">
                <Text className="font-semibold text-white block text-base">Allow public photos and videos to appear in search engine results</Text>
                <Text className="text-[#B3B3B3] text-sm block mt-1">
                  When this is on, search engines like Google can show your public photos and videos in search results outside of Instagram. When this is off, links to your publicly shared content can
                  still appear in search results.{" "}
                  <a href="#" className="text-[#1DB954] underline">
                    Learn more
                  </a>
                </Text>
              </div>
              <Switch checked={isSearchable} onChange={setIsSearchable} className="bg-[#555] data-[checked=true]:bg-[#1DB954]" />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default AccountPrivacy;
