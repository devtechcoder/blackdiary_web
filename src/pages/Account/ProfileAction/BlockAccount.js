import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Typography, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import Main from "../../../components/layout/Main";
import AccountSideNav from "../AccountSideNav";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../../constants/seo";
const { Title, Text } = Typography;

const BlockedAccount = () => {
  const navigate = useNavigate();

  // Sample data - replace with actual blocked user list
  const blockedUsers = [
    {
      id: 1,
      name: "korakagazzz",
      description: "Korakagazzz | Shayari | Poetry",
      image: "https://i.pravatar.cc/300", // replace with actual image
    },
  ];

  return (
    <Main>
      <div className="flex min-h-screen bg-black text-white">
        {/* Sidebar */}
        <div className="w-80 p-4 border-r border-gray-800">
          <AccountSideNav />
        </div>
        <div className="min-h-screen bg-[#191414] text-white px-6 py-10">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6 cursor-pointer hover:text-[#1DB954] transition" onClick={() => navigate(-1)}>
            <ArrowLeftOutlined className="text-lg" />
            <Title level={4} className="!mb-0 text-white">
              Blocked accounts
            </Title>
          </div>

          {/* Subheading */}
          <Text className="text-[#B3B3B3] block mb-8">You can block people anytime from their profiles.</Text>

          {/* Blocked Users */}
          {blockedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between bg-[#121212] p-4 rounded-lg mb-4 hover:bg-[#1a1a1a] transition">
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
    </Main>
  );
};

export default BlockedAccount;
