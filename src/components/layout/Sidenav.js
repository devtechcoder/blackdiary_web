import React, { useState } from "react";
import { HomeOutlined, SearchOutlined, PlusOutlined, HeartOutlined, UserOutlined, LoginOutlined, FileTextOutlined, CompassOutlined } from "@ant-design/icons";
import { Layout, Modal } from "antd"; // Import Modal
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import apiPath from "../../constants/apiPath";
import CreatePostOption from "../../modals/createPostOption";
import AppImage from "../AppImage";
import { resolveAssetUrl } from "../../helper/functions";
import BrandLogo from "../../assets/images/allLogo/black_white_logo.svg";

const { Sider } = Layout;

function SidebarChevron({ collapsed }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {collapsed ? <path d="M9 6l6 6-6 6" /> : <path d="M15 6l-6 6 6 6" />}
    </svg>
  );
}

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
    const activeClass = "bg-[#d4af37] text-[#0d0d0d]";
    const inactiveClass = "hover:bg-[#1a1a1a]";

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
    <Sider
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      trigger={null}
      className="bg-[#0B0B0B] text-white border-none outline-none sticky top-0 h-screen overflow-y-auto shrink-0"
    >
      <div className="flex items-center   justify-between px-[18px] pt-4 pb-2">
        {/* LEFT SIDE */}
        {!collapsed && (
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            {/* 🔥 BIG LOGO */}
            <div className="logo-wrapper">
              <AppImage
                src={BrandLogo}
                alt="Black Diary"
                width={56} // 🔥 BIG SIZE
                height={56}
                className="logo-img"
              />
            </div>

            {/* 🔥 TEXT */}
            <span className="logo-text text-[22px] font-semibold leading-none">Black Diary</span>
          </div>
        )}

        {/* RIGHT BUTTON */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-7 w-7 items-center justify-center rounded-full 
               border border-[rgba(212,175,55,0.25)] 
               bg-[#151515] text-[#D4AF37]
               hover:bg-[rgba(212,175,55,0.12)] transition"
        >
          <SidebarChevron collapsed={collapsed} />
        </button>
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
        {/* {isLoggedIn && (
          <div className="flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#2a2a2a]">
            <HeartOutlined style={{ fontSize: "22px" }} />
            {!collapsed && <span className="font-semibold">Saved</span>}
          </div>
        )} */}
        {isLoggedIn ? (
          <div onClick={() => navigate(`/@${userProfile?.user_name}`)} className={getNavItemClass(`/@${userProfile?.user_name}`)}>
            {userProfile?.image ? (
              <AppImage src={resolveAssetUrl(userProfile?.image, apiPath.assetURL)} alt="Profile" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <UserOutlined style={{ fontSize: "22px" }} />
            )}
            {!collapsed && <span className="font-semibold">Profile</span>}
          </div>
        ) : (
          <div onClick={() => navigate("/login")} className="flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#1a1a1a]">
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
