"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Typography, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import Main from "../../../components/layout/Main";
import AccountSideNav from "../AccountSideNav";

const { Title, Text } = Typography;

const BlockedAccount = () => {
  const navigate = useNavigate();

  const blockedUsers = [
    {
      id: 1,
      name: "korakagazzz",
      description: "Korakagazzz | Shayari | Poetry",
      image: "https://i.pravatar.cc/300",
    },
  ];

  return (
    <Main>
      <div className="grid min-h-screen bg-black text-white xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="border-b border-white/10 p-3 sm:p-4 xl:sticky xl:top-0 xl:h-[calc(100vh-2rem)] xl:border-b-0 xl:border-r xl:border-white/10 xl:bg-black/70 xl:overflow-y-auto">
          <AccountSideNav />
        </div>

        <div className="min-w-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.06),transparent_30%),linear-gradient(180deg,#171313_0%,#120f0f_100%)] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto w-full max-w-4xl">
            <div className="mb-6 flex items-center gap-2 cursor-pointer hover:text-[#1DB954] transition" onClick={() => navigate(-1)}>
              <ArrowLeftOutlined className="text-lg" />
              <Title level={4} className="!mb-0 text-white">
                Blocked accounts
              </Title>
            </div>

            <Text className="text-[#B3B3B3] block mb-8">You can block people anytime from their profiles.</Text>

            <div className="space-y-4 rounded-[28px] border border-[rgba(212,175,55,0.18)] bg-[#121212] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.24)] sm:p-6">
              {blockedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col gap-4 rounded-[22px] border border-white/10 bg-[#101010] p-4 transition hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Avatar size={48} src={user.image} />
                    <div>
                      <Text className="text-white font-semibold">{user.name}</Text>
                      <p className="text-[#B3B3B3] text-sm">{user.description}</p>
                    </div>
                  </div>

                  <Button type="text" className="bg-[#1DB954] text-black font-semibold px-4 py-1 rounded-lg hover:opacity-90">
                    Unblock
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default BlockedAccount;
