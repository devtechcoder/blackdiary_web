"use client";

import { Switch, Typography } from "antd";
import { useState } from "react";
import Main from "../../../components/layout/Main";
import AccountSideNav from "../AccountSideNav";
import { useNavigate } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const AccountPrivacy = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);
  const navigate = useNavigate();

  return (
    <Main>
      <div className="account-privacy-page grid min-h-screen bg-black text-white xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="border-b border-white/10 p-3 sm:p-4 xl:sticky xl:top-0 xl:h-[calc(100vh-2rem)] xl:border-b-0 xl:border-r xl:border-white/10 xl:bg-black/70 xl:overflow-y-auto">
          <AccountSideNav />
        </div>

        <div className="min-w-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.06),transparent_30%),linear-gradient(180deg,#171313_0%,#120f0f_100%)] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto w-full max-w-4xl">
            <div className="mb-6 flex items-center gap-2 cursor-pointer hover:text-[#1DB954] transition" onClick={() => navigate(-1)}>
              <ArrowLeftOutlined className="text-lg" />
              <Title level={4} className="!mb-0 text-white">
                Account privacy
              </Title>
            </div>

            <div className="space-y-4 rounded-[28px] border border-[rgba(212,175,55,0.18)] bg-[#121212] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.24)] sm:p-6">
              <div className="flex flex-col gap-4 rounded-[22px] border border-white/10 bg-[#101010] p-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <Text className="font-semibold text-white block text-base">Private account</Text>
                  <Text className="text-[#B3B3B3] text-sm block mt-1">
                    When your account is public, your profile and posts can be seen by anyone, on or off Instagram, even if they don&apos;t have an Instagram account.
                    <br />
                    When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following
                    lists. Certain info on your profile, like your profile picture and username, is visible to everyone on and off Instagram.{" "}
                    <a href="#" className="text-[#1DB954] underline">
                      Learn more
                    </a>
                  </Text>
                </div>
                <Switch checked={isPrivate} onChange={setIsPrivate} className="account-privacy-switch" />
              </div>

              <div className="flex flex-col gap-4 rounded-[22px] border border-white/10 bg-[#101010] p-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <Text className="font-semibold text-white block text-base">Allow public photos and videos to appear in search engine results</Text>
                  <Text className="text-[#B3B3B3] text-sm block mt-1">
                    When this is on, search engines like Google can show your public photos and videos in search results outside of Instagram. When this is off, links to your publicly shared content can
                    still appear in search results.{" "}
                    <a href="#" className="text-[#1DB954] underline">
                      Learn more
                    </a>
                  </Text>
                </div>
                <Switch checked={isSearchable} onChange={setIsSearchable} className="account-privacy-switch" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default AccountPrivacy;
