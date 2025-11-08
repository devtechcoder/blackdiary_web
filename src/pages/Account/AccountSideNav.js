import {
  UserOutlined,
  LockOutlined,
  ProfileOutlined,
  EditOutlined,
  BellOutlined,
  ShopOutlined,
  AppstoreOutlined,
  EyeInvisibleOutlined,
  StarOutlined,
  StopOutlined,
  EyeInvisibleFilled,
  InfoOutlined,
} from "@ant-design/icons";
import { Card, Typography } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const { Text, Title } = Typography;

const AccountSideNav = () => {
  const { setIsLoggedIn, refreshUser, userProfile } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="w-80 h-screen overflow-y-auto p-4 bg-black text-white">
      {/* Meta Card */}
      <Card className="rounded-xl shadow-md mb-6 bg-[#121212] text-white" bordered={false}>
        <Text strong className="text-white">
          Accounts Center
        </Text>
        <p className="text-gray-400 text-sm mb-3">Manage your connected experiences and account settings across black diary technologies.</p>
        <div className="flex flex-col gap-2 text-gray-300 text-sm">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/account/manage-account/${userProfile?.user_name}/${userProfile?._id}`)}>
            <UserOutlined />
            <span>Profile</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/account/personal-details/${userProfile?.user_name}/${userProfile?._id}`)}>
            <InfoOutlined />
            <span>Personal details</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/account/manage-account/${userProfile?.user_name}/${userProfile?._id}`)}>
            <LockOutlined />
            <span>Password and security</span>
          </div>
        </div>
      </Card>

      {/* Section: How you use Instagram */}
      <Text className="text-gray-400 text-xs uppercase">How you use Black Diary</Text>
      <div className="my-3 space-y-3 text-white">
        <div className="flex items-center gap-2 hover:text-green-400 cursor-pointer" onClick={() => navigate(`/account/edit-profile/${userProfile?.user_name}/${userProfile?._id}`)}>
          <EditOutlined />
          <span>Edit profile</span>
        </div>
        <div className="flex items-center gap-2 hover:text-green-400 cursor-pointer" onClick={() => navigate(`/account/notification-permission/${userProfile?.user_name}/${userProfile?._id}`)}>
          <BellOutlined />
          <span>Notifications</span>
        </div>
      </div>

      <div className="border-t border-gray-700 my-4" />

      {/* Section: Who can see your content */}
      <Text className="text-gray-400 text-xs uppercase">Who can see your content</Text>
      <div className="my-3 space-y-3 text-white">
        <div className="flex items-center gap-2 hover:text-green-400 cursor-pointer" onClick={() => navigate(`/account/privacy-account/${userProfile?.user_name}/${userProfile?._id}`)}>
          <EyeInvisibleOutlined />
          <span>Account privacy</span>
        </div>

        <div className="flex items-center gap-2 hover:text-green-400 cursor-pointer" onClick={() => navigate(`/account/block-account/${userProfile?.user_name}/${userProfile?._id}`)}>
          <StopOutlined />
          <span>Blocked</span>
        </div>
      </div>
    </div>
  );
};

export default AccountSideNav;
