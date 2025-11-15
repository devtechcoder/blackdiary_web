import React, { useState } from "react";
import { HomeOutlined, SearchOutlined, PlusOutlined, HeartOutlined, UserOutlined, RightCircleOutlined, LeftCircleOutlined, LoginOutlined, FileTextOutlined, CompassOutlined } from "@ant-design/icons";
import { Layout, Button, Modal } from "antd"; // Import Modal
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import apiPath from "../../constants/apiPath";
import logowithoutbrand from "../../assets/images/allLogo/logowithoutbrand.png";
import CreatePostOption from "../../modals/createPostOption";

const { Sider } = Layout;

function Sidenav() {
  const [collapsed, setCollapsed] = useState(false);
  const [showCreateOptions, setShowCreateOptions] = useState(false); // New state for modal
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const { isLoggedIn, setIsLoggedIn, refreshUser, userProfile } = useAuthContext();

  const getNavItemClass = (path) => {
    const baseClass = "flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors duration-200";
    const activeClass = "bg-green-500 text-white";
    const inactiveClass = "hover:bg-[#2a2a2a]";

    let isActive = false;

    if (path.startsWith("/feed")) {
      // For feed, check both pathname and the 'type' search param
      const pathType = new URLSearchParams(path.split("?")[1]).get("type");
      isActive = pathname === "/feed" && type === pathType;
    } else if (path.startsWith("/@")) {
      // For profile, check if the path matches the current URL
      isActive = pathname === path;
    } else {
      isActive = pathname === path;
    }
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <Sider width={250} collapsible collapsed={collapsed} onCollapse={setCollapsed} trigger={null} className="bg-[#121212] text-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a]">
        <img src={logowithoutbrand} alt="Logo" className="w-8 h-8 object-contain" />
        {!collapsed && <span className="text-base font-semibold">Black Diary</span>}
        <Button type="text" icon={collapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />} onClick={() => setCollapsed(!collapsed)} className="text-white" />
      </div>

      <div className="p-2 space-y-2">
        <div onClick={() => navigate("/")} className={getNavItemClass("/")}>
          <HomeOutlined style={{ fontSize: "22px" }} />
          {!collapsed && <span className="font-semibold">Home</span>}
        </div>
        <div onClick={() => navigate("/feed?type=shayari")} className={getNavItemClass("/feed?type=shayari")}>
          <FileTextOutlined style={{ fontSize: "22px" }} />
          {!collapsed && <span className="font-semibold">Shayari Hub</span>}
        </div>
        <div onClick={() => navigate("/feed?type=post")} className={getNavItemClass("/feed?type=post")}>
          <CompassOutlined style={{ fontSize: "22px" }} />
          {!collapsed && <span className="font-semibold">Explore Posts</span>}
        </div>

        {/* Modified Create Diary button to show options */}
        <div onClick={() => setShowCreateOptions(true)} className={getNavItemClass("/publish")}>
          <PlusOutlined style={{ fontSize: "22px" }} />
          {!collapsed && <span className="font-semibold">Create</span>}
        </div>
        <div onClick={() => navigate("/search")} className={getNavItemClass("/search")}>
          <SearchOutlined style={{ fontSize: "22px" }} />
          {!collapsed && <span className="font-semibold">Search</span>}
        </div>
        {isLoggedIn && (
          <div className="flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#2a2a2a]">
            <HeartOutlined style={{ fontSize: "22px" }} />
            {!collapsed && <span className="font-semibold">Saved</span>}
          </div>
        )}
        {isLoggedIn ? (
          <div onClick={() => navigate(`/@${userProfile?.user_name}`)} className={getNavItemClass(`/@${userProfile?.user_name}`)}>
            {userProfile?.image ? <img src={apiPath.assetURL + userProfile?.image} alt="Profile" className="w-10 h-10 rounded-full object-cover" /> : <UserOutlined style={{ fontSize: "22px" }} />}
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
      {showCreateOptions && <CreatePostOption show={() => setShowCreateOptions(true)} hide={() => setShowCreateOptions(false)} />}
    </Sider>
  );
}

export default Sidenav;
