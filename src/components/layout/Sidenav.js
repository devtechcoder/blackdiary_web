import React, { useState } from "react";
import { HomeOutlined, SearchOutlined, PlusOutlined, HeartOutlined, UserOutlined, RightCircleOutlined, LeftCircleOutlined, LoginOutlined, FileTextOutlined, CompassOutlined } from "@ant-design/icons";
import { Layout, Button, Modal } from "antd"; // Import Modal
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const { Sider } = Layout;

function Sidenav() {
  const [collapsed, setCollapsed] = useState(false);
  const [showCreateOptions, setShowCreateOptions] = useState(false); // New state for modal
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { username } = useParams();

  const { isLoggedIn, setIsLoggedIn, refreshUser, userProfile } = useAuthContext();

  const getNavItemClass = (path) => {
    // Special check for profile URLs like /@username
    if (path === "/profile" && pathname.startsWith("/@") && username === userProfile?.user_name) {
      return "flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors duration-200 bg-green-500 text-white";
    }

    const baseClass = "flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors duration-200";
    const activeClass = "bg-green-500 text-white";
    const inactiveClass = "hover:bg-[#2a2a2a]";
    return `${baseClass} ${pathname === path ? activeClass : inactiveClass}`; // Strict equality for other paths
  };

  const handleCreateOptionClick = (type) => {
    setShowCreateOptions(false); // Close modal
    navigate(`/publish?type=${type}`); // Navigate with type
  };

  return (
    <Sider width={250} collapsible collapsed={collapsed} onCollapse={setCollapsed} trigger={null} className="bg-[#121212] text-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a]">
        {!collapsed && <span className="text-base font-semibold">Black Diary</span>}
        <Button type="text" icon={collapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />} onClick={() => setCollapsed(!collapsed)} className="text-white" />
      </div>

      <div className="p-2 space-y-2">
        <div onClick={() => navigate("/")} className={getNavItemClass("/")}>
          <HomeOutlined style={{ fontSize: "22px" }} />
          {!collapsed && <span className="font-semibold">Home</span>}
        </div>
        <div onClick={() => navigate("/shayari")} className={getNavItemClass("/shayari")}>
          <FileTextOutlined style={{ fontSize: "22px" }} />
          {!collapsed && <span className="font-semibold">Shayari Hub</span>}
        </div>
        <div onClick={() => navigate("/post")} className={getNavItemClass("/post")}>
          <CompassOutlined style={{ fontSize: "22px" }} />
          {!collapsed && <span className="font-semibold">Explore Posts</span>}
        </div>
        <div onClick={() => navigate("/search")} className={getNavItemClass("/search")}>
          <SearchOutlined style={{ fontSize: "22px" }} />
          {!collapsed && <span className="font-semibold">Search</span>}
        </div>

        {/* Modified Create Diary button to show options */}
        <div onClick={() => setShowCreateOptions(true)} className={getNavItemClass("/publish")}>
          <PlusOutlined style={{ fontSize: "22px" }} />
          {!collapsed && <span className="font-semibold">Create</span>}
        </div>

        <div className="flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#2a2a2a]">
          <HeartOutlined style={{ fontSize: "22px" }} />
          {!collapsed && <span className="font-semibold">Liked Diary</span>}
        </div>
        {isLoggedIn ? (
          <div onClick={() => navigate(`/@${userProfile?.user_name}`)} className={getNavItemClass("/profile")}>
            {userProfile?.image ? <img src={userProfile?.image} alt="Profile" className="w-10 h-10 rounded-full object-cover" /> : <UserOutlined style={{ fontSize: "22px" }} />}
            {!collapsed && <span className="font-semibold">Profile</span>}
          </div>
        ) : (
          <div onClick={() => navigate("/login")} className="flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#2a2a2a]">
            <LoginOutlined style={{ fontSize: "22px" }} />
            {!collapsed && <span className="font-semibold">Log in</span>}
          </div>
        )}
      </div>

      {/* Create Options Modal */}
      <Modal
        title={<span className="text-white">What would you like to create?</span>} // Title styled for dark theme
        open={showCreateOptions}
        onCancel={() => setShowCreateOptions(false)}
        footer={null} // No default footer buttons
        centered
        className="create-options-modal bg-gray-800 rounded-lg" // Custom class for modal styling
        bodyStyle={{ backgroundColor: "#1f1f1f", borderRadius: "8px" }} // Dark background for modal body
      >
        <div className="flex flex-col gap-4 p-4">
          <Button type="primary" size="large" onClick={() => handleCreateOptionClick("shayari")} className="w-full bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600 text-white">
            Write Shayari
          </Button>
          <Button type="default" size="large" onClick={() => handleCreateOptionClick("post")} className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-700 hover:border-gray-600">
            Create Post
          </Button>
        </div>
      </Modal>
    </Sider>
  );
}

export default Sidenav;
